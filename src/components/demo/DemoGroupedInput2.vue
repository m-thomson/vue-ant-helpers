<template>
  <div>
    <ShowFormItem :stretch="8" help error status class="merge-right">
      <MyInput
        v-model="formItem.value.inputLeft"
        @input="onChange('inputValue', formItem.value.inputLeft)"
      />
    </ShowFormItem>
    <ShowFormItem :stretch="8" help error status class="merge-left merge-right">
      <MySelect
        v-model="formItem.value.select"
        @input="onChange('selectValue', formItem.value.select)"
      />
    </ShowFormItem>
    <ShowFormItem :stretch="8" help error status class="merge-left">
      <MyInput
        v-model="formItem.value.inputRight"
        @input="onChange('inputValue', formItem.value.inputLeft)"
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
  name: 'DemoGroupedInput2',
  components: { MyInput, MySelect },
  props: {
    inputLeftValue: String,
    inputRightValue: String,
    selectValue: String,
  },
  data() {
    return {
      formItem: new FormItem(this, {
        value: {
          inputLeft: this.inputLeftValue,
          inputRight: this.inputRightValue,
          select: this.selectValue,
        },
        label: 'Child: label text',
        extra: 'Child: extra text',
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
