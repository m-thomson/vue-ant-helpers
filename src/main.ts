import Vue from "vue";
import "./components/FormSVC"
import DemoApp from "./components/demo/DemoApp.vue";
import plugin from "./plugin"

Vue.config.productionTip = false;
Vue.use(plugin)

new Vue({
  render: (h) => h(DemoApp)
}).$mount("#app");
