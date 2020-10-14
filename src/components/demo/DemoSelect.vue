<template>
  <a-select
    vc="<MySelect>"
    v-model="state.value"
    v-bind="$attrs"
    style="width: 120px"
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

const defaultHelp = 'This help provided by child'

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
      validity: {
        status: '',
        help: defaultHelp
      }
    }
  },
  methods: {
    onChange() {
      if (this.state.value === '_Error') {
        this.validity.status = 'error'
        this.validity.help = 'Child says: Wrong one!'
      } else if (this.state.value === '_Warn') {
        this.validity.status = 'warning'
        this.validity.help = 'Child says: Wrong one!'
      } else {
        this.validity.status = ''
        this.validity.help = defaultHelp
      }
      this.$emit('validity', this.validity)
      this.$emit('input', this.state.value)
    },
  },
})
</script>
