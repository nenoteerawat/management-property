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
            <div class="row">
              <div class="col-md-6">
                <fg-input placeholder label="โครงการ" v-model="project.name"></fg-input>
              </div>
            </div>
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
              v-model="facilitySelects.simple"
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
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="transportTypeSelect.simple"
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
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="transportNameSelect.simple"
                >
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
                    v-model="transportDistance"
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
          name: "",
        },
      ],
      transportTypeSelect: {
        simple: "",
        data: [
          { value: "1", label: "BTS" },
          { value: "2", label: "MRT" },
          { value: "3", label: "AIRLINK" },
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
      transportDistance: "",
      facilitySelects: {
        simple: "",
        data: [
          { value: "1", label: "ฟิตเนส" },
          { value: "2", label: "สระว่ายน้ำ (Indoor)" },
          { value: "3", label: "สระว่ายน้ำ (Outdoor)" },
          { value: "4", label: "ห้องสมุด" },
          { value: "5", label: "ห้องรับรอง" },
          { value: "6", label: "ห้องเด็กเล่น" },
          { value: "7", label: "Co-Working Space" },
          { value: "8", label: "สวน" },
          { value: "9", label: "ซาวน่า" },
          { value: "10", label: "สนามเด็กเล่น" },
          { value: "11", label: "ห้องอเนกประสงค์" },
          { value: "12", label: "สนามเทนนิส" },
          { value: "13", label: "สนามบาส" },
          { value: "14", label: "ตู้ซักผ้าหยอดเหรียญ" },
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
      this.transports.push({ name: "" });
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
      let postBody = "";
      console.log("test");
      axios({
        url: "http://localhost:8090/api/project/create",
        data: {
          
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          const user = {
            
          };
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
