<template>
  <div id="app" style="margin: 10px">
    <header>
      <h1>Demo with simple child</h1>
      <p>
        Note: The text input child component has validation that allows only numbers.
        <a href="https://github.com/m-thomson/vue-ant-helpers/blob/main/src/components/demo/MyInput.vue">Source.</a>
      </p>
    </header>
    <!-----------------------[1]------------------------->
    <div class="demo-row">
      <div class="describe">
        <h2>1. With defaults</h2>
        <p>
          Here we are using the child's defaults for label, help, extra and status. We are also using the child's validation.
        </p>
      </div>
      <div class="form-row">
        <FormItem ref="demo1" help label extra>
          <my-input v-model="demo1Val"/>
        </FormItem>
      </div>
    </div>
    <!-----------------------[2]------------------------->
    <div class="demo-row">
      <div class="describe">
        <h2>2. With validation and help override</h2>
        <p>
          This example uses validation provided by the parent component. In this example, instead of numbers, only letters are allowed.
        </p>
      </div>
      <div class="form-row">
        <FormItem label :help="validity.help" :status="validity.status">
          <my-input v-model="demo2Val" placeholder="Enter text only..."/>
        </FormItem>
      </div>
    </div>
    <!-----------------------[3]------------------------->
    <div class="demo-row">
      <div class="describe">
        <h2>3. Using slots</h2>
        <p>
          Passing slotted content to child component work as expected. This example also shows override of label and extra by parent.
        </p>
      </div>
      <div class="form-row">
        <FormItem label='Label overridden by outer' extra='Extra overridden by outer'>
          <my-input v-model="demo3Val" placeholder="Foo">
            <!-- slotted content -->
            <template v-slot:prefix>
              <a-icon type="question"/>
            </template>
          </my-input>
        </FormItem>
      </div>
    </div>
    <!-----------------------[H]------------------------->
    <header>
      <h1>Demo with grouped child</h1>
      <p>
        The child component is a grouped component comprising of the same text input field
        <i>plus</i> a select dropdown.
        <a href="https://github.com/m-thomson/vue-ant-helpers/blob/main/src/components/demo/MyGrouped.vue">Source.</a>
      </p>
    </header>
    <!-----------------------[4]------------------------->
    <div class="demo-row">
      <div class="describe">
        <h2>4. With defaults</h2>
        <p>
          Using the child's defaults. Notice that there is a unified label and "extra" text.
          <br/>
          Input value "{{demo4InputVal}}"
          <br/>
          Select value "{{demo4SelectVal}}"
          <br/>
          Error count: {{}}
        </p>
      </div>
      <div class="form-row">
        <FormItem ref="MyGrouped" label help status extra>
          <my-grouped
            :inputValue.sync="demo4InputVal"
            :selectValue.sync="demo4SelectVal"
          />
        </FormItem>
      </div>
    </div>
    <!------------------------------------------------------>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import FormItem from '../FormItem.vue'
import MyInput from './MyInput.vue'
import MyGrouped from './MyGrouped.vue'
import { TValidity } from '@/components/FormSVC'

export default Vue.extend({
  name: 'App',
  components: {
    FormItem,
    MyInput,
    MyGrouped,
  },
  data() {
    return {
      demo1Val: undefined as undefined | string,
      demo2Val: undefined as undefined | string,
      demo3Val: undefined as undefined | string,
      demo4InputVal: '',
      demo4SelectVal: 'Jen',
    }
  },
  computed: {
    validity():TValidity {
      if (!this.demo2Val || /^[A-Za-z]*$/.test(this.demo2Val)) {
        return {
          status: 'success',
          help: 'This help provided by outer component',
        }
      }
      return {
        status: 'error',
        help: 'Outer component says: Only letters allowed!',
      }
    },
  },
})
</script>

<!--suppress CssFloatPxLength -->
<style>
:root {
  --form-item-label-height:   39.999px; /* antd value */
  --form-item-element-height: 40px; /* antd sets this with line-height */
  --form-item-help-height:    22px; /* antd sets this with font-size:14px, line-height:1.5, margin-top:-2px, margin-bottom:-1px */
  --form-item-total-height:   calc(var(--form-item-label-height) + var(--form-item-element-height) + var(--form-item-help-height));
  --form-row-gutter:          12px;
}

hr {
  margin:  0;
  padding: 0;
  height:  1px;
}

h1 {
  font-style: oblique;
  margin-top: 10px;
}

#app {
  font-family:             "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing:  antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:                   #2c3e50;
}

header {
  border:           1px solid black;
  padding:          4px;
  background-color: lightgray;
}

.demo-row {
  display:               grid;
  grid-template-columns: 1fr 1fr;
  grid-gap:              8px;
  border-top:            1px solid black;
  border-bottom:         1px solid black;
  padding:               4px 0;
}

.form-row {
  margin-left:  -8px;
  margin-right: -8px;
  display:      flex;
  flex-flow:    row wrap;
}

/*noinspection CssUnusedSymbol*/
.form-col {
  padding-left:  8px !important;
  padding-right: 8px !important;
  position:      relative;
  min-height:    1px;
}
</style>
