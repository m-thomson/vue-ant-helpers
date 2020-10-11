<template>
  <a-input
    vc="<MyInput>"
    v-model="state.value"
    v-bind="attrs"
    :placeholder="placeholder || 'Enter number only...'"
    @input="$emit('input', state.value)"
  >
    <template v-slot:prefix>
      <slot name="prefix" />
    </template>
  </a-input>
</template>
<script>
export default {
  name: "MyInput",
  props: {
    value: String, // v-model
    placeholder: String,
  },
  data() {
    return {
      label: "A label provided by inner component",
      extra: "Extra provided by inner component",
      state: {
        value: this.value,
      },
      attrs: { ...this.$attrs },
    };
  },
  computed: {
    validity() {
      if (!this.value || /^[0-9]*$/.test(this.value)) {
        return { status: "", help: "This help provided by inner component" };
      }
      return {
        status: "error",
        help: "Inner component says: Only numbers allowed!",
      };
    },
  },
  methods: {},
};
</script>