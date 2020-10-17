import ShowFormItem from './components/ShowFormItem.vue'
import ShowFormItemTip from './components/ShowFormItemTip.vue'
import { FormItem } from '@/components/FormSVC'

import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  Modal,
  Popover,
  Row,
  Select,
  Tooltip,
} from "ant-design-vue";

import 'ant-design-vue/lib/button/style'
import 'ant-design-vue/lib/col/style'
import 'ant-design-vue/lib/form/style'
import 'ant-design-vue/lib/icon/style'
import 'ant-design-vue/lib/input/style'
import 'ant-design-vue/lib/modal/style'
import 'ant-design-vue/lib/popover/style'
import 'ant-design-vue/lib/row/style'
import 'ant-design-vue/lib/select/style'
import 'ant-design-vue/lib/tooltip/style'


export default {
  install(Vue:any) {
    Vue.use(Popover);
    Vue.use(Button);
    Vue.use(Form);
    Vue.use(Col);
    Vue.use(Row);
    Vue.use(Input);
    Vue.use(Icon);
    Vue.use(Modal);
    Vue.use(Select);
    Vue.use(Select.Option);
    Vue.use(Tooltip);

    // Register globally
    Vue.component('ShowFormItem', ShowFormItem)
    Vue.component('ShowFormItemTip', ShowFormItemTip)

    // Attach class to global Vue object
    Vue.prototype.$FormItem = FormItem
  }
};
