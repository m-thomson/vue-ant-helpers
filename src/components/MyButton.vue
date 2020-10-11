<template>
  <a-button v-bind="$attrs"> BUTTON </a-button>
</template>
<script>
export default {
  name: "MyButton",
  components: {},
  props: {},
  data() {
    return {
      help: "Default button help",
      label: "Default button label",
    };
  },
  methods: {
    myMethod() {
      return "foo";
    },
  },
};
</script>

<style>
</style>