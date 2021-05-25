import Vue from "vue";
import App from "./App";
import "./plugins/bootstrap-vue";
import router from "./router/index";
import "@/plugins/echarts";
import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import VueApexCharts from "vue-apexcharts";
// import store from "./store/store"; // in kaycloak main.js hinzufügen

import * as Keycloak from 'keycloak-js';

Vue.config.productionTip = false
Vue.prototype.$IPBE = 'localhost:5000'  //'http://132.187.226.24:5000'
Vue.prototype.$IPOPTIMIZATION = 'localhost:5001'//'http://132.187.226.24:5001'
Vue.prototype.$NAME = 'test'
Vue.prototype.$PW = 'test1'


Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);


Vue.use(PaperDashboard);

let initOptions = {
  url: 'localhost:8080/auth', realm: 'WueExam', clientId: 'app-wueexam', onLoad: 'login-required'
} //'http://132.187.226.24:8080/auth'

let keycloak = Keycloak(initOptions);
Vue.prototype.$keycloak = keycloak;

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    console.log("Authenticated");

    new Vue({
      router,
      render: h => h(App, { props: { keycloak: keycloak } }),
    }).$mount("#app");
  }


//Token Refresh
  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.log('Token refreshed' + refreshed);
      } else {
        console.log('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      console.log('Failed to refresh token');
    });
  }, 6000)

}).catch(() => {
  console.log("Authenticated Failed");
});
