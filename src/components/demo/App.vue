<template>
  <div id="app" style="margin: 10px">
    <header>
      <h1>Demo with simple sub-component</h1>
      <p>
        The text input sub-component has validation that allows only numbers.
        <a
          href="https://github.com/m-thomson/vue-ant-helpers/blob/main/src/components/demo/MyInput.vue"
          >Source.</a
        >
      </p>
    </header>

    <div class="demo-row">
      <div class="describe">
        <h2>1. With defaults</h2>
        <p>
          Here we are using the sub-components' defaults for label, help, extra
          and status. We are also using the default validation.
        </p>
      </div>
      <FormRow>
        <FormItem status help label extra>
          <my-input v-model="value1" />
        </FormItem>
      </FormRow>
    </div>

    <div class="demo-row">
      <div class="describe">
        <h2>2. With validation and help override</h2>
        <p>
          This example uses validation provided by the containing component. In
          this example, instead of numbers, only letters are allowed.
        </p>
      </div>
      <FormRow>
        <FormItem label :help="help" :status="status">
          <my-input v-model="value2" placeholder="Enter text only..." />
        </FormItem>
      </FormRow>
    </div>

    <div class="demo-row">
      <div class="describe">
        <h2>3. Using slots</h2>
        <p>
          Passing slotted content to inner component work as expected. This
          example also shows override of label and extra by outer component.
        </p>
      </div>
      <FormRow>
        <FormItem :label="outerLabel" :extra="outerExtra">
          <my-input v-model="value3" placeholder="Foo">
            <template v-slot:prefix>
              <a-icon type="question" />
            </template>
          </my-input>
        </FormItem>
      </FormRow>
    </div>
    <header>
      <h1>Demo with compound sub-component</h1>
      <p>
        The sub-component is a compound subcomponent comprising of the same text
        input field <i>plus</i> a select dropdown (that has no validation).
        <a
          href="https://github.com/m-thomson/vue-ant-helpers/blob/main/src/components/demo/MyGrouped.vue"
          >Source.</a
        >
      </p>
    </header>

    <div class="demo-row">
      <div class="describe">
        <h2>4. With defaults</h2>
        <p>
          Using the compound subcomponents' defaults. Notice that there is a
          unified label and "extra" text.
          <br />Input value "{{ theInputVal4 }}" <br />Select value "{{
            theSelectVal4
          }}" <br />Error count: {{}}
        </p>
      </div>
      <FormRow>
        <FormItem ref="MyGrouped" label help status extra>
          <my-grouped
            :inputValue.sync="theInputVal4"
            :selectValue.sync="theSelectVal4"
          />
        </FormItem>
      </FormRow>
    </div>
  </div>
</template>
<script>
import FormRow from "../FormRow";
import FormItem from "../FormItem";
import MyInput from "./MyInput";
import MyGrouped from "./MyGrouped";

export default {
  name: "App",
  components: {
    FormRow,
    FormItem,
    MyInput,
    MyGrouped,
  },
  data() {
    return {
      value1: undefined,
      value2: undefined,
      value3: undefined,

      theInputVal4: "",
      theSelectVal4: "Jen",

      outerLabel: "Label overriden by outer",
      outerExtra: "Extra overriden by outer",
    };
  },
  computed: {
    help() {
      return this.validity.help;
    },
    status() {
      return this.validity.status;
    },
    validity() {
      if (!this.value2 || /^[A-Za-z]*$/.test(this.value2)) {
        return {
          status: "success",
          help: "This help provided by outter component",
        };
      }
      return {
        status: "error",
        help: "Outer component says: Only letters allowed!",
      };
    },
  },
};
</script>

<style>
:root {
  --form-item-label-height:39.999px;
  --form-item-element-height:40px; /* antd sets this with line-height */
  --form-item-help-height:22px; /* antd sets this with font-size:14px, line-height:1.5, margin-top:-2px, margin-bottom:-1px */
  --form-item-total-height:calc(var(--form-item-label-height) + var(--form-item-element-height) + var(--form-item-help-height));
  --form-row-gutter:12px;
}

hr {
  margin:0;
  padding:0;
  height:1px;
}

h1 {
  font-style:oblique;
  margin-top:10px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  border:1px solid black;
  padding:4px;
  background-color: lightgray;
}

.demo-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap:8px;
  border-top:1px solid black;
  border-bottom:1px solid black;
    padding:4px 0;
}
</style>
