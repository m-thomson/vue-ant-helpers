<template>
  <div>
    <ShowFormItem :stretch="12" help error status class="merge-right">
      <MyInput
        v-model="formItem.value.input"
        @input="onChange('inputValue', formItem.value.input)"
      />
    </ShowFormItem>
    <ShowFormItem :stretch="12" help error status class="merge-left">
      <MySelect
        v-model="formItem.value.select"
        @input="onChange('selectValue', formItem.value.select)"
      />
    </ShowFormItem>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import MyInput from './DemoInput.vue'
import MySelect from './DemoSelect.vue'
import ShowFormItem from '../ShowFormItem.vue'
import { FormItem } from '@/components/FormSVC'

/**
 * This is an example of a compound form item.
 */
export default Vue.extend({
  name: 'DemoGroupedInput1',
  components: { MyInput, MySelect, ShowFormItem },
  props: {
    inputValue: String,
    selectValue: String,
  },
  data() {
    return {
      formItem: new FormItem(this, {
        value: {
          input: this.inputValue,
          select: this.selectValue,
        },
        label: 'Child says: label text',
        extra: 'Child says: extra text',
        help: 'Group help',
      }),
    }
  },
  methods:{
    onChange(key:string, value:any) {
      this.formItem.validateChildItems()
      this.$emit(`update:$key`, value)
    },
  }
})
</script>
