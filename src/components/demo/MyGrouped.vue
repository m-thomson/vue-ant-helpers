<template>
<!--  <FormItem-->
<!--    ref="group"-->
<!--    vc="<MyGrouped>"-->
<!--    label="My group label"-->
<!--    help="My group help"-->
<!--    extra="My group extra"-->
<!--  >-->
  <div>
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
  </div>
<!--  </FormItem>-->
</template>
<script lang="ts">
import Vue from 'vue'
import MyInput from './MyInput.vue'
import MySelect from './MySelect.vue'
import FormItem from '../FormItem.vue'

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
      help: 'foo',
      state: {
        inputValue: this.inputValue,
        selectValue: this.selectValue,
      },
    }
  },
  computed: {
    validity() {
      return {
        status: '',
        help: 'Grouped component help'
      }
    }
  }
})
</script>
