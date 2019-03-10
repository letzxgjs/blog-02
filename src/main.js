// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/index.css";
import Vuex from "Vuex";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);

// const store = new Vuex.Store({
//   state: {
//     hasLogin: false
//   },
//   mutations: {
//     hasLogin(state) {
//       state.hasLogin = true;
//     },
//     logout(state) {
//       state.hasLogin = false;
//     }
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  components: {
    App
  },
  template: "<App/>"
});
