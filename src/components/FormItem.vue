<template>
  <a-col vc="<FormItem>" :span="stretch">
    <!-- TODO: Possibly replace a-col node with div -->
    <!-- <div class="ant-col" style="padding-left: 8px; padding-right: 8px"> -->
    <a-form-item
      :label="itemLabel"
      :help="itemHelp"
      :extra="itemExtra"
      :validateStatus="itemStatus"
    >
      <slot />
    </a-form-item>
  </a-col>
</template>
<script>
/**
 * This is a flexible wrapper for ant form items that displays the label, help, etxra text
 * and intermediates the validation.
 *
 * Label, extra, help, status - These can be provided as strings by the wrapping component
 * or, they can be boolean true. If true, then the inner component's version of these
 * values will be used. If false or omitted, no value will be used (ie no label shown)
 *
 * Validation - The wrapping component can provide values for 'status' and 'help',
 * otherwise, the internal components validation will be used (if any). That
 * component need only provide computed values for 'status' and 'help'.
 *
 * Slots (named or otherwise) - Slots provided by the wrapped component should work.
 *
 * TODO: If parent <FormRow> has noHelp or noLabel, don't pass them
 * into the inner component.
 */
export default {
  name: "FormItem",
  /**
   * NB: Boolean must come first where [Boolean, String] are the available prop types.
   * This is so that the shorthand <FormItem label> can be used instead of <FormItem :label="true">
   */
  props: {
    /** How many columns to occupy (out of 24) */
    stretch: Number,
    /** True = use default, False = none, String = override */
    label: [Boolean, String],
    /** True = use default, False = none, String = override */
    extra: [Boolean, String],
    /** True = use default, False = none, String = override */
    help: [Boolean, String],
    /** True = use default, False = none, String = override */
    status: [Boolean, String],
  },
  data() {
    return {
      /** The child component. */
      child: undefined,
      /** The grand-child component. */
      grandchild: undefined,
      /**  */
      descendant: undefined,
      /** The nearest <FormRow> ancestor */
      parentRow: this.$parent.$parent,
    };
  },
  mounted() {
    if (this.$slots.default.length != 1)
      console.error("FormItem must have one (and only one) child.");
    else {
      const child = this.$slots.default[0].componentInstance;
      const grandchild = child.$children[0];
      if (grandchild.$options.name === "FormItemGroup") {
        this.descendant = grandchild;
      } else {
        this.descendant = child;
      }
    }
  },
  computed: {
    /** Computes the definitive label to use. */
    itemLabel() {
      return this.decideVal(this.label, () => this.descendant.label);
    },
    /** Computes the definitive "extra"  text to use. */
    itemExtra() {
      return this.decideVal(this.extra, () => this.descendant.extra);
    },
    /** Computes the definitive help text to use. */
    itemHelp() {
      return this.decideVal(this.help, () => this.descendant.validity.help);
    },
    /** Computes the definitive status. */
    itemStatus() {
      return this.decideVal(this.status, () => this.descendant.validity.status);
    },
  },
  methods: {
    decideVal(localValue, descendantValue) {
      if (typeof localValue === "string") return localValue;
      if (this.descendant) {
        if (localValue === true) {
          return descendantValue();
        }
      }
      return "";
    },
  },
};
</script>