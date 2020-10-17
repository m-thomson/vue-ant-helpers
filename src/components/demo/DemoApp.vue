<template>
  <div id="app" style="margin: 10px">
    <header>
      <h1>Demo with simple child</h1>
      <p>
        Note: The text input child component has validation that allows only numbers.
        <a href="https://github.com/m-thomson/vue-ant-helpers/blob/main/src/components/demo/MyInput.vue">Source.</a>
      </p>
    </header>
    <!-----------------------[ A0 ]------------------------->
    <div class="demo-row">
      <div class="describe">
        <h2>A0. With defaults</h2>
        <p>
          Here we are using the child's defaults for label, help, extra and status. We are also using the child's validation.
        </p>
        <p>
          {{demoA1Val}}
        </p>
      </div>
      <div class="form-row">
        <ShowFormItem label="foo">
          <a-input-group compact>
            <a-input style="width: 20%" default-value="0571"/>
            <a-input style="width: 30%" default-value="26888888"/>
            <ShowFormItem label>
            <DemoSelect label help status/>
            </ShowFormItem>
          </a-input-group>
        </ShowFormItem>
      </div>
    </div>
    <!-----------------------[ A1 ]------------------------->
    <div class="demo-row">
      <div class="describe">
        <h2>A1. With defaults</h2>
        <p>
          Here we are using the child's defaults for label, help, extra and status. We are also using the child's validation.
        </p>
        <p>
          {{ demoA1Val }}
        </p>
      </div>
      <div class="form-row">
        <ShowFormItem ref="demoA1" help label extra>
          <DemoInput v-model="demoA1Val"/>
        </ShowFormItem>
      </div>
    </div>
    <!-----------------------[ A2 ]------------------------->
    <div class="demo-row">
      <div class="describe">
        <h2>A2. With validation and help override</h2>
        <p>
          This example uses validation provided by the parent component. In this example, instead of numbers, only letters are allowed.
        </p>
      </div>
      <div class="form-row">
        <ShowFormItem label :help="demoA2Validity.help" :status="demoA2Validity.status">
          <DemoInput v-model="demoA2Val" placeholder="Enter text only..."/>
        </ShowFormItem>
      </div>
    </div>
    <!-----------------------[ A3 ]------------------------->
    <div class="demo-row">
      <div class="describe">
        <h2>A3. Using slots</h2>
        <p>
          Passing slotted content to child component work as expected. This example also shows override of label and extra by parent.
        </p>
      </div>
      <div class="form-row">
        <ShowFormItem label='Label overridden by outer' extra='Extra overridden by outer'>
          <DemoInput v-model="demoA3Val" placeholder="Foo">
            <!-- slotted content for <DemoInput> -->
            <template v-slot:prefix>
              <a-icon type="question"/>
            </template>
          </DemoInput>
        </ShowFormItem>
      </div>
    </div>
    <!-----------------------[ H ]------------------------->
    <header>
      <h1>Demo with grouped child</h1>
      <p>
        The child component is a grouped component comprising of the same text input field
        <i>plus</i> a select dropdown.
        <a href="https://github.com/m-thomson/vue-ant-helpers/blob/main/src/components/demo/MyGrouped.vue">Source.</a>
      </p>
    </header>
    <!-----------------------[ B1 ]------------------------->
    <div class="demo-row">
      <div class="describe">
        <h2>B1. With defaults</h2>
        <p>
          Using the child's defaults. Notice that there is a unified label and "extra" text.
          <br/>
          Input value "{{demoB1InputVal}}"
          <br/>
          Select value "{{demoB1SelectVal}}"
          <br/>
          Error count: {{}}
        </p>
      </div>
      <div class="form-row">
        <ShowFormItem ref="MyGrouped" label help status extra>
          <DemoGroupedInput1
            :inputValue.sync="demoB1InputVal"
            :selectValue.sync="demoB1SelectVal"
          />
        </ShowFormItem>
      </div>
    </div>
    <!-----------------------[ B2 ]------------------------->
    <div class="demo-row">
      <div class="describe">
        <h2>B2. Three inputs</h2>
        <p>
          To do.
        </p>
      </div>
      <div class="form-row">
        <ShowFormItem label help status extra>
          <DemoGroupedInput2
            :inputLeftValue.sync="demoB2InputLeftVal"
            :inputRightValue.sync="demoB2RightLeftVal"
            :selectValue.sync="demoB2SelectVal"
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
import DemoSelect from './DemoSelect.vue'
import DemoGroupedInput1 from './DemoGroupedInput1.vue'
import DemoGroupedInput2 from './DemoGroupedInput2.vue'

export default Vue.extend({
  name: 'DemoApp',
  components: {
    DemoInput,
    DemoSelect,
    DemoGroupedInput1,
    DemoGroupedInput2,
  },
  data() {
    return {
      demoA1Val: undefined as undefined | string,
      demoA2Val: undefined as undefined | string,
      demoA3Val: undefined as undefined | string,
      demoB1InputVal: '',
      demoB1SelectVal: 'Jen',
      demoB2InputLeftVal: '',
      demoB2RightLeftVal: '',
      demoB2SelectVal: 'John',
    }
  },
  computed: {
    demoA2Validity() {
      if (!this.demoA2Val || /^[A-Za-z]*$/.test(this.demoA2Val)) {
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
