import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from 'vuex-persistedstate'
import VueCookies from 'vue-cookies';

Vue.use(Vuex);
Vue.use(VueCookies);

function funIsEmpty(obj){
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

export default new Vuex.Store({
  state: {
    status: localStorage.getItem("status") || "",
    token: localStorage.getItem("token") || "",
    user: localStorage.getItem("user") || {},
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, user) {
      state.status = "success";
      state.token = user.token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    isEmpty(obj) {
      return funIsEmpty(obj)
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        const AXIOS = axios.create({
          baseURL: process.env.VUE_APP_BACKEND_URL
        });
        AXIOS.post(`api/auth/signin`, {username: user.username, password: user.password}, {headers : {"Content-Type": "application/json"}})
          .then(resp => {
            const user = {
              token: resp.data.token,
              firstName: resp.data.firstName,
              lastName: resp.data.lastName,
              email: resp.data.email,
              roles: resp.data.roles,
              username: resp.data.username
            };
            localStorage.setItem("token", user.token);
            localStorage.setItem("user", user);
            localStorage.setItem("status", "success");
            axios.defaults.headers.common["Authorization"] = user.token;
            commit("auth_success", user);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("status");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("status");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
  modules: {},
  getters: {
    isLoggedIn: state => !!(state.token && !funIsEmpty(state.user)),
    authStatus: state => state.status && !funIsEmpty(state.user),
    getUser: state => state.user,
  },
  plugins: [
    createPersistedState({
      getState: (key) => Vue.$cookies.get(key),
      setState: (key, state) => Vue.$cookies.set(key, state, { expires: 3, secure: true })
    })
  ]
});
