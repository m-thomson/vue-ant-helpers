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
        <p>
          {{ demo1Val }}
        </p>
      </div>
      <div class="form-row">
        <ShowFormItem ref="demo1" help label extra>
          <DemoInput v-model="demo1Val"/>
        </ShowFormItem>
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
        <ShowFormItem label :help="demo2Validity.help" :status="demo2Validity.status">
          <DemoInput v-model="demo2Val" placeholder="Enter text only..."/>
        </ShowFormItem>
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
        <ShowFormItem label='Label overridden by outer' extra='Extra overridden by outer'>
          <DemoInput v-model="demo3Val" placeholder="Foo">
            <!-- slotted content -->
            <template v-slot:prefix>
              <a-icon type="question"/>
            </template>
          </DemoInput>
        </ShowFormItem>
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
        <ShowFormItem ref="MyGrouped" label help status extra>
          <DemoGroupedInput1
            :inputValue.sync="demo4InputVal"
            :selectValue.sync="demo4SelectVal"
          />
        </ShowFormItem>
      </div>
    </div>
    <!-----------------------[5]------------------------->
    <div class="demo-row">
      <div class="describe">
        <h2>5. Three inputs</h2>
        <p>
          To do.
        </p>
      </div>
      <div class="form-row">
        <ShowFormItem label help status extra>
          <DemoGroupedInput2
            :inputLeftValue.sync="demo5InputLeftVal"
            :inputRightValue.sync="demo5RightLeftVal"
            :selectValue.sync="demo5SelectVal"
          />
        </ShowFormItem>
      </div>
    </div>
    <!------------------------------------------------------>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import DemoInput from './DemoInput.vue'
import DemoGroupedInput1 from './DemoGroupedInput1.vue'
import DemoGroupedInput2 from './DemoGroupedInput2.vue'

export default Vue.extend({
  name: 'DemoApp',
  components: {
    DemoInput,
    DemoGroupedInput1,
    DemoGroupedInput2,
  },
  data() {
    return {
      demo1Val: undefined as undefined | string,
      demo2Val: undefined as undefined | string,
      demo3Val: undefined as undefined | string,
      demo4InputVal: '',
      demo4SelectVal: 'Jen',
      demo5InputLeftVal: '',
      demo5RightLeftVal: '',
      demo5SelectVal: 'John',
    }
  },
  computed: {
    demo2Validity() {
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
<style lang="scss">
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

  .ant-form-item-label {
    background-color: lightyellow;
  }
  .ant-form-explain {
    background-color: linen;
  }
  .ant-form-extra {
    background-color: azure;
  }
  .ant-form-item-children {
    background-color: red;
  }
}
</style>
