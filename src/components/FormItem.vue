<template>
  <!-- This is the same as <a-col :span="stretch"> but has one less vnode -->
  <div vc="<FormItem>" class="form-col" :class="stretchClass">
    <a-form-item
      :label="itemLabel"
      :extra="itemExtra"
      :help="validity.help"
      :validateStatus="validity.status"
    >
      <slot />
    </a-form-item>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { groupValidity, parentOrChildVal, TFormItemNode, TValidity } from '@/components/FormSVC'
// noinspection PointlessBooleanExpressionJS
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
  name: 'FormItem',
  /**
   * NB: Boolean must come first where [Boolean, String] are the available prop types.
   * This is so that the shorthand <FormItem label> can be used instead of <FormItem :label="true">
   */
  props: {
    /** How many columns to occupy (out of 24) */
    stretch: { type:Number, validator: (v) => (v >= 0 && v <= 24) },
    /** True = use default, False = none, String = override */
    label: [Boolean, String],
    /** True = use default, False = none, String = override */
    extra: [Boolean, String],
    /** True = use default, False = none, String = override */
    help: [Boolean, String],
    /** True = use default, False = none, String = override */
    status: {type:[Boolean, String],default:true}
  },
  data() {
    return {
      /** Array of Child vNodes  */
      children: [] as TFormItemNode[],
      /** Generate correct ant-col-* class */
      stretchClass: this.stretch ? 'ant-col-' + this.stretch : undefined,
    }
  },
  mounted() {
    this.children = this.$slots.default!.map((v) => v.componentInstance) as TFormItemNode[]
  },
  computed: {
    /** Computes the definitive label to use. */
    itemLabel():string {
      return parentOrChildVal(this.label, () => {
        if (this.children.length > 1)
          throw new Error(`Attempt to use child label but there are multiple children.`)
        return this.children.length === 1 ? this.children[0].label : ''
      })
    },
    /** Computes the definitive "extra"  text to use. */
    itemExtra():string {
      return parentOrChildVal(this.extra, () => {
        if (this.children.length > 1)
          throw new Error(`Attempt to use child extra but there are multiple children.`)
        return this.children.length === 1 ? this.children[0].extra : ''
      })
    },
    validity():TValidity {
      const validities = groupValidity(this.children)
      return {
        help: parentOrChildVal(this.help, () => validities.help),
        status: parentOrChildVal(this.status, () => validities.status)
      }
    },
  },
})
</script>
