<template>
  <div>
    <ShowFormItem :stretch="12" help error status class="merge-right">
      <MyInput
        v-model="formItem.value.inputLeft"
        @input="onChange('inputValue', formItem.value.inputLeft)"
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
import { FormItem } from '@/components/FormSVC'

/**
 * This is an example of a compound form item.
 */
export default Vue.extend({
  name: 'DemoGroupedInput1',
  components: { MyInput, MySelect },
  props: {
    inputValue: String,
    selectValue: String,
  },
  data() {
    return {
      formItem: new FormItem(this, {
        value: {
          inputLeft: this.inputValue,
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
