<template>
  <a-select
    vc="<MySelect>"
    v-model="formItem.value"
    v-bind="$attrs"
    style="width: 100%"
    @change="onChange"
  >
    <a-select-option value="Jack">Jack</a-select-option>
    <a-select-option value="John">John</a-select-option>
    <a-select-option value="_Error">(Trigger error)</a-select-option>
    <a-select-option value="_Warn">(Trigger warn)</a-select-option>
    <a-select-option value="Jen"> Jen</a-select-option>
  </a-select>
</template>
<script lang="ts">
import Vue from 'vue'
import { Select } from 'ant-design-vue'
import { FormItem } from '@/components/FormSVC'

export default Vue.extend({
  name: 'DemoSelect',
  components: {
    Select,
    'a-select-option': Select.Option,
  },
  props: {
    value: String, // v-model
  },
  data() {
    return {
      formItem: new FormItem(this, {
        value: this.value,
        label: 'Child: label text',
        extra: 'Child: extra text',
        help: 'This help provided by child',
      }),
    }
  },
  methods: {
    onChange() {
      if (this.formItem.value === '_Error') {
        this.formItem.status = 'error'
        this.formItem.help = 'Child: Wrong one!'
      } else if (this.formItem.value === '_Warn') {
        this.formItem.status = 'warning'
        this.formItem.help = 'Child: Wrong one!'
      } else {
        this.formItem.status = ''
        this.formItem.help = ''
      }
      // this.$emit('validity', this.validity)
      this.$emit('input', this.formItem.value)
    },
  },
})
</script>
