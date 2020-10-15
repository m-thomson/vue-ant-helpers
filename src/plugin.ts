import ShowFormItem from './components/ShowFormItem.vue'
import { FormItem } from '@/components/FormSVC'

import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  Popover,
  Row,
  Select,
} from "ant-design-vue";

import 'ant-design-vue/lib/button/style'
import 'ant-design-vue/lib/col/style'
import 'ant-design-vue/lib/form/style'
import 'ant-design-vue/lib/icon/style'
import 'ant-design-vue/lib/input/style'
import 'ant-design-vue/lib/popover/style'
import 'ant-design-vue/lib/row/style'
import 'ant-design-vue/lib/select/style'


export default {
  install(Vue:any) {
    Vue.use(Popover);
    Vue.use(Button);
    Vue.use(Form);
    Vue.use(Col);
    Vue.use(Row);
    Vue.use(Input);
    Vue.use(Icon);
    Vue.use(Select);
    Vue.use(Select.Option);

    // Register globally
    Vue.component('ShowFormItem', ShowFormItem)

    // Attach class to global Vue object
    Vue.prototype.$FormItem = FormItem
  }
};
