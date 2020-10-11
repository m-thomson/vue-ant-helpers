<template>
  <a-row
    vc="<FormRow>"
    class="formRowDebug"
    type="flex"
    :gutter="16"
    :class="{ noLabels, noHelp }"
  >
    <!-- TODO: Consider replacing a-row with div (below) for less component nodes -->
    <!-- <div vc="<FormRow>" class="formRowDebug ant-row-flex"
    :class="{ noLabels, noHelp }" style="padding-left: 8px; padding-right: 8px"> -->
    <slot />
  </a-row>
</template>
<script>
export default {
  name: "FormRow",
  components: {},
  props: {
    noLabels: Boolean,
    noHelp: Boolean,
  },
};
</script>

<style>
.noHelp .ant-form-item {
  margin-bottom: 0;
}
</style>