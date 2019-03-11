import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    hasLogin: false
  },
  mutations: {
    setLogin(state) {
      state.hasLogin = true;
    },
    setLogout(state) {
      state.hasLogin = false;
    }
  }
});

export default store;
