<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submit)">
      <div class="row center">
        <div class="col-md-10">
          <card>
            <h5 slot="header" class="card-title">
              Project
              <hr />
            </h5>
            <div class="row">
              <div class="col-md-3">
                <fieldset>
                  <div class="form-group">
                    <label class="control-label">ประเภท</label>
                    <div class="col-md-12">
                      <p-radio label="1" v-model="project.type" value="1" :inline="true">คอนโด</p-radio>
                      <p-radio label="2" v-model="project.type" value="2" :inline="true">บ้าน</p-radio>
                      <p-radio label="3" v-model="project.type" value="3" :inline="true">ที่ดิน</p-radio>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-4">
                <ValidationProvider name="name" rules="required" v-slot="{ passed, failed }">
                  <fg-input
                    placeholder
                    label="โครงการ"
                    v-model="project.name"
                    :error="failed ? 'The field is required': null"
                    :hasSuccess="passed"
                  ></fg-input>
                </ValidationProvider>
              </div>
              <div class="col-md-5">
                <ValidationProvider name="address" rules="required" v-slot="{ passed, failed }">
                  <fg-input
                    placeholder
                    label="ที่อยู่"
                    v-model="project.address"
                    :error="failed ? 'The field is required': null"
                    :hasSuccess="passed"
                  ></fg-input>
                </ValidationProvider>
              </div>
              <div class="col-md-3">
                <ThailandAutoComplete
                  v-model="district"
                  type="district"
                  @select="select"
                  label="ตำบล"
                  placeholder="ตำบล..."
                />
              </div>
              <div class="col-md-3">
                <ThailandAutoComplete
                  v-model="amphoe"
                  type="amphoe"
                  @select="select"
                  label="อำเภอ"
                  placeholder="อำเภอ..."
                />
              </div>
              <div class="col-md-3">
                <ThailandAutoComplete
                  v-model="province"
                  type="province"
                  @select="select"
                  label="จังหวัด"
                  placeholder="จังหวัด..."
                />
              </div>
              <div class="col-md-3">
                <ThailandAutoComplete
                  v-model="zipcode"
                  type="zipcode"
                  @select="select"
                  label="รหัสไปรษณีย์"
                  placeholder="รหัสไปรษณีย์..."
                />
              </div>
              <div class="col-md-12">
                <div>
                  <label>ส่วนกลาง</label>
                </div>
                <el-select
                  multiple
                  class="select-primary select-width-100"
                  placeholder="Select"
                  v-model="facilitySelects.selects"
                >
                  <el-option
                    v-for="option in facilitySelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-12">
                <div class="row" v-for="(building,k) in buildings" :key="k">
                  <div class="col-md-2">
                    <fg-input placeholder label="ชั้น" type="number" v-model="building.floor"></fg-input>
                  </div>
                  <div class="col-md-2">
                    <fg-input placeholder label="ตึก" v-model="building.building"></fg-input>
                  </div>
                  <div class="col-md-2">
                    <fg-input
                      placeholder
                      label="ปีที่สร้างเสร็จ"
                      type="number"
                      v-model="building.develop"
                    ></fg-input>
                  </div>
                  <div class="col-md-2">
                    <div>
                      <label>เพิ่ม / ลบ</label>
                    </div>
                    <span>
                      <p-button
                        type="danger"
                        size="sm"
                        icon
                        @click="removeBuilding(k)"
                        v-show="k || ( !k && buildings.length > 1)"
                      >
                        <i class="nc-icon nc-simple-remove"></i>
                      </p-button>
                      <p-button
                        type="primary"
                        size="sm"
                        icon
                        v-show="k == buildings.length-1"
                        @click="addBuilding(k)"
                      >
                        <i class="nc-icon nc-simple-add"></i>
                      </p-button>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row" v-for="(transport,k) in transports" :key="k">
                  <div class="col-md-2">
                    <div>
                      <label>การเดินทาง</label>
                    </div>
                    <el-select
                      class="select-primary"
                      placeholder="Select"
                      v-model="transport.type"
                      @change="onChangeTransports($event, k)"
                    >
                      <el-option
                        v-for="option in transportTypeSelect.data"
                        class="select-primary"
                        :value="option.value"
                        :label="option.label"
                        :key="option.label"
                      ></el-option>
                    </el-select>
                  </div>

                  <div class="col-md-2">
                    <div>
                      <label>สถานี</label>
                    </div>
                    <el-select class="select-primary" v-model="transport.name">
                      <el-option
                        v-for="option in transport.transportOption"
                        class="select-primary"
                        :value="option.value"
                        :label="option.label"
                        :key="option.label"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="col-md-2">
                    <div>
                      <label>ระยะทาง</label>
                    </div>
                    <div class="input-group">
                      <input
                        type="number"
                        class="form-control"
                        placeholder="0"
                        v-model="transport.range"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text bg-grey" id="basic-addon2">ม.</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div>
                      <label>เพิ่ม / ลบ</label>
                    </div>
                    <span>
                      <p-button
                        type="danger"
                        size="sm"
                        icon
                        @click="remove(k)"
                        v-show="k || ( !k && transports.length > 1)"
                      >
                        <i class="nc-icon nc-simple-remove"></i>
                      </p-button>
                      <p-button
                        type="primary"
                        size="sm"
                        icon
                        v-show="k == transports.length-1"
                        @click="add(k)"
                      >
                        <i class="nc-icon nc-simple-add"></i>
                      </p-button>
                    </span>
                  </div>
                </div>
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
                >{{ btnAction }}</p-button>
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
import { Select, Option, Tag } from "element-ui";
import ThailandAutoComplete from "vue-thailand-address-autocomplete";
import axios from "axios";
import { mapGetters } from "vuex";
import { extend } from "vee-validate";
import { required, confirmed } from "vee-validate/dist/rules";

extend("required", required);
extend("confirmed", confirmed);

export default {
  components: {
    Card,
    [Select.name]: Select,
    [Option.name]: Option,
    [Tag.name]: Tag,
    ThailandAutoComplete,
    // TransportBox,
  },

  created: function () {
    console.log("this.getUser : " + JSON.stringify(this.getUser));

    if (this.$route.query.id) {
      let postBody = {
        role: "",
        id: this.$route.query.id,
      };
      console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/project/list`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((resp) => {
        console.log("resp : " + JSON.stringify(resp));
        this.btnAction = "Edit";
        this.project.name = resp.data[0].name;
        this.project.type = resp.data[0].type;
        this.buildings = resp.data[0].buildings;
        this.project.address = resp.data[0].address;
        this.district = resp.data[0].district;
        this.amphoe = resp.data[0].amphoe;
        this.province = resp.data[0].province;
        this.zipcode = resp.data[0].zipcode;
        this.facilitySelects.selects = resp.data[0].facilities;
        this.transports.splice(0, 1);
        let i = 0;
        for (let value of resp.data[0].transports) {
          let transportOption;
          console.log("value : " + JSON.stringify(value));
          if (value.type == "BTS") transportOption = this.transportBTSSelect;
          else if (value.type == "MRT")
            transportOption = this.transportMRTSelect;
          else if (value.type == "AIRLINK")
            transportOption = this.transportAIRLINKSelect;
          this.transports.push({
            type: value.type,
            name: value.name,
            range: value.range,
            transportOption: transportOption,
          });
          i++;
        }
      });
    }
  },

  data() {
    return {
      fullscreenLoading: false,
      btnAction: "Add",
      transports: [
        {
          type: "",
          name: "",
          range: "",
          transportOption: [],
        },
      ],
      buildings: [
        {
          floor: "",
          building: "",
          develop: "",
        },
      ],
      transportTypeSelect: {
        select: "",
        data: [
          { value: "BTS", label: "BTS" },
          { value: "MRT", label: "MRT" },
          { value: "AIRLINK", label: "AIRLINK" },
        ],
      },
      transportBTSSelect: [
        { value: "บางนา", label: "บางนา" },
        { value: "สยาม", label: "สยาม" },
      ],
      transportMRTSelect: [
        { value: "พระราม 9", label: "พระราม 9" },
        { value: "ลำโพง", label: "ลำโพง" },
      ],
      transportAIRLINKSelect: [{ value: "AIRLINK", label: "AIRLINK" }],
      facilitySelects: {
        selects: "",
        data: [
          { value: "ฟิตเนส", label: "ฟิตเนส" },
          { value: "สระว่ายน้ำ (Indoor)", label: "สระว่ายน้ำ (Indoor)" },
          { value: "สระว่ายน้ำ (Outdoor)", label: "สระว่ายน้ำ (Outdoor)" },
          { value: "ห้องสมุด", label: "ห้องสมุด" },
          { value: "ห้องรับรอง", label: "ห้องรับรอง" },
          { value: "ห้องเด็กเล่น", label: "ห้องเด็กเล่น" },
          { value: "Co-Working Space", label: "Co-Working Space" },
          { value: "สวน", label: "สวน" },
          { value: "ซาวน่า", label: "ซาวน่า" },
          { value: "สนามเด็กเล่น", label: "สนามเด็กเล่น" },
          { value: "ห้องอเนกประสงค์", label: "ห้องอเนกประสงค์" },
          { value: "สนามเทนนิส", label: "สนามเทนนิส" },
          { value: "สนามบาส", label: "สนามบาส" },
          { value: "ตู้ซักผ้าหยอดเหรียญ", label: "ตู้ซักผ้าหยอดเหรียญ" },
        ],
      },
      // เก็บข้อมูลที่อยู่ที่ได้จาก input ไว้ใน data return {
      district: "",
      amphoe: "",
      province: "",
      zipcode: "",

      project: {
        type: "1",
        name: "",
        floor: "",
        building: "",
        developer: "",
        address: "",
      },
      comment: "",
    };
  },

  computed: {
    ...mapGetters({ getUser: "getUser" }),
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },

  methods: {
    add(index) {
      this.transports.push({
        type: "",
        name: "",
        range: "",
        transportOption: [],
      });
    },
    remove(index) {
      this.transports.splice(index, 1);
    },
    addBuilding(index) {
      this.buildings.push({
        floor: "",
        building: "",
        develop: "",
      });
    },
    removeBuilding(index) {
      this.buildings.splice(index, 1);
    },
    select(address) {
      this.district = address.district;
      this.amphoe = address.amphoe;
      this.province = address.province;
      this.zipcode = address.zipcode;
    },
    onChangeTransports(event, k) {
      if (event == "BTS")
        this.transports[k].transportOption = this.transportBTSSelect;
      else if (event == "MRT")
        this.transports[k].transportOption = this.transportMRTSelect;
      else if (event == "AIRLINK")
        this.transports[k].transportOption = this.transportAIRLINKSelect;
    },
    submit() {
      if (this.getUser.roles[0] === "ROLE_SALE") {
        this.openBoxComment();
      } else {
        this.createProject();
      }
    },
    validateComment(input) {
      console.log("input : " + input);
      if (input == null || input.length < 1) {
        return "Comment Not Found";
      } else {
        this.comment = input;
        return true;
      }
    },
    openBoxComment() {
      this.$prompt("Please input your comment", "comment", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputValidator: this.validateComment,
      })
        .then(({ value }) => {
          this.createProject();
        })
        .catch(() => {
          return false;
        });
    },
    createProject() {
      this.fullscreenLoading = true;
      let path = "api/project/create";
      let postBody = {
        type: this.project.type,
        name: this.project.name,
        buildings: this.buildings,
        address: this.project.address,
        district: this.district,
        amphoe: this.amphoe,
        province: this.province,
        zipcode: this.zipcode,
        facilities: this.facilitySelects.selects,
        transports: this.transports,
        comment: this.comment,
      };
      if (this.$route.query.id) {
        path = "api/project/edit";
        postBody = {
          id: this.$route.query.id,
          type: this.project.type,
          name: this.project.name,
          buildings: this.buildings,
          address: this.project.address,
          district: this.district,
          amphoe: this.amphoe,
          province: this.province,
          zipcode: this.zipcode,
          facilities: this.facilitySelects.selects,
          transports: this.transports,
          username: this.getUser.username,
          comment: this.comment,
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
          window.location.href = "/admin/project";
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
  // computed: {
  //   secondInputOptions(event){

  //     return this.selected === 'fruit' ? this.fruit : this.vegetables
  //     return
  //   }
  // },
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

.el-tag.el-tag--info {
  color: #ffffff !important;
}
</style>
