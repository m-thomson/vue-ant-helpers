<template>
  <div>
    <FormItem :stretch="12" help error status class="merge-right">
      <MyInput
        v-model="state.inputValue"
        @input="onChange('inputValue', state.inputValue)"
      />
    </FormItem>
    <FormItem :stretch="12" help error status class="merge-left">
      <MySelect
        v-model="state.selectValue"
        @input="onChange('selectValue', state.selectValue)"
      />
    </FormItem>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import MyInput from './DemoInput.vue'
import MySelect from './DemoSelect.vue'
import FormItem from '../FormItem.vue'
import { groupValidity } from '@/components/FormSVC'

const defaultHelp = "Group help"

/**
 * This is an example of a compound form item.
 */
export default Vue.extend({
  name: 'MyGrouped',
  components: { MyInput, MySelect, FormItem },
  props: {
    inputValue: String,
    selectValue: String,
  },
  data() {
    return {
      label: 'Grouped component label',
      extra: 'Grouped component extra',
      state: {
        inputValue: this.inputValue,
        selectValue: this.selectValue,
      },
      validity: {
        status: '',
        help: defaultHelp
      }
    }
  },
  methods:{
    onChange(key:string, value:any) {
      this.validity = groupValidity(this, defaultHelp)
      this.$emit('validity', this.validity)
      this.$emit(`update:$key`, value)
    },
  }
})
</script>
