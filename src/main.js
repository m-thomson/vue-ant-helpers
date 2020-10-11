import Vue from "vue";
import App from "./components/demo/App.vue";

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
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
