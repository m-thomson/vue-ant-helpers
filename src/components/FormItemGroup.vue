<template>
  <a-col vc="<FormItemGroup>">
    <a-form-item :label="label" :help="help" :class="{ NoHelp: !help }">
      <a-row type="flex" :gutter="16">
        <slot />
      </a-row>
    </a-form-item>
  </a-col>
</template>
<script>
export default {
  name: "FormItemGroup",
  components: {},
  props: {
    label: String,
    help: String,
  },
};
</script>

<style>
[vc="<FormItemGroup>"] > .ant-form-item {
  margin-bottom: 5px;
}
[vc="<FormItemGroup>"]
  > .ant-form-item-with-help
  [vc="<FormItem>"]
  > .ant-form-item {
  margin-bottom: 0;
}
</style>