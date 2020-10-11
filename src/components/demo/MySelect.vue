<template>
  <a-select
    vc="<MySelect>"
    v-model="theValue"
    v-bind="attrs"
    style="width: 120px"
    @change="$emit('input', theValue)"
  >
    <a-select-option value="Jack"> Jack </a-select-option>
    <a-select-option value="John"> John </a-select-option>
    <a-select-option value="disabled" disabled> Disabled </a-select-option>
    <a-select-option value="Jen"> Jen </a-select-option>
  </a-select>
</template>
<script>
export default {
  name: "MySelect",
  props: {
    value: String, // v-model
  },
  data() {
    return {
      label: "A label provided by inner component",
      theValue: this.value,
      attrs: {
        ...this.$attrs,
      },
    };
  },
  computed: {
    help() {
      return this.validity.help;
    },
    status() {
      return this.validity.status;
    },
    validity() {
      return { status: "", help: "This help provided by inner component" };
    },
  },
  methods: {},
};
</script>