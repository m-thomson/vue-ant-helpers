<template>
  <div id="app" style="margin: 10px">
    <div class="demo-row">
      <div class="describe">
        <h2>Using defaults</h2>
        <p>This inner component has validation that allows only numbers.</p>
      </div>
      <FormRow>
        <FormItem status help label extra>
          <my-input v-model="theValue0" />
        </FormItem>
      </FormRow>
    </div>
    <hr />
    <div class="demo-row">
      <div class="describe">
        <h2>Using slots</h2>
        <p>
          Passing slotted content to inner component work as expected. This
          example also shows override of label and extra by outer component.
        </p>
      </div>
      <FormRow>
        <FormItem :label="outerLabel" :extra="outerExtra">
          <my-input v-model="theValue1" placeholder="Foo">
            <template v-slot:prefix>
              <a-icon type="question" />
            </template>
          </my-input>
        </FormItem>
      </FormRow>
    </div>
    <hr />
    <div class="demo-row">
      <div class="describe">
        <h2>Validation - inner</h2>
      </div>
      <FormRow>
        <FormItem label help status>
          <my-input v-model="theValue2" />
        </FormItem>
      </FormRow>
    </div>
    <hr />
    <div class="demo-row">
      <div class="describe">
        <h2>Validation - outer</h2>
        <p>
          This example uses validation provided by the containing component. In
          this example, instead of numbers, only letters are allowed
        </p>
      </div>
      <FormRow>
        <FormItem label :help="help" :status="status">
          <my-input v-model="theValue3" placeholder="Enter text only..." />
        </FormItem>
      </FormRow>
    </div>
    <hr />
    <div class="demo-row">
      <div class="describe">
        <h2>Grouping</h2>
        <p>...</p>
      </div>
      <FormRow>
        <FormItem label help>
          <my-grouped />
        </FormItem>
      </FormRow>
    </div>
    <hr />
    <br />
  </div>
</template>
<script>
import FormRow from "./components/FormRow";
import FormItem from "./components/FormItem";
import FormItemGroup from "./components/FormItemGroup";
import MySelect from "./components/MySelect";
import MyInput from "./components/MyInput";
import MyGrouped from "./components/MyGrouped";

export default {
  name: "App",
  components: {
    FormRow,
    FormItem,
    FormItemGroup,
    MyInput,
    MySelect,
    MyGrouped,
  },
  data() {
    return {
      theValue0: undefined,
      theValue1: undefined,
      theValue2: undefined,
      theValue3: undefined,
      theSelectVal: "Jen",
      outerLabel: "Label overriden by outer",
      outerExtra: "Extra overriden by outer",
    };
  },
  methods: {
    onInput() {},
  },
  computed: {
    help() {
      return this.validity.help;
    },
    status() {
      return this.validity.status;
    },
    validity() {
      if (!this.theValue3 || /^[A-Za-z]*$/.test(this.theValue3)) {
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
  --form-item-element-height:40px; /* set with line-height */
  --form-item-help-height:22px; /* font-size:14px, line-height:1.5, margin-top:-2px, margin-bottom:-1px */
  --form-item-total-height:calc(var(--form-item-label-height) + var(--form-item-element-height) + var(--form-item-help-height));
  --form-row-gutter:12px;
}

hr {
  margin:0;
  padding:0;
  height:1px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

.demo-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap:8px;
}
</style>
