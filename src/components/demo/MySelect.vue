<template>
  <a-select
    vc="<MySelect>"
    v-model="state.value"
    v-bind="$attrs"
    style="width: 120px"
    @change="$emit('input', state.value)"
  >
    <a-select-option value="Jack">Jack</a-select-option>
    <a-select-option value="John">John</a-select-option>
    <a-select-option value="Error">(Trigger error)</a-select-option>
    <a-select-option value="Jen"> Jen</a-select-option>
  </a-select>
</template>
<script lang="ts">
import Vue from 'vue'
import { Select } from 'ant-design-vue'
import { TValidity } from '@/components/FormSVC'

export default Vue.extend({
  name: 'MySelect',
  components: {
    Select,
    'a-select-option': Select.Option,
  },
  props: {
    value: String, // v-model
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
      if (this.state.value !== 'Error') {
        return {
          status: '',
          help: 'This help provided by child',
        }
      }
      return {
        status: 'error',
        help: 'Child says: Wrong one!',
      }
    },
  },
})
</script>
