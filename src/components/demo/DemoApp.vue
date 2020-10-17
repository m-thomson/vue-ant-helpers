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
        <h2 id="A0">A0. With defaults <a href="#A0">#</a></h2>
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
    <demoA1/>
    <demoA2/>
    <demoA3/>
    <demoA4/>
    <header>
      <h1>Demo with grouped child</h1>
      <p>
        The child component is a grouped component comprising of the same text input field
        <i>plus</i> a select dropdown.
        <a href="https://github.com/m-thomson/vue-ant-helpers/blob/main/src/components/demo/MyGrouped.vue">Source.</a>
      </p>
    </header>
    <demoB1/>
    <demoB2/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import DemoInput from './DemoInput.vue'
import DemoSelect from './DemoSelect.vue'
import DemoGroupedInput1 from './DemoGroupedInput1.vue'
import DemoGroupedInput2 from './DemoGroupedInput2.vue'
import { demos } from './DemoPage'

export default Vue.extend({
  name: 'DemoApp',
  components: {
    DemoInput,
    DemoSelect,
    DemoGroupedInput1,
    DemoGroupedInput2,
    ...demos
  },
  data() {
    return {
      demoA1Val: undefined as undefined | string,
    }
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
}
</style>
