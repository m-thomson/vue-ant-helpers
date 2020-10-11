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
 * Flexible wrapper for form items that displays the label, the help and
 * intermediates the validation.
 *
 * Label, extra, help, status - These can be provided as strings by the wrapping component
 * or, they can be boolean true. If true than the inner component's version of these
 * values will be provided. If false or omitted, no value will be used (ie no label shown)
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
   * NB: Order for label, help etc matters. Boolean must come first.
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
      child: undefined,
      parentRow: this.$parent.$parent,
    };
  },
  mounted() {
    if (this.$slots.default.length != 1)
      console.error("FormItem must have one (and only one) child.");
    else this.child = this.$slots.default[0].componentInstance;
  },
  computed: {
    itemLabel() {
      if (this.child && this.label === true) return this.child.label;
      return typeof this.label === "string" ? this.label : "";
    },
    itemExtra() {
      if (this.child && this.extra === true) return this.child.extra;
      return typeof this.extra === "string" ? this.extra : "";
    },
    itemHelp() {
      if (this.childValidity && this.help === true)
        return this.childValidity.help;
      return typeof this.help === "string" ? this.help : "";
    },
    itemStatus() {
      if (this.childValidity && this.status === true)
        return this.childValidity.status;
      return typeof this.status === "string" ? this.status : "";
    },
    childValidity() {
      return this.child && this.child.validity
        ? this.child.validity
        : undefined;
    },
  },
  methods: {
    /**
     * Rules: 1) Use prop value if provided, 2) If prop value is false
     * then return undefined. 3) Otherwise defer to wrapped components' value.
     */
    // getValue(key) {
    //   if (typeof this[key] === "string") return this[key];
    //   if (this[key] === false) return undefined;
    //   if (this.child.state[key] !== undefined) return this.child.state[key];
    //   return undefined;
    // },
  },
};
</script>