<template>
  <div class="row center">
    <div class="col-md-10">
      <card>
        <h5 slot="header" class="card-title">
          Project
          <hr />
        </h5>
        <div class="row">
          <div class="col-md-6">
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
          <div class="col-md-6">
            <fg-input placeholder label="โครงการ" v-model="project.name"></fg-input>
          </div>
          <div class="col-md-2">
            <fg-input placeholder label="ชั้น" type="number" v-model="project.floor"></fg-input>
          </div>
          <div class="col-md-2">
            <fg-input placeholder label="ตึก" v-model="project.building"></fg-input>
          </div>
          <div class="col-md-2">
            <fg-input placeholder label="ปีที่สร้างเสร็จ" type="number" v-model="project.developer"></fg-input>
          </div>
          <div class="col-md-6">
            <fg-input placeholder label="ที่อยู่" v-model="project.address"></fg-input>
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
            <div>
              <label>การเดินทาง</label>
            </div>
            <div class="row" v-for="(transport,k) in transports" :key="k">
              <div class="col-md-2">
                <el-select class="select-primary" placeholder="Select" v-model="transport.type">
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
                <el-select class="select-primary" placeholder="Select" v-model="transport.name">
                  <el-option
                    v-for="option in transportNameSelect.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-2">
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
        <template slot="footer">
          <hr />
          <div class="stats">
            <p-button type="info" @click="createProject" round>Add</p-button>
          </div>
        </template>
      </card>
      <!-- end card -->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Card } from "src/components/UIComponents";
import "@trevoreyre/autocomplete-vue/dist/style.css";
import { Select, Option, Tag } from "element-ui";
import ThailandAutoComplete from "vue-thailand-address-autocomplete";
import axios from "axios";

export default {
  components: {
    Card,
    [Select.name]: Select,
    [Option.name]: Option,
    [Tag.name]: Tag,
    ThailandAutoComplete,
    // TransportBox,
  },

  data() {
    return {
      transports: [
        {
          type: "",
          name: "",
          range: "",
        },
      ],
      transportTypeSelect: {
        simple: "",
        data: [
          { value: "BTS", label: "BTS" },
          { value: "MRT", label: "MRT" },
          { value: "AIRLINK", label: "AIRLINK" },
        ],
      },
      transportNameSelect: {
        simple: "",
        data: [
          { value: "1", label: "บางนา" },
          { value: "2", label: "สีลม" },
          { value: "3", label: "สยาม" },
        ],
      },
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
        builing: "",
        developer: "",
        address: "",
      },
    };
  },

  methods: {
    add(index) {
      this.transports.push({ type: "", name: "", range: "" });
    },
    remove(index) {
      this.transports.splice(index, 1);
    },
    select(address) {
      this.district = address.district;
      this.amphoe = address.amphoe;
      this.province = address.province;
      this.zipcode = address.zipcode;
    },
    createProject() {
      let token = localStorage.getItem("token");
      console.log("token : " + token);
      let postBody = {
        type: this.project.type,
        name: this.project.name,
        floor: this.project.floor,
        builing: this.project.builing,
        developer: this.project.developer,
        address: this.project.address,
        district: this.district,
        amphoe: this.amphoe,
        province: this.province,
        zipcode: this.zipcode,
        facilities: this.facilitySelects.selects,
        transports: this.transports,
      };
      console.log("postBody : " + JSON.stringify(postBody));

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");

      axios({
        url: "http://localhost:8090/api/project/create",
        data: postBody,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          const user = {};
        })
        .catch((err) => {
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
