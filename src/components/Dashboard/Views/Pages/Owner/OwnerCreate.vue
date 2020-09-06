<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submit)">
      <div class="row center">
        <div class="col-md-10">
          <card>
            <h5 slot="header" class="card-title">
              Owner
              <hr />
            </h5>
            <div class="row">
              <div class="col-md-6">
                <fieldset>
                  <div class="form-group">
                    <label class="control-label">Level</label>
                    <div class="col-md-12">
                      <p-radio label="1" v-model="radios.level" value="1" :inline="true">Chill</p-radio>
                      <p-radio label="2" v-model="radios.level" value="2" :inline="true">Alert</p-radio>
                      <p-radio label="3" v-model="radios.level" value="3" :inline="true">Critical</p-radio>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-6">
                <fieldset>
                  <div class="form-group">
                    <label class="control-label">Type</label>
                    <div class="col-md-12">
                      <p-radio label="1" v-model="radiosTypeRole" value="1" :inline="true">sale</p-radio>
                      <p-radio label="2" v-model="radiosTypeRole" value="2" :inline="true">Available</p-radio>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <ValidationProvider
                      name="listingCode"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <fg-input
                        placeholder="TXXX"
                        label="Listing Code"
                        v-model="owner.listingCode"
                        :error="failed ? fieldRequired: null"
                        :hasSuccess="passed"
                      ></fg-input>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <ValidationProvider name="ownerName" rules="required" v-slot="{ passed, failed }">
                  <fg-input
                    placeholder="ชื่อ-นามสกุล"
                    label="Owner Name"
                    v-model="owner.name"
                    :error="failed ? fieldRequired: null"
                    :hasSuccess="passed"
                  ></fg-input>
                </ValidationProvider>
              </div>
              <div class="col-md-4">
                <ValidationProvider name="email" rules="required|email" v-slot="{ passed, failed }">
                  <fg-input
                    placeholder="Email"
                    label="Email"
                    v-model="owner.email"
                    :error="failed ? 'The Email field is required': null"
                    :hasSuccess="passed"
                  ></fg-input>
                </ValidationProvider>
              </div>
              <div class="col-md-4">
                <ValidationProvider name="line" rules="required" v-slot="{ passed, failed }">
                  <fg-input
                    placeholder="Line"
                    label="Line"
                    v-model="owner.line"
                    :error="failed ? fieldRequired: null"
                    :hasSuccess="passed"
                  ></fg-input>
                </ValidationProvider>
              </div>
              <div class="col-md-4">
                <fg-input placeholder="0123456789" label="Phone" v-model="owner.phone"></fg-input>
              </div>
            </div>
          </card>
          <!-- end card -->
        </div>
        <div class="col-md-10">
          <card>
            <h5 slot="header" class="card-title">
              Room
              <hr />
            </h5>
            <div class="row">
              <div class="col-md-6">
                <div>
                  <label>Project</label>
                </div>
                <autocomplete :search="search" @submit="projectSearch"></autocomplete>
              </div>
              <div class="col-md-6">
                <div>
                  <label>ประเภท</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="select"
                  disabled
                  v-model="propertySelects.select"
                  @change="switchProperty($event)"
                >
                  <el-option
                    v-for="option in propertySelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-4">
                    <fg-input :disabled="true" label="ชั้น" v-model="project.floor"></fg-input>
                  </div>
                  <div class="col-md-4">
                    <fg-input :disabled="true" label="ตึก" v-model="project.building"></fg-input>
                  </div>
                  <div class="col-md-4">
                    <fg-input :disabled="true" label="ปีที่สร้างเสร็จ" v-model="project.developer"></fg-input>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <fg-input :disabled="true" label="ที่อยู่" v-model="project.address"></fg-input>
              </div>
              <div class="col-md-12">
                <div>
                  <label>ส่วนกลาง</label>
                </div>
                <el-select
                  multiple
                  class="select-primary select-width-100"
                  placeholder="Select"
                  disabled
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
                <div class="row-">
                  <div>
                    <label>การเดินทาง</label>
                  </div>
                  <div class="col-md-12">
                    <el-table :data="transports">
                      <el-table-column label="ประเภท" property="type"></el-table-column>
                      <el-table-column label="สถานี" property="name"></el-table-column>
                      <el-table-column label="ระยาทาง" property="range"></el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div>
                  <label>Standard</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="standardSelects.select"
                >
                  <el-option
                    v-for="option in standardSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6">
                <div>
                  <label>Grade</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="gradeSelects.select"
                >
                  <el-option
                    v-for="option in gradeSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6">
                <div>
                  <label>ห้องนอน</label>
                </div>
                <el-select class="select-primary" placeholder="Select" v-model="bedSelects.select">
                  <el-option
                    v-for="option in bedSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6">
                <div>
                  <label>ห้องน้ำ</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="toiletSelects.select"
                >
                  <el-option
                    v-for="option in toiletSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6">
                <div>
                  <label>พื้นที่</label>
                </div>
                <div class="row">
                  <div class="col-md-7">
                    <div class="input-group">
                      <input type="number" class="form-control" placeholder="0" v-model="room.area" />
                      <div class="input-group-append">
                        <span class="input-group-text bg-grey" id="basic-addon2">ตร.ม.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <fg-input type="number" label="อยู่ชั้น" v-model="room.floor"></fg-input>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div>
                  <label>ทิศ (ประตูหน้าบ้าน)</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="directionSelects.select"
                >
                  <el-option
                    v-for="option in directionSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6">
                <fg-input type="number" placeholder label="ราคา" v-model="room.price"></fg-input>
              </div>
              <div class="col-md-6">
                <div>
                  <label>ตำแหน่งห้อง</label>
                </div>
                <el-select
                  multiple
                  class="select-primary"
                  collapse-tags
                  v-model="positionSelects.select"
                  placeholder="Select"
                >
                  <el-option
                    v-for="option in positionSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div v-show="activeSell" class="col-md-6">
                <div>
                  <label>รายละเอียดการซื้อ</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="sellDetailSelects.select"
                >
                  <el-option
                    v-for="option in sellDetailSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div v-show="activeRent" class="col-md-6">
                <fg-input
                  placeholder="จำนวนเงินประกันกี่เดือน"
                  label="รายละเอียดการเช่า"
                  v-model="room.rentDetail"
                ></fg-input>
              </div>
              <div v-show="activeCondo" class="col-md-6">
                <div>
                  <label>ลักษณะห้อง</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="featureSelects.select"
                >
                  <el-option
                    v-for="option in featureSelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-6">
                <div>
                  <label>วิว</label>
                </div>
                <el-select
                  multiple
                  class="select-primary"
                  collapse-tags
                  v-model="scenerySelects.select"
                  placeholder="Select"
                >
                  <el-option
                    v-for="option in scenerySelects.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-12">
                <div>
                  <label>คุณสมบัติพิเศษ</label>
                </div>
                <el-tag
                  :key="tag"
                  v-for="(tag,index) in tags.dynamicTags"
                  size="small"
                  type="primary"
                  :closable="true"
                  :close-transition="false"
                  @close="handleClose(index)"
                >{{tag}}</el-tag>

                <input
                  type="text"
                  placeholder="เพิ่ม"
                  class="form-control input-new-tag"
                  v-model="tags.inputValue"
                  ref="saveTagInput"
                  size="mini"
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Description</label>
                  <textarea
                    rows="5"
                    class="form-control border-input"
                    placeholder="Here can be your description"
                    v-model="room.description"
                  ></textarea>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Remark</label>
                  <textarea
                    rows="5"
                    class="form-control border-input"
                    placeholder="Here can be your Remark"
                    v-model="room.remark"
                  ></textarea>
                </div>
              </div>
              <div class="col-md-12">
                <div>
                  <label>รูป</label>
                </div>
                <el-upload
                  class="upload"
                  drag
                  action="string"
                  accept="image/jpeg, image/png"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :before-upload="onBeforeUploadImage"
                  :http-request="UploadImage"
                  list-type="picture"
                  multiple
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    Drop file here or
                    <em>click to upload</em>
                  </div>
                  <!-- <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div> -->
                </el-upload>
              </div>
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-4">
                    <div>
                      <label>Exclusive</label>
                    </div>
                    <p-switch v-model="exclusive"></p-switch>
                  </div>
                  <div class="col-md-6" v-show="exclusiveShow">
                    <div>
                      <label>วันที่สิ้นสุด</label>
                    </div>
                    <fg-input>
                      <el-date-picker
                        v-model="room.exclusiveDate"
                        type="date"
                        placeholder="Pick a day"
                      ></el-date-picker>
                    </fg-input>
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
                  native-type="submit"
                  v-loading.fullscreen.lock="fullscreenLoading"
                >Add</p-button>
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
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";
import PSwitch from "src/components/UIComponents/Switch.vue";
import axios from "axios";
import ElementUI from "element-ui";
import en from "element-ui/lib/locale/lang/en.js";
import { required, email, confirmed } from "vee-validate/dist/rules";
import { extend } from "vee-validate";
import { mapGetters } from "vuex";

extend("email", email);
extend("required", required);

Vue.use(ElementUI, { locale: en });
export default {
  components: {
    Card,
    Autocomplete,
    PSwitch,
  },

  created: function () {
    // `this` points to the vm instance
    let postBody = {
      role: "",
      id: "",
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
      this.projects = resp.data.map((item) => {
        return item.name;
      });
      this.bakProjects = resp.data.map((item) => {
        return { name: item.name, type: item.type };
      });
      console.log("projects : " + JSON.stringify(this.projects));
    });
  },

  data() {
    return {
      fieldRequired: "The field is required",
      activeCondo: false,
      activeHome: false,
      activeRent: false,
      activeSell: true,
      loading: false,
      fullscreenLoading: false,
      projects: [],
      bakProjects: [],
      exclusiveShow: false,
      exclusive: false,

      radios: {
        level: "",
      },
      radiosTypeRole: "0",
      propertySelects: {
        select: "",
        data: [
          { value: "1", label: "คอนโด" },
          { value: "2", label: "บ้าน" },
          { value: "3", label: "ทาวน์เฮาส์" },
        ],
      },
      standardSelects: {
        select: "",
        data: [
          { value: "broken", label: "Broken" },
          { value: "old", label: "Old" },
          { value: "good", label: "Good" },
          { value: "perfect", label: "Perfect" },
        ],
      },
      gradeSelects: {
        select: "",
        data: [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          { value: "c", label: "C" },
        ],
      },
      bedSelects: {
        select: "",
        data: [
          { value: "0", label: "ห้องสตูดิโอ" },
          { value: "1", label: "1 ห้องนอน" },
          { value: "2", label: "2 ห้องนอน" },
          { value: "3", label: "3 ห้องนอน" },
          { value: "4", label: "4 ห้องนอน" },
        ],
      },
      toiletSelects: {
        select: "",
        data: [
          { value: "0", label: "ไม่มี" },
          { value: "1", label: "1 ห้องน้ำ" },
          { value: "2", label: "2 ห้องน้ำ" },
          { value: "3", label: "3 ห้องน้ำ" },
          { value: "4", label: "4 ห้องน้ำ" },
        ],
      },
      directionSelects: {
        select: "",
        data: [
          { value: "1", label: "ตะวันออก" },
          { value: "2", label: "ตะวันออกเฉียงเหนือ" },
          { value: "3", label: "ตะวันออกเฉียงใต้" },
          { value: "4", label: "เหนือ" },
          { value: "5", label: "ใต้" },
          { value: "6", label: "ตะวันตกเฉียงเหนือ" },
          { value: "7", label: "ตะวันตกเฉียงใต้" },
          { value: "8", label: "ตะวันตก" },
        ],
      },
      sellDetailSelects: {
        select: "",
        data: [
          { value: "1", label: "ค่าโอนฯคนละครึ่ง" },
          { value: "2", label: "รวมโอนฯ" },
          { value: "3", label: "ภาษีทั้งหมดคนละครึ่ง" },
        ],
      },
      positionSelects: {
        select: "",
        data: [
          { value: "1", label: "ห้องมุม" },
          { value: "2", label: "ติดลิฟ" },
          { value: "3", label: "ใกล้ห้องขยะ" },
          { value: "4", label: "ใกล้บันไดหนีไฟ" },
        ],
      },
      featureSelects: {
        select: "",
        data: [
          { value: "1", label: "ห้องมีตำหนิ" },
          { value: "2", label: "ห้องเปล่า" },
          { value: "3", label: "ตกแต่งไปแล้วบางส่วน" },
          { value: "4", label: "ตกแต่งครบพร้อม" },
        ],
      },
      facilitySelects: {},
      scenerySelects: {
        select: "",
        data: [
          { value: "1", label: "สระว่ายน้ำ" },
          { value: "2", label: "เมือง" },
          { value: "3", label: "สวน" },
          { value: "4", label: "วัด" },
        ],
      },

      transports: [],
      tags: {
        dynamicTags: ["ครัวปิด", "สระน้ำส่วนตัว"],
        inputVisible: true,
        inputValue: "",
      },
      owner: {
        listingCode: "",
        name: "",
        line: "",
        phone: "",
        name: "",
        email: "",
      },
      room: {
        area: "",
        floor: "",
        rentDetail: "",
        exclusiveDate: "",
        description: "",
        remark: "",
      },
      project: {
        id: "",
        type: "",
        name: "",
        floor: "",
        building: "",
        developer: "",
        address: "",
        price: "",
      },
      fileList: [
        {
          id: "",
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          id: "",
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },

  computed: {
    ...mapGetters({ getUser: "getUser" }),
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },

  watch: {
    radiosTypeRole: function (newRole) {
      console.log(newRole);
      if (newRole == 1) {
        this.activeSell = true;
        this.activeRent = false;
      } else if (newRole == 2) {
        this.activeSell = false;
        this.activeRent = true;
      }
    },
    exclusive: function (event) {
      if (event) this.exclusiveShow = true;
      else this.exclusiveShow = false;
    },
  },
  methods: {
    search(input) {
      if (input.length < 1) {
        return this.projects;
      }
      return this.projects.filter((project) => {
        return project.toLowerCase().startsWith(input.toLowerCase());
      });
    },
    projectSearch(result) {
      let postBody = {
        role: "",
        id: "",
        name: result,
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
        this.project.id = resp.data[0].id;
        this.project.name = resp.data[0].name;
        this.project.type = resp.data[0].type;
        this.project.floor = resp.data[0].floor;
        this.project.building = resp.data[0].building;
        this.project.developer = resp.data[0].developer;
        this.project.address = resp.data[0].address;
        this.district = resp.data[0].district;
        this.amphoe = resp.data[0].amphoe;
        this.province = resp.data[0].province;
        this.zipcode = resp.data[0].zipcode;
        this.facilitySelects.selects = resp.data[0].facilities;
        this.propertySelects.select = resp.data[0].type;
        this.transports = resp.data[0].transports.map((item) => {
          return {
            type: item.type,
            name: item.name,
            range: item.range + " ม.",
          };
        });
        this.switchProperty(resp.data[0].type);
      });
    },
    switchProperty(event) {
      if (event == 1) {
        this.activeCondo = true;
        this.activeHome = false;
      } else {
        this.activeCondo = false;
        this.activeHome = false;
      }
    },
    handleClose(tag) {
      this.tags.dynamicTags.splice(this.tags.dynamicTags.indexOf(tag), 1);
    },
    onBeforeUploadImage(file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 2
      if (!isIMAGE) {
        this.$message.error('Upload file can only be in image format!')
      }
      if (!isLt1M) {
        this.$message.error('Upload file size cannot exceed 1MB!')
      }
      return isIMAGE && isLt1M
    },
    UploadImage(param) {
      const formData = new FormData()
      formData.append('file', param.file)

      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/file/upload`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((resp) => {
        console.log("resp : " + JSON.stringify(resp));
      });
    },
    handlePreview(file) {
      console.log("Preview", file);
    },
    handleRemove(file, fileList) {
      console.log("handleRemove", file, fileList);
    },
    showInput() {
      this.tags.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.tags.inputValue;
      if (inputValue) {
        this.tags.dynamicTags.push(inputValue);
      }
      this.tags.inputVisible = false;
      this.tags.inputValue = "";
    },
    submit() {
      let owner = {
        listingCode: this.owner.listingCode,
        name: this.owner.name,
        line: this.owner.line,
        phone: this.owner.phone,
        email: this.owner.email,
      };
      let room = {
        projectId: this.project.id,
        type: this.radiosTypeRole,
        level: this.radios.level,
        standard: this.standardSelects.select,
        grade: this.gradeSelects.select,
        toilet: this.toiletSelects.select,
        bed: this.bedSelects.select,
        area: this.room.area,
        floor: this.room.floor,
        price: this.room.price,
        direction: this.directionSelects.select,
        position: this.positionSelects.select,
        scenery: this.scenerySelects.select,
        feature: this.featureSelects.select,
        tags: this.tags.dynamicTags,
        description: this.room.description,
        remark: this.room.remark,
        exclusive: this.exclusive,
        exclusiveDate: this.room.exclusiveDate,
      };
      let fileIds = this.fileList.map((item) => {
          return item.id;
        });
      let postBody = {
        ownerRequest: owner,
        roomRequest: room,
        fileIds: fileIds,
        username: this.getUser.username,
      };
      console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/lead/create`, postBody, {
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
          window.location.href = "/#/admin/owner";
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

.el-tag.el-tag--info {
  color: #ffffff !important;
}
</style>
