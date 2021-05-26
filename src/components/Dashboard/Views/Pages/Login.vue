<template>
  <div class="login-page">
    <!--<app-navbar></app-navbar>-->
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page section-image">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="col-lg-4 col-md-6 ml-auto mr-auto">
              <form @submit.prevent="login">
                <card type="login">
                  <h3 slot="header" class="header text-center">Login</h3>

                  <fg-input
                    v-model="form.username"
                    addon-left-icon="nc-icon nc-single-02"
                    placeholder="First Name..."
                    :error="usernameIncorrect"
                    :required=true
                  ></fg-input>

                  <fg-input
                    v-model="form.password"
                    addon-left-icon="nc-icon nc-key-25"
                    placeholder="Password"
                    type="password"
                    :error="passwordIncorrect"
                    :required=true
                  ></fg-input>

                  <br />
                  <p-button
                    native-type="submit"
                    slot="footer"
                    type="warning"
                    round
                    block
                    class="mb-3"
                    :disabled=loading
                  >
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="loading" />
                    Get started</p-button>
                </card>
              </form>
            </div>
          </div>
        </div>
        <!--<app-footer></app-footer>-->
        <div
          class="full-page-background"
          style="background-image: url(static/img/background/background-2.jpg) "
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, Checkbox, Button } from "src/components/UIComponents";
import AppNavbar from "./Layout/AppNavbar";
import AppFooter from "./Layout/AppFooter";

export default {
  components: {
    Card,
    AppNavbar,
    AppFooter,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button,
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle("nav-open");
    },
    closeMenu() {
      document.body.classList.remove("nav-open");
      document.body.classList.remove("off-canvas-sidebar");
    },
    login() {
      this.loading = true
      let username = this.form.username;
      let password = this.form.password;
      this.$store
        .dispatch("login", { username, password })
        .then((response) => {
          this.$router.push("/")
          this.loading = false
          this.loginResponseStatus = response.status
          console.dir(response)
        })
        .catch((err) => {
          this.loginResponseStatus = err.response.status
          this.loading = false
        });
    },
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      loginResponseStatus: -1,
      loading: false
    };
  },
  beforeDestroy() {
    this.closeMenu();
  },
  computed: {
    passwordIncorrect() {
      if ( this.loginResponseStatus === 401 ) {
        return "Password ไม่ถูกต้อง"
      } else {
        return ""
      }
    },
    usernameIncorrect(){
      if ( this.loginResponseStatus === 404 ) {
        return "ไม่มี Username นี้ในระบบ"
      } else {
        return ""
      }
    }
  },
  watch: {
    'form.username'() {
      this.loginResponseStatus = -1
    },
    'form.password'() {
      this.loginResponseStatus = -1
    }
  },
};
</script>
<style>
</style>
