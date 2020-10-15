<template>
  <!-- This is the same as <a-col :span="stretch"> but has one less vnode -->
  <div vc="<FormItem>" class="form-col" :class="stretchClass">
    <a-form-item
      :label="itemLabel"
      :extra="itemExtra"
      :help="itemHelp"
      :validateStatus="itemStatus"
    >
      <slot/>
    </a-form-item>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { FormItem } from '@/components/FormSVC'
import { Vue as TVue } from 'vue/types/vue'
// noinspection PointlessBooleanExpressionJS

type TFormItemNode = TVue & {
  formItem?:FormItem
}

/** Returns the parent or child value */
function parentOrChildVal(parentVal:string | boolean, childValFN:Function):string {
  if (typeof parentVal === 'string') return parentVal
  if (parentVal === true) {
    const descendantVal = childValFN()
    if (descendantVal) return descendantVal
  }
  return ''
}

/**
 * This is a flexible wrapper for ant form items that displays the label, help, extra text
 * and intermediates the validation.
 *
 * Label, extra, help, status - These can be provided as strings by the parent component
 * or, they can be boolean true. If true, then the child component's version of these
 * values will be used. If false or omitted, no value will be used (ie no label shown)
 *
 * Validation - The wrapping component can provide values for 'status' and 'help',
 * otherwise, the internal components validation will be used (if any). That
 * component need only provide computed values for 'status' and 'help'.
 *
 * Slots (named or otherwise) - Slots provided by the wrapped component should work.
 *
 * TODO: If parent <FormRow> has noHelp or noLabel, don't pass them
 * into the child component.
 */
export default Vue.extend({
  name: 'ShowFormItem',
  /**
   * NB: Boolean must come first where [Boolean, String] are the available prop types.
   * This is so that the shorthand <FormItem label> can be used instead of <FormItem :label="true">
   */
  props: {
    /** How many columns to occupy (out of 24) */
    stretch: { type: Number, validator: (v) => (v >= 0 && v <= 24) },
    /** True = use default, False = none, String = override */
    label: [Boolean, String],
    /** True = use default, False = none, String = override */
    extra: [Boolean, String],
    /** True = use default, False = none, String = override */
    help: [Boolean, String],
    /** True = use default, False = none, String = override */
    status: { type: [Boolean, String], default: true },
  },
  data() {
    return {
      /** Array of Child vNodes  */
      slottedChild: undefined as undefined | TFormItemNode,
      /** Generate correct ant-col-* class */
      stretchClass: this.stretch ? 'ant-col-' + this.stretch : undefined,
    }
  },
  mounted() {
    if (this.$slots.default?.length !== 1)
      throw new Error(`<FormItem> must have exactly one child.`)
    this.slottedChild = (this.$slots.default as any)[0].componentInstance as TFormItemNode
  },
  computed: {
    /** Computes the definitive label to use. */
    itemLabel():string {
      return parentOrChildVal(this.label, () => this.slottedChild?.formItem?.label || '')
    },
    /** Computes the definitive "extra"  text to use. */
    itemExtra():string {
      return parentOrChildVal(this.extra, () => this.slottedChild?.formItem?.extra || '')
    },
    itemHelp():string {
      return parentOrChildVal(this.help, () => this.slottedChild?.formItem?.help || '')
    },
    itemStatus():string {
      return parentOrChildVal(this.status, () => this.slottedChild?.formItem?.status || '')
    },
  },
})
</script>
<!--suppress CssFloatPxLength -->
<style lang="scss">
:root {
  --form-item-label-height:   39.999px; /* antd value */
  --form-item-element-height: 40px; /* antd sets this with line-height */
  --form-item-help-height:    22px; /* antd sets this with font-size:14px, line-height:1.5, margin-top:-2px, margin-bottom:-1px */
  --form-item-total-height:   calc(var(--form-item-label-height) + var(--form-item-element-height) + var(--form-item-help-height));
  --form-gutter:              12px;
  --form-gutter-half:         calc( var(--form-row-gutter) / 2 );
  --form-gutter-half-neg:     calc( var(--form-row-gutter) / -2 );
}

.form-row {
  margin-left:  -8px;
  margin-right: -8px;
  display:      flex;
  flex-flow:    row wrap;
}

/*noinspection CssUnusedSymbol*/
div.form-col {
  padding-left:  8px;
  padding-right: 8px;
  position:      relative;
  min-height:    1px;
  &.merge-left {
    padding-left: 0;
    margin-left:  -1px;
    * { border-radius: 0 4px 4px 0; }
  }
  &.merge-right {
    padding-right: 0;
    * { border-radius: 4px 0 0 4px; }
  }
  &.merge-left.merge-right {
    * { border-radius: 0;}
  }
  /* Hovered element should raise it's z-index so shared borders highlight correctly */
  &:hover {
    z-index:1;
  }
}

/* Focused elements should have highest z-index */
input:focus, .ant-select-focused {
  z-index:2;
}

/* Ant forces red color on all help text descendants of .has-error
   but, we don't want that for nested/grouped components - we only
   want the immediate descendants help text to do so.*/
.has-error {
  /* Disable Ant default behaviour */
  .ant-form-explain,
  .ant-form-split {
    color: inherit;
  }
  .ant-input,
  .ant-input:hover,
  .ant-input:focus, {
    border-color:     #d9d9d9;
  }
  .ant-input:not([disabled]):hover {
    border-color:     #d9d9d9;
  }
  .ant-input:focus { // restore default "focus ring"
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  /* Change color of only immediate descendants */
  > .ant-form-explain {
    /* TODO: This is ant default error colour, we need to variable-ize it */
    color: #f5222d;
  }
}
</style>
