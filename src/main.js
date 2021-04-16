import Vue from "vue";
import App from "./App";
import "./plugins/bootstrap-vue";
import router from "./router/index";
import "@/plugins/echarts";
import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import VueApexCharts from "vue-apexcharts";
// import store from "./store/store"; // in kaycloak main.js hinzufügen


Vue.config.productionTip = false
Vue.prototype.$IPBE = 'http://132.187.226.24:5000'
Vue.prototype.$IPOPTIMIZATION = 'http://132.187.226.24:5001'

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);


Vue.use(PaperDashboard);

new Vue({
  router,

  render: h => h(App),
}).$mount("#app");