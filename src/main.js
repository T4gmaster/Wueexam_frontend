<<<<<<< HEAD
=======

>>>>>>> Offline-testing
import Vue from "vue";
import App from "./App";
import "./plugins/bootstrap-vue";
import router from "./router/index";
import "@/plugins/echarts";
import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

Vue.use(PaperDashboard);

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");