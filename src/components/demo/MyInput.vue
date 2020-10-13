<template>
  <a-input
    vc="<MyInput>"
    v-model="state.value"
    v-bind="$attrs"
    :placeholder="placeholder || 'Enter number only...'"
    @input="$emit('input', state.value)"
  >
    <template v-slot:prefix>
      <slot name="prefix"/>
    </template>
  </a-input>
</template>
<script lang="ts">
import Vue from 'vue'
import { TValidity } from '@/components/FormSVC'

export default Vue.extend({
  name: 'MyInput',
  props: {
    value: String, // v-model
    placeholder: String,
  },
  data() {
    return {
      label: 'Label provided by child',
      extra: 'Extra provided by child',
      state: {
        value: this.value,
      },
    }
  },
  computed: {
    validity():TValidity {
      if (!this.value || /^[0-9]*$/.test(this.value)) {
        return {
          status: '',
          help: 'Help provided by child',
        }
      }
      return {
        status: 'error',
        help: 'Child says: Only numbers allowed!',
      }
    },
  },
})
</script>
