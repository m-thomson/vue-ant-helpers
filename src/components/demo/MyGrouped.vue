<template>
  <FormItemGroup
    vc="<MyGrouped>"
    label="My group label"
    help="My group help"
    extra="My group extra"
  >
    <FormItem ref="theInputComp" :stretch="12" help error status>
      <MyInput
        v-model="state.inputValue"
        @input="$emit('update:inputValue', state.inputValue)"
      />
    </FormItem>
    <FormItem ref="theSelectComp" :stretch="12" help error status>
      <MySelect
        v-model="state.selectValue"
        @input="$emit('update:selectValue', state.selectValue)"
      />
    </FormItem>
  </FormItemGroup>
</template>
<script lang="ts">
import Vue from 'vue'
import MyInput from './MyInput.vue'
import MySelect from './MySelect.vue'
import FormItem from '../FormItem.vue'
import FormItemGroup from '../FormItemGroup.vue'

/**
 * This is an example of a compound form item.
 */
export default Vue.extend({
  name: 'MyGrouped',
  components: { MyInput, MySelect, FormItem, FormItemGroup },
  props: {
    inputValue: String,
    selectValue: String,
  },
  data() {
    return {
      label: 'A label provided by compound component',
      extra: 'Extra provided by compound component',
      state: {
        inputValue: this.inputValue,
        selectValue: this.selectValue,
      },
    }
  },
})
</script>
