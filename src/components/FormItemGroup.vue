<template>
  <FormRow vc="<FormItemGroup>">
    <slot />
  </FormRow>
</template>
<script>
import FormRow from "./FormRow";
/**
 * TODO
 */
export default {
  name: "FormItemGroup",
  components: { FormRow },
  props: {
    /** How many columns to occupy (out of 24) */
    stretch: Number,
    label: String,
    extra: String,
    help: String,
    status: String,
  },
  data() {
    return {
      /** Array of Child vNodes  */
      formItems: [],
    };
  },
  mounted() {
    this.formItems = this.$slots.default.map((v) => v.componentInstance);
  },
  computed: {
    validity() {
      const errors = [];
      const warnings = [];
      Object.values(this.formItems).forEach((v) => {
        if (v.$options.name === "FormItem") {
          if (v.itemStatus === "error") errors.push(v.itemHelp);
          if (v.itemStatus === "warning") warnings.push(v.itemHelp);
        }
      });
      return errors.length === 0
        ? { status: "", help: "" }
        : {
            status: "error",
            help: errors.join(";"),
          };
    },
  },
  methods: {
    /** Returns the validity object from the child component. */
    childValidity() {
      if (!this.children[0].validity) {
        console.error("Child does not provide validation.");
        return { help: "", status: "" };
      }
      return this.children[0].validity;
    },
  },
};
</script>