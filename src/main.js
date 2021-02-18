/*!

 =========================================================
 * Vue Paper Dashboard - v2.0.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/paper-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import App from "./App";
import "./plugins/bootstrap-vue";
import router from "./router/index";

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

import * as Keycloak from 'keycloak-js';

Vue.use(PaperDashboard);

let initOptions = {
  url: 'http://132.187.226.24:8080/auth', realm: 'WueExam', clientId: 'app-wueexam', onLoad: 'login-required'
}
3
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
