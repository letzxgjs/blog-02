import Vue from "vue";
import Vuex from "vuex";
import Cookie from "js-cookie";
import { clearLoginInfo } from "@/lib/tool.js";
import { info } from "@/api/user.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: Cookie.get("username"),
    hasLogin: Cookie.get("username"),
    avatar: "",
    role: ""
  },
  mutations: {
    setUsername(state, val) {
      Cookie.set("username", val);
      state.username = val;
    },
    setLogin(state, val = true) {
      // Cookie.set("username", val);
      state.hasLogin = val;
    },
    setLogout(state) {
      clearLoginInfo();
      state.hasLogin = false;
      state.username = "";
    },
    getAvatar(state, val) {
      state.avatar = val;
    },
    getRole(state, val) {
      state.role = val;
    }
  },
  actions: {
    getInfo({ commit }) {
      info().then(res => {
        if (res.data.status == "success") {
          commit("getAvatar", res.data.data.avatar);
          commit("getRole", res.data.data.role);
        }
      });
    }
  }
});

export default store;
