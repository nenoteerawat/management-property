<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" id="login-form" @submit.prevent="login">
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                    :rules="usernameRules"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :disabled="!valid"
                  type="submit"
                  form="login-form"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AuthService from "@/services/AuthService.js";

export default {
  data: () => ({
    valid: false,
    username: "",
    usernameRules: [v => !!v || "Username is required"],
    password: "",
    passwordRules: [v => !!v || "Password is required"]
  }),
  computed: {
    ...mapState("account")
  },
  created() {
    this.logout();
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
    handleSubmit() {
      this.submitted = true;
      const { username, password, valid } = this;
      if (valid) {
        this.login({ username, password });
      }
    },
    async login() {
      const credentials = {
        username: this.username,
        password: this.password,
        grant_type: "password",
        scope: "profile",
        client_id: "backend-property-service",
        client_secret: "1b5b1741-f8ae-491e-aa50-7c3b671fefa2"
      };
      const response = await AuthService.login(credentials);
      const token = response.token;
      const user = response.user;
      this.$store.dispatch("login", { token, user });
      this.$router.push("/");
    }
  }
};
</script>
