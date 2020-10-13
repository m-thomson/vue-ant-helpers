<template>
<!--  <a-row vc="<FormRow>" class="formRowDebug" type="flex" :gutter="16" :class="{ noLabels, noHelp, noExtra }">-->
    <!-- TODO: Consider replacing a-row with div (below) for less component nodes -->
    <div vc="<FormRow>" class="formRowDebug ant-row-flex"
    :class="{ noLabels, noHelp }" style="margin-left: -8px; margin-right: -8px">
    <slot />
    </div>
<!--  </a-row>-->
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "FormRow",
  props: {
    /** True = prevent inner form items from having "label" text. */
    noLabels: Boolean,
    /** True = prevent inner form items from having "help" text. */
    noHelp: Boolean,
    /** True = prevent inner form items from having "extra" field. */
    noExtra: Boolean,
  },
})
</script>
<!--suppress CssUnusedSymbol -->
<style>
.noHelp .ant-form-item {
  /*margin-bottom: 0;*/
}
</style>
