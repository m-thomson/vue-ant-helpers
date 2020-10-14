import Vue from 'vue'
import { Vue as TVue } from 'vue/types/vue'

import "ant-design-vue/dist/antd.css";
import {
  Popover,
  Button,
  Form,
  Col,
  Row,
  Input,
  Icon,
  Select
} from "ant-design-vue";

Vue.use(Popover);
Vue.use(Button);
Vue.use(Form);
Vue.use(Col);
Vue.use(Row);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Select);
Vue.use(Select.Option);

Vue.config.productionTip = false;

export type TValidity = {
  status:string, help:string
}

export type TFormItemNode = TVue & {
  label?:string
  extra?:string
  state?:{
    value?:any
  }
  validity?:TValidity
}
/** Returns the parent or child value */
export function parentOrChildVal(parentVal:string | boolean, childValFN:Function):string {
  if (typeof parentVal === 'string') return parentVal
  if (parentVal === true) {
    const descendantVal = childValFN()
    if (descendantVal) return descendantVal
  }
  return ''
}

/**
 * Iterates over immediate <FormItem> children, gathers their
 * validity objects and then reduces those down to a single
 * validity object.
 */
export function groupValidity(vm:TVue, defaultHelp = ''):TValidity {
  const errors = [] as string[]
  const warnings = [] as string[]
  Object.values(vm.$children).forEach((v:TFormItemNode) => {
    if (v.validity) {
      const { status, help } = v.validity
      if (status === 'error') errors.push(help)
      if (status === 'warning') warnings.push(help)
    }
  })
  if (errors.length) {
    return {
      status: 'error',
      help: errors.join(';'),
    }
  }
  if (warnings.length) {
    return {
      status: 'warning',
      help: warnings.join(';'),
    }
  }
  return  { status: '', help: defaultHelp }
}
