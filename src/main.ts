import Vue from "vue";
import "./components/FormSVC"
import DemoApp from "./components/demo/DemoApp.vue";

new Vue({
  render: (h) => h(DemoApp)
}).$mount("#app");
