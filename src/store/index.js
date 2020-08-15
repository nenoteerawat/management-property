import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {}
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
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:8090/api/auth/signin",
          data: {
            username: user.username,
            password: user.password
          },
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(resp => {
            const user = {
              token: resp.data.token,
              firstName: resp.data.firstName,
              lastName: resp.data.lastName,
              email: resp.data.email,
              roles: resp.data.roles
            };
            localStorage.setItem("token", user.token);
            axios.defaults.headers.common["Authorization"] = user.token;
            commit("auth_success", user);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  modules: {},
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
});
