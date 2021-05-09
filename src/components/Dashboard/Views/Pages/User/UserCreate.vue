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
              <div class="col-md-4">
                <div>
                  <label>Zone</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="zoneSelect.select"
                  @change="onChangeTransports($event)"
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
              <div class="col-md-4">
                <div>
                  <label>Sub Zone</label>
                </div>
                <model-select
                  :options="subZoneSelect"
                  v-model="subZone"
                  class="select"
                  placeholder="เลือกโซนย่อย"
                >
                </model-select>
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
import { ModelSelect } from "vue-search-select";

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
    ModelSelect,
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
        this.subZone = resp.data[0].subZone;
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
          { value: "Silom", label: "Silom" },
          { value: "Ratchada", label: "Ratchada" },
          { value: "South Sukhumvit", label: "South Sukhumvit" },
          { value: "North Sukhumvit", label: "North Sukhumvit" },
        ],
      },
      subZone: "",
      subZoneSelect: [],
      subZoneSilomSelect: [
        { value: "Sathorn", text: "Sathorn" },
        { value: "Charoenkrung", text: "Charoenkrung" },
        { value: "Rama3", text: "Rama3" },
        { value: "Sam Yan", text: "Sam Yan" },
        { value: "Charoen Nakorn", text: "Charoen Nakorn" },
        { value: "Wong Wian Yai", text: "Wong Wian Yai" },
        { value: "Tha Phra", text: "Tha Phra" },
        { value: "Bang Wa", text: "Bang Wa" },
        { value: "Bang Kae", text: "Bang Kae" },
        { value: "Rat Burana", text: "Rat Burana" },
      ],
      subZoneRatchadaSelect: [
        { value: "Ratchada", text: "Ratchada" },
        { value: "Asoke", text: "Asoke" },
        { value: "Phetchaburi", text: "Phetchaburi" },
        { value: "Rama9", text: "Rama9" },
        { value: "Ramkamhang", text: "Ramkamhang" },
        { value: "Thailand Cultural Centre", text: "Thailand Cultural Centre" },
        { value: "Huai khawng", text: "Huai khawng" },
        { value: "Suthisan", text: "Suthisan" },
        { value: "Ladphrao ตอนต้น", text: "Ladphrao ตอนต้น" },
        { value: "Ladphrao ตอนปลาย", text: "Ladphrao ตอนปลาย" },
        { value: "Ratchayothin", text: "Ratchayothin" },
        { value: "Kaset", text: "Kaset" },
        { value: "Bangkhen", text: "Bangkhen" },
        { value: "Vibhavadi", text: "Vibhavadi" },
        { value: "Ram Inthra", text: "Ram Inthra" },
        { value: "Liab duan Ram Inthra", text: "Liab duan Ram Inthra" },
        { value: "Nana", text: "Nana" },
      ],
      subZoneSouthSukhumvitSelect: [
        { value: "Rama4", text: "Rama4" },
        { value: "Pattanakan", text: "Pattanakan" },
        { value: "Srinagarindra", text: "Srinagarindra" },
        { value: "Bang Na", text: "Bang Na" },
        { value: "Lat Krabang", text: "Lat Krabang" },
        { value: "Theparak", text: "Theparak" },
        { value: "BTS Erawan", text: "BTS Erawan" },
        { value: "BTS Pu Chao", text: "BTS Pu Chao" },
        { value: "BTS Bearing", text: "BTS Bearing" },
        { value: "BTS Bang Na", text: "BTS Bang Na" },
        { value: "BTS Udom Suk", text: "BTS Udom Suk" },
        { value: "BTS Punnawithi", text: "BTS Punnawithi" },
        { value: "BTS Bang Chak", text: "BTS Bang Chak" },
        { value: "BTS ON Nut", text: "BTS ON Nut" },
        { value: "BTS Phra Khanong", text: "BTS Phra Khanong" },
        { value: "BTS Ekamai", text: "BTS Ekamai" },
        { value: "BTS Thong Lo", text: "BTS Thong Lo" },
        { value: "BTS Phrom Phong", text: "BTS Phrom Phong" },
      ],
      subZoneNorthSukhumvitSelect: [
        { value: "BTS Siam", text: "BTS Siam" },
        { value: "BTS Ratchathewi", text: "BTS Ratchathewi" },
        { value: "BTS Phaya Thai", text: "BTS Phaya Thai" },
        { value: "BTS Victory Monument", text: "BTS Victory Monument" },
        { value: "BTS Sanam Pao", text: "BTS Sanam Pao" },
        { value: "BTS Ari", text: "BTS Ari" },
        { value: "BTS Saphan Khwai", text: "BTS Saphan Khwai" },
        { value: "BTS Mo Chit", text: "BTS Mo Chit" },
        { value: "Phahon Yothin", text: "Phahon Yothin" },
        { value: "Chatuchak Park", text: "Chatuchak Park" },
        { value: "MRT Bang Sue", text: "MRT Bang Sue" },
        { value: "MRT Tao Poon", text: "MRT Tao Poon" },
        { value: "MRT Bang Pho", text: "MRT Bang Pho" },
        { value: "MRT Bang O", text: "MRT Bang O" },
        { value: "MRT Bang Phlat", text: "MRT Bang Phlat" },
        { value: "MRT Charan", text: "MRT Charan" },
        { value: "MRT Bang Khun Non", text: "MRT Bang Khun Non" },
        { value: "MRT Sirindhorn", text: "MRT Sirindhorn" },
        { value: "MRT Bang Yi Khan", text: "MRT Bang Yi Khan" },
      ],
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
    onChangeTransports(event) {
      this.subZone = "";
      this.subZoneSelect = [];
      if (event == "Silom") this.subZoneSelect = this.subZoneSilomSelect;
      else if (event == "Ratchada")
        this.subZoneSelect = this.subZoneRatchadaSelect;
      else if (event == "South Sukhumvit")
        this.subZoneSelect = this.subZoneSouthSukhumvitSelect;
      else if (event == "North Sukhumvit")
        this.subZoneSelect = this.subZoneNorthSukhumvitSelect;
    },
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
        subZone: this.subZone,
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
          subZone: this.subZone,
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
