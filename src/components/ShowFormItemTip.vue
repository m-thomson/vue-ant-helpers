<!--<template>-->
<!--  <a-tooltip :trigger="['focus','hover']" placement="topLeft">-->
<!--    <span slot="title"> <slot name="title"/> </span>-->
<!--    <slot/>-->
<!--  </a-tooltip>-->
<!--</template>-->
<script lang="ts">
import Vue from 'vue'
import {Tooltip} from 'ant-design-vue'

export default Vue.extend({
  name: 'ShowFormItemTip',
  extends: Tooltip,
})
</script>
<style lang="scss">
</style>
