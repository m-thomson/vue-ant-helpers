<template>
  <a-select
    vc="<MySelect>"
    v-model="state.value"
    v-bind="$attrs"
    style="width: 120px"
    @change="$emit('input', state.value)"
  >
    <a-select-option value="Jack"> Jack</a-select-option>
    <a-select-option value="John"> John</a-select-option>
    <a-select-option value="Error"> (Trigger error)</a-select-option>
    <a-select-option value="disabled" disabled> Disabled</a-select-option>
    <a-select-option value="Jen"> Jen</a-select-option>
  </a-select>
</template>
<script lang="ts">
import Vue from 'vue'
import { Select } from 'ant-design-vue'

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
      label: 'A label provided by inner component',
      extra: 'Extra provided by inner component',
      state: {
        value: this.value,
      },
    }
  },
  computed: {
    validity() {
      if (this.state.value === 'Error')
        return {
          status: 'error',
          help: 'Inner component says: Wrong one!',
        }
      return {
        status: '',
        help: 'This help provided by inner component',
      }
    },
  },
  methods: {},
})
</script>
