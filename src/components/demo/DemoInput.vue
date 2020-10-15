<template>
  <a-input
    vc="<MyInput>"
    v-model="formItem.value"
    v-bind="$attrs"
    :placeholder="placeholder || 'Enter number only...'"
    @change="onChange"
  >
    <template v-slot:prefix>
      <slot name="prefix"/>
    </template>
  </a-input>
</template>
<script lang="ts">
import Vue from 'vue'
import { FormItem } from '@/components/FormSVC'

export default Vue.extend({
  name: 'MyInput',
  props: {
    value: String, // v-model
    placeholder: String,
  },
  data() {
    return {
      formItem: new FormItem(this, {
        value: this.value,
        label: 'Child says: label text',
        extra: 'Child says: extra text',
        help: 'Child says: Numbers only.',
      }),
    }
  },
  methods: {
    onChange() {
      if (!this.formItem.value || /^[0-9]*$/.test(this.formItem.value)) {
        this.formItem.status = ''
        this.formItem.help = ''
      } else {
        this.formItem.status = 'error'
        this.formItem.help = 'Child says: Not a number!'
      }
      // this.$emit('validity', this.validity)
      this.$emit('input', this.formItem.value)
    },
  },
})
</script>
