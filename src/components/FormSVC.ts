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

type TFormItemOpts = {
  label?:string
  extra?:string
  status?:string
  help?:string
  value:any
}
export type TFormItemNode = TVue & {
  formItem?:FormItem
}

export class FormItem<T extends TFormItemOpts = any> {
  protected _vm:TVue
  protected _values: {
    status: string
    help: string
    value: T['value']
  }
  readonly label:string
  readonly extra:string
  readonly defaultHelp:string
  constructor(vm:TVue, opts:T) {
    this._vm = vm
    this.label = opts.label || ''
    this.extra = opts.extra || ''
    this.defaultHelp = opts.help || ''
    this._values = {
      help: opts.help || '',
      status: opts.status || '',
      value: opts.value
    }
  }
  get status() { return this._values.status }
  get help() { return this._values.help || this.defaultHelp }
  get value() { return this._values.value }
  set value(v:any) { this._values.value = v }
  set help(v:string) { this._values.help = v }
  set status(v:any) { this._values.status = v }
  /**
   * Iterates over immediate <FormItem> children, gathers their
   * validity objects and then reduces those down to a single
   * validity object.
   */
  validateChildItems() {
    const errors = [] as string[]
    const warnings = [] as string[]
    this._vm.$children.forEach((v:any) => {
      if (v.itemStatus === 'error')
        errors.push(v.itemHelp)
      if (v.itemStatus === 'warning')
        warnings.push(v.itemHelp)
    })
    if (errors.length) {
      this.status = 'error'
      this.help = errors.join(';')
    }
    else if (warnings.length) {
      this.status = 'warning'
      this.help = warnings.join(';')
    }
  }
}
