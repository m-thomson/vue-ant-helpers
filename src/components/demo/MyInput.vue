<template>
  <a-input
    vc="<MyInput>"
    v-model="state.value"
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

const defaultHelp = 'Child says: Numbers only.'

export default Vue.extend({
  name: 'MyInput',
  props: {
    value: String, // v-model
    placeholder: String,
  },
  data() {
    return {
      label: 'Child says: label text',
      extra: 'Child says: extra text',
      state: {
        value: this.value,
      },
      validity: {
        status: '',
        help: defaultHelp
      }
    }
  },
  methods: {
    onChange() {
      this.validate()
      this.$emit('input', this.state.value)
    },
    validate() {
      if (!this.state.value || /^[0-9]*$/.test(this.state.value)) {
        this.validity.status = ''
        this.validity.help = defaultHelp
      } else {
        this.validity.status = 'error'
        this.validity.help = 'Child says: Not a number!'
      }
    }
  },
})
</script>
