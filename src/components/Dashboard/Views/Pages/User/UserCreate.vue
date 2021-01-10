<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submit)">
      <div class="row center">
        <div class="col-md-8">
          <card>
            <h5 slot="header" class="card-title">
              User
              <hr />
            </h5>
            <div class="row">
              <div class="col-md-4">
                <ValidationProvider
                  name="firstName"
                  rules="required"
                  v-slot="{ passed, failed }"
                >
                  <fg-input
                    placeholder
                    label="ชื่อ"
                    v-model="users.firstName"
                    :error="failed ? 'The field is required' : null"
                    :hasSuccess="passed"
                  ></fg-input>
                </ValidationProvider>
              </div>
              <div class="col-md-4">
                <ValidationProvider
                  name="lastName"
                  rules="required"
                  v-slot="{ passed, failed }"
                >
                  <fg-input
                    placeholder
                    label="นามสกุล"
                    v-model="users.lastName"
                    :error="failed ? 'The field is required' : null"
                    :hasSuccess="passed"
                  ></fg-input>
                </ValidationProvider>
              </div>
              <div class="col-md-4">
                <ValidationProvider
                  name="nickName"
                  rules="required"
                  v-slot="{ passed, failed }"
                >
                  <fg-input
                    placeholder
                    label="ชื่อเล่น"
                    v-model="users.nickName"
                    :error="failed ? 'The field is required' : null"
                    :hasSuccess="passed"
                  ></fg-input>
                </ValidationProvider>
              </div>
              <div class="col-md-6">
                <ValidationProvider
                  name="email"
                  rules="required|email"
                  v-slot="{ passed, failed }"
                >
                  <fg-input
                    placeholder
                    label="e-mail"
                    v-model="users.email"
                    :error="failed ? 'The field format email' : null"
                    :hasSuccess="passed"
                  ></fg-input>
                </ValidationProvider>
              </div>
              <div class="col-md-6">
                <div>
                  <label>role</label>
                </div>
                <el-select
                  class="select-primary select-width-100"
                  placeholder="select"
                  v-model="roleSelects.select"
                >
                  <el-option
                    v-for="option in roleSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6" v-if="$route.query.id">
                <ValidationProvider
                  name="username"
                  rules="required"
                  v-slot="{ passed, failed }"
                >
                  <fg-input
                    placeholder
                    label="username"
                    disabled
                    v-model="users.username"
                    :error="failed ? 'The field is required' : null"
                    :hasSuccess="passed"
                  ></fg-input>
                </ValidationProvider>
              </div>
              <div class="col-md-6" v-else>
                <ValidationProvider
                  name="username"
                  rules="required"
                  v-slot="{ passed, failed }"
                >
                  <fg-input
                    placeholder
                    label="username"
                    v-model="users.username"
                    :error="failed ? 'The field is required' : null"
                    :hasSuccess="passed"
                  ></fg-input>
                </ValidationProvider>
              </div>
              <div class="col-md-6">
                <ValidationProvider
                  name="password"
                  rules="min:6|max:40"
                  v-slot="{ passed, failed }"
                >
                  <fg-input
                    placeholder
                    label="password"
                    v-model="users.password"
                    type="password"
                    :error="failed ? 'size must be between 6 and 40' : null"
                    :hasSuccess="passed"
                  ></fg-input>
                </ValidationProvider>
              </div>
              <div class="col-md-6">
                <div>
                  <label>Zone</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="zoneSelect.select"
                >
                  <el-option
                    v-for="option in zoneSelect.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <template slot="footer">
              <hr />
              <div class="stats">
                <p-button
                  type="info"
                  round
                  @click="handleSubmit(submit)"
                  v-loading.fullscreen.lock="fullscreenLoading"
                  >{{ btnAction }}</p-button
                >
              </div>
            </template>
          </card>
          <!-- end card -->
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import Vue from "vue";
import { Card } from "src/components/UIComponents";
import "@trevoreyre/autocomplete-vue/dist/style.css";
import { Select, Option } from "element-ui";
import axios from "axios";
import { mapGetters } from "vuex";
import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// with typescript
for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
  });
}

export default {
  components: {
    Card,
    [Select.name]: Select,
    [Option.name]: Option,
    // TransportBox,
  },

  created: function () {
    if (this.$route.query.id) {
      let postBody = {
        username: this.$route.query.id,
      };
      console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/user/list`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((resp) => {
        // console.log("resp : " + JSON.stringify(resp.data[0]));
        this.btnAction = "Edit";
        this.users.firstName = resp.data[0].firstName;
        this.users.lastName = resp.data[0].lastName;
        this.users.nickName = resp.data[0].nickName;
        this.users.username = resp.data[0].username;
        this.users.email = resp.data[0].email;
        this.users.password = resp.data[0].password;
        this.roleSelects.select = resp.data[0].roles[0].name;
        this.zoneSelect.select = resp.data[0].zone;
      });
    }
  },

  data() {
    return {
      fullscreenLoading: false,
      btnAction: "Add",
      zoneSelect: {
        select: "",
        data: [
          { value: "พระราม 9", label: "พระราม 9" },
          { value: "อโศก", label: "อโศก" },
          { value: "สีลม", label: "สีลม" },
        ],
      },
      roleSelects: {
        select: "",
        data: [
          { value: "ROLE_SALE", label: "SALE" },
          { value: "ROLE_SALE_MANAGER", label: "SALE_MANAGER" },
        ],
      },

      users: {
        firstName: "",
        lastName: "",
        nickName: "",
        username: "",
        email: "",
        password: "",
        roles: "",
      },
    };
  },

  methods: {
    submit() {
      this.createUser();
    },
    createUser() {
      this.fullscreenLoading = true;
      let path = "api/auth/signup";
      let roles = [this.roleSelects.select];
      let postBody = {
        firstName: this.users.firstName,
        lastName: this.users.lastName,
        nickName: this.users.nickName,
        username: this.users.username,
        email: this.users.email,
        password: this.users.password,
        zone: this.zoneSelect.select,
        roles: roles,
      };
      if (this.$route.query.id) {
        path = "api/user/edit";
        postBody = {
          firstName: this.users.firstName,
          lastName: this.users.lastName,
          nickName: this.users.nickName,
          username: this.users.username,
          email: this.users.email,
          password: this.users.password,
          zone: this.zoneSelect.select,
          roles: roles,
        };
      }
      console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(path, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((resp) => {
          this.fullscreenLoading = false;
          this.$notify({
            message: "Success",
            icon: "fa fa-gift",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success",
          });
          this.$router.push("/admin/user");
        })
        .catch((err) => {
          this.fullscreenLoading = false;
          this.$notify({
            message: "Error",
            // icon: 'fa fa-gift',
            // component: NotificationTemplate,
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "warning",
          });
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
  },
};
</script>
<style lang="scss">
.center {
  justify-content: center;
}

.bg-grey {
  background-color: #c1c5caa6 !important;
}

.select-width-100 {
  width: 100%;
}
</style>
