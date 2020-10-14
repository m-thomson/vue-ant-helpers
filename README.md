# vue-ant-helpers

A personal library of helpers (components, methods, types) for working with Vue, TypeScript and [Ant Design](https://antdv.com/docs/vue/introduce/).

Works with Ant 1.x and Vue 2.x

```html
<div class="form-row">
    <!-- Use wrapped component's default values for help, label 
         and extra text. Span across 3 cols (24 is max) -->
    <FormItem :stretch="6" help label extra>
      <my-input v-model="val1"/>
    </FormItem>
    <!-- Override the help, label and extra text.  -->
    <FormItem :stretch="6" help="..." :label="..." :extra="...">
      <my-input v-model="val2"/>
    </FormItem>
    <!-- Show no label or extra text. Use custom validation. -->
    <FormItem :stretch="6" :help="validate3.help" :status="validate3.status">
      <my-input v-model="val3"/>
    </FormItem>
</div>
```

```ts
export default Vue.extend({
    data() {
      return {
        val1: '...',  val2: '...',  val3: '...',
      }
    },
    computed:{
      validate3() {
        // Evaluate this.val3 and return the appropriate status code and error text.
        return {
          status: '', // 'error'|'warning'|''
          error: ''   // any string
        }
      }
    }
})
```


help="" status
