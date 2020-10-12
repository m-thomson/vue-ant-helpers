<template>
  <FormRow vc="<FormItemGroup>">
    <slot/>
  </FormRow>
</template>
<script lang="ts">
import Vue from 'vue'
import FormRow from './FormRow.vue'
import { TValidity } from '@/components/FormSVC'

/**
 * TODO
 */
export default Vue.extend({
  name: 'FormItemGroup',
  components: { FormRow },
  props: {
    /** How many columns to occupy (out of 24) */
    stretch: Number,
    label: String,
    extra: String,
    help: String,
    status: String,
  },
  data() {
    return {
      /** Array of Child vNodes  */
      formItems: [] as any[],
    }
  },
  mounted() {
    this.formItems = this.$slots.default!.map((v) => v.componentInstance)
  },
  computed: {
    validity():TValidity {
      const errors = [] as string[]
      const warnings = [] as string[]
      Object.values(this.formItems).forEach((v) => {
        if (v.$options.name === 'FormItem') {
          if (v.itemStatus === 'error') errors.push(v.itemHelp)
          if (v.itemStatus === 'warning') warnings.push(v.itemHelp)
        }
      })
      return errors.length === 0
        ? { status: '', help: '' }
        : {
          status: 'error',
          help: errors.join(';'),
        }
    },
  },
})
</script>
