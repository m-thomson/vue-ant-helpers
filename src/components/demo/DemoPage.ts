import Vue from 'vue'
import { defineComponent } from '@vue/composition-api'
import DemoInput from './DemoInput.vue'
import DemoSelect from './DemoSelect.vue'
import DemoGroupedInput1 from './DemoGroupedInput1.vue'
import DemoGroupedInput2 from './DemoGroupedInput2.vue'

Vue.component('DemoInput', DemoInput)
Vue.component('DemoSelect', DemoSelect)
Vue.component('DemoGroupedInput1', DemoGroupedInput1)
Vue.component('DemoGroupedInput2', DemoGroupedInput2)

export const demos = {
  //////////////////////////////////////////////////
  demoA1: Vue.component('demoA1', defineComponent({
  //////////////////////////////////////////////////
    template: `
      <div class="demo-row">
        <div class="describe">
          <h2 id="A1">A1. With defaults <a href="#A1">#</a></h2>
          <p>
            Here we are using the child's defaults for label, help, extra 
            and status. We are also using the child's validation.
            <br/>{{value}}
          </p>
        </div>
        <div class="form-row">
          <ShowFormItem ref="demoA1" help label extra>
            <DemoInput v-model="value"/>
          </ShowFormItem>
        </div>
      </div>`,
    data() {
      return { value: '' }
    },
  })),
  //////////////////////////////////////////////////
  demoA2: Vue.component('demoA2', defineComponent({
  //////////////////////////////////////////////////
    template: `
      <div class="demo-row">
        <div class="describe">
          <h2 id="A2">A2. With validation and help override<a href="#A2">#</a></h2>
          <p>
            This example uses validation provided by the parent component. 
            In this example, instead of numbers, only letters are allowed.
          </p>
        </div>
        <div class="form-row">
          <ShowFormItem label :help="help" :status="status">
            <DemoInput v-model="value" placeholder="Enter text only..."/>
          </ShowFormItem>
        </div>
      </div>`,
    data() {
      return { value: '', status: '', help: '' }
    },
    computed: {
      validity() {
        if (!this.value || /^[A-Za-z]*$/.test(this.value)) {
            this.status = 'success'
            this.help = 'This help provided by outer component'
        } else {
          this.status = 'error'
          this.help = 'Outer component says: Only letters allowed!'
        }
      },
    },
  })),
  //////////////////////////////////////////////////
  demoA3: Vue.component('demoA3', defineComponent({
  //////////////////////////////////////////////////
    template: `   
      <div class="demo-row">
        <div class="describe">
          <h2 id="A3">A3. Using slots <a href="#A3">#</a></h2>
          <p>
            Passing slotted content to child component work as
            expected. This example also shows override of label and extra by parent.
          </p>
        </div>
        <div class="form-row">
          <ShowFormItem label='Label overridden by outer' extra='Extra overridden by outer'>
            <DemoInput v-model="value" placeholder="Foo">
              <!-- slotted content for <DemoInput> -->
              <template v-slot:prefix>
                <a-icon type="question"/>
              </template>
            </DemoInput>
          </ShowFormItem>
        </div>
      </div>`,
    data() {
      return { value: '' }
    },
  })),
  //////////////////////////////////////////////////
  demoA4: Vue.component('demoA4', defineComponent({
  //////////////////////////////////////////////////
    template: ` 
      <div class="demo-row">
        <div class="describe">
          <h2 id="A4">A4. Using tooltip <a href="#A4">#</a></h2>
          <p>
            Example using tooltip.
          </p>
        </div>
        <div class="form-row">
          <ShowFormItem label='Label overridden by outer' extra='Extra overridden by outer' help>
            <ShowFormItemTip>
              <span slot="title">This is a tooltip</span>
              <DemoSelect v-model="value" help/>
            </ShowFormItemTip>
          </ShowFormItem>
        </div>
      </div>`,
    data() {
      return { value: '' }
    },
  })),
  //////////////////////////////////////////////////
  demoB1: Vue.component('demoB1', defineComponent({
  //////////////////////////////////////////////////
    template: `
      <div class="demo-row">
        <div class="describe">
          <h2 id="B1">B1. With defaults <a href="#B1">#</a></h2>
          <p>
            Using the child's defaults. Notice that there is a 
            unified label and "extra" text.
            <br/>
            Input value "{{inputVal}}"
            <br/>
            Select value "{{selectVal}}"
            <br/>
            Error count: {{}}
          </p>
        </div>
        <div class="form-row">
          <ShowFormItem ref="MyGrouped" label help status extra>
            <DemoGroupedInput1
              :inputValue.sync="inputVal"
              :selectValue.sync="selectVal"
            />
          </ShowFormItem>
        </div>
      </div>`,
    data() {
      return { inputVal: '', selectVal: '' }
    },
  })),
  //////////////////////////////////////////////////
  demoB2: Vue.component('demoB2', defineComponent({
  //////////////////////////////////////////////////
    template: `    
      <div class="demo-row">
        <div class="describe">
          <h2 id="B2">B2. Three inputs <a href="#B2">#</a></h2>
          <p>
            To do.
          </p>
        </div>
        <div class="form-row">
          <ShowFormItem label help status extra>
            <DemoGroupedInput2
              :inputLeftValue.sync="inputLeftVal"
              :inputRightValue.sync="inputRightVal"
              :selectValue.sync="selectVal"
            />
          </ShowFormItem>
        </div>
      </div>`,
    data() {
      return { inputLeftVal: '', inputRightVal: '', selectVal: '' }
    },
  })),

}
