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
                  ></fg-input>

                  <fg-input
                    v-model="form.password"
                    addon-left-icon="nc-icon nc-key-25"
                    placeholder="Password"
                    type="password"
                  ></fg-input>

                  <br />
                  <p-button
                    native-type="submit"
                    slot="footer"
                    type="warning"
                    round
                    block
                    class="mb-3"
                  >Get started</p-button>
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
      let username = this.form.username;
      let password = this.form.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  beforeDestroy() {
    this.closeMenu();
  },
};
</script>
<style>
</style>
