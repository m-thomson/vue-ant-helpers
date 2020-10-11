<template>
  <FormRow vc="<MyGrouped>">
    <FormItem ref="theInputComp" :stretch="12" help error status>
      <MyInput v-model="state.inputValue" />
    </FormItem>
    <FormItem ref="theSelectComp" :stretch="12" help error status>
      <MySelect v-model="state.selectValue" />
    </FormItem>
  </FormRow>
</template>
<script>
import MyInput from "./MyInput";
import MySelect from "./MySelect";
import FormItem from "./FormItem";
import FormRow from "./FormRow";

export default {
  name: "MyGrouped",
  components: { MyInput, MySelect, FormItem, FormRow },
  props: {
    inputValue: String,
    selectValue: String,
  },
  data() {
    return {
      label: "A label provided by grouped component",
      extra: "Extra provided by grouped component",
      formItems: undefined,
      state: {
        inputValue: this.inputValue,
        selectValue: this.selectValue,
      },
    };
  },
  mounted() {
    this.formItems = this.$refs;
  },
  computed: {
    validity() {
      const validity = {
        errors: [],
        warnings: [],
      };
      Object.values(this.formItems).forEach((v) => {
        if (v.$options.name === "FormItem") {
          if (v.itemStatus === "error") validity.errors.push(v.itemHelp);
          if (v.itemStatus === "warning") validity.warnings.push(v.itemHelp);
        }
      });
      return validity;
      // const status = this.$refs.groupedInput.statusVal;
      // const help = this.$refs.groupedInput.helpVal;
      // return { status, help };
      // if (!this.value || /^[0-9]*$/.test(this.value)) {
      //   return { status: "", help: "This help provided by inner component" };
      // }
      // return {
      //   status: "error",
      //   help: "Inner component says: Only numbers allowed!",
      // };
    },
  },
  methods: {},
};
</script>