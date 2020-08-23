<template>
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
                <fg-input placeholder="TXXX" label="Listing Code" v-model="owner.listingCode"></fg-input>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <fg-input placeholder="ชื่อ-นามสกุล" label="Owner Name" v-model="owner.name"></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input placeholder="Email" label="Eemail" v-model="owner.email"></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input placeholder="Line" label="Line" v-model="owner.line"></fg-input>
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
            <autocomplete :search="search"></autocomplete>
          </div>
          <div class="col-md-6">
            <div>
              <label>Property</label>
            </div>
            <el-select
              class="select-primary"
              placeholder="select"
              v-model="propertySelects.simple"
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
            <div>
              <label>Standard</label>
            </div>
            <el-select class="select-primary" placeholder="Select" v-model="standardSelects.simple">
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
            <el-select class="select-primary" placeholder="Select" v-model="gradeSelects.simple">
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
            <el-select class="select-primary" placeholder="Select" v-model="bedSelects.simple">
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
            <el-select class="select-primary" placeholder="Select" v-model="toiletSelects.simple">
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
              <div class="col-md-6">
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
                <fg-input placeholder="10" type="number" label="จำนวนชั้น" readonly></fg-input>
              </div>
              <div class="col-md-6">
                <fg-input placeholder="4" type="number" label="อยู่ชั้น"></fg-input>
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
              v-model="directionSelects.simple"
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
              v-model="positionSelects.simple"
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
              v-model="sellDetailSelects.simple"
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
            <el-select class="select-primary" placeholder="Select" v-model="featureSelects.simple">
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
              v-model="scenerySelects.simple"
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
            <el-select
              v-model="transportNew"
              multiple
              filterable
              allow-create
              default-first-option
              class="select-primary select-width-100"
              placeholder="Choose or Add"
            >
              <el-option
                v-for="item in transportSelects.data"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                Drop file here or
                <em>click to upload</em>
              </div>
              <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
          </div>
          <div class="col-md-6">
            <div>
              <label>Exclusive</label>
            </div>
            <p-switch v-model="room.exclusive"></p-switch>
          </div>
        </div>

        <template slot="footer">
          <hr />
          <div class="stats">
            <p-button type="info" round>Add</p-button>
          </div>
        </template>
      </card>
      <!-- end card -->
    </div>
  </div>
</template>
<script>
import { Card } from "src/components/UIComponents";
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";
import { Select, Option, Tag, Upload } from "element-ui";
import PSwitch from "src/components/UIComponents/Switch.vue";

export default {
  components: {
    Card,
    Autocomplete,
    [Select.name]: Select,
    [Option.name]: Option,
    [Tag.name]: Tag,
    [Upload.name]: Upload,
    PSwitch,
  },

  data() {
    return {
      activeCondo: false,
      activeHome: false,
      activeRent: false,
      activeSell: true,
      totalArea: 0,
      loading: false,
      radios: {
        level: "",
      },
      radiosTypeRole: "0",
      projects: [
        "Lumpini Rama9",
        "Lumpini Rama8",
        "Lumpini 33",
        "ssLumpifni ff",
        "Rhythm Asoke",
      ],
      propertySelects: {
        simple: "",
        data: [
          { value: "1", label: "คอนโด" },
          { value: "2", label: "บ้าน" },
          { value: "3", label: "ทาวน์เฮาส์" },
        ],
      },
      standardSelects: {
        simple: "",
        data: [
          { value: "broken", label: "Broken" },
          { value: "old", label: "Old" },
          { value: "good", label: "Good" },
          { value: "perfect", label: "Perfect" },
        ],
      },
      gradeSelects: {
        simple: "",
        data: [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          { value: "c", label: "C" },
        ],
      },
      bedSelects: {
        simple: "",
        data: [
          { value: "0", label: "ห้องสตูดิโอ" },
          { value: "1", label: "1 ห้องนอน" },
          { value: "2", label: "2 ห้องนอน" },
          { value: "3", label: "3 ห้องนอน" },
          { value: "4", label: "4 ห้องนอน" },
        ],
      },
      toiletSelects: {
        simple: "",
        data: [
          { value: "0", label: "ไม่มี" },
          { value: "1", label: "1 ห้องน้ำ" },
          { value: "2", label: "2 ห้องน้ำ" },
          { value: "3", label: "3 ห้องน้ำ" },
          { value: "4", label: "4 ห้องน้ำ" },
        ],
      },
      directionSelects: {
        simple: "",
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
        simple: "",
        data: [
          { value: "1", label: "ค่าโอนฯคนละครึ่ง" },
          { value: "2", label: "รวมโอนฯ" },
          { value: "3", label: "ภาษีทั้งหมดคนละครึ่ง" },
        ],
      },
      positionSelects: {
        simple: "",
        data: [
          { value: "1", label: "ห้องมุม" },
          { value: "2", label: "ติดลิฟ" },
          { value: "3", label: "ใกล้ห้องขยะ" },
          { value: "4", label: "ใกล้บันไดหนีไฟ" },
        ],
      },
      featureSelects: {
        simple: "",
        data: [
          { value: "1", label: "ห้องมีตำหนิ" },
          { value: "2", label: "ห้องเปล่า" },
          { value: "3", label: "ตกแต่งไปแล้วบางส่วน" },
          { value: "4", label: "ตกแต่งครบพร้อม" },
        ],
      },
      scenerySelects: {
        simple: "",
        data: [
          { value: "1", label: "สระว่ายน้ำ" },
          { value: "2", label: "เมือง" },
          { value: "3", label: "สวน" },
          { value: "4", label: "วัด" },
        ],
      },
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
      transportSelects: {
        data: [
          { value: "motorcycle_taxi", label: "วินมอไซ" },
          { value: "shuttle_bus", label: "Shuttle Bus" },
        ],
      },
      transportNew: [],
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
        rentDetail: "",
        exclusive: false,
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
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
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
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
