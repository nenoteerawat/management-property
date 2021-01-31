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
                      <p-radio
                        label="1"
                        v-model="project.type"
                        value="1"
                        :inline="true"
                        >คอนโด</p-radio
                      >
                      <p-radio
                        label="2"
                        v-model="project.type"
                        value="2"
                        :inline="true"
                        >บ้าน</p-radio
                      >
                      <p-radio
                        label="3"
                        v-model="project.type"
                        value="3"
                        :inline="true"
                        >ที่ดิน</p-radio
                      >
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-4">
                <ValidationProvider
                  name="name"
                  rules="required"
                  v-slot="{ passed, failed }"
                >
                  <fg-input
                    placeholder
                    label="โครงการ"
                    v-model="project.name"
                    :error="failed ? 'The field is required' : null"
                    :hasSuccess="passed"
                  ></fg-input>
                </ValidationProvider>
              </div>
              <div class="col-md-5">
                <ValidationProvider
                  name="address"
                  rules="required"
                  v-slot="{ passed, failed }"
                >
                  <fg-input
                    placeholder
                    label="ที่อยู่"
                    v-model="project.address"
                    :error="failed ? 'The field is required' : null"
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
                <GmapMap
                  :center="{ lat: 13.727739463595237, lng: 100.57668640850876 }"
                  :zoom="15"
                  map-type-id="terrain"
                  style="width: 700px; height: 300px"
                >
                  <GmapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :title="m.title"
                    :clickable="true"
                    :draggable="true"
                    @dragend="updateCoordinates"
                    @click="center = m.position"
                  />
                </GmapMap>
              </div>
              <div class="col-md-4">
                <div>
                  <label>Zone</label>
                </div>
                <model-select
                  :options="zoneSelect"
                  v-model="project.zone"
                  class="select"
                  placeholder="select zone"
                >
                </model-select>
              </div>
              <!-- <div class="col-md-4">
                <div>
                  <label>Zone</label>
                </div>
                <el-select
                  class="select-primary"
                  placeholder="Select"
                  v-model="zoneSelect.selects"
                >
                  <el-option
                    v-for="option in zoneSelect.data"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div> -->
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
                <div class="row" v-for="(building, k) in buildings" :key="k">
                  <div class="col-md-2">
                    <fg-input
                      placeholder
                      label="ชั้น"
                      type="number"
                      v-model="building.floor"
                    ></fg-input>
                  </div>
                  <div class="col-md-2">
                    <fg-input
                      placeholder
                      label="ตึก"
                      v-model="building.building"
                    ></fg-input>
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
                        v-show="k || (!k && buildings.length > 1)"
                      >
                        <i class="nc-icon nc-simple-remove"></i>
                      </p-button>
                      <p-button
                        type="primary"
                        size="sm"
                        icon
                        v-show="k == buildings.length - 1"
                        @click="addBuilding(k)"
                      >
                        <i class="nc-icon nc-simple-add"></i>
                      </p-button>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row" v-for="(transport, k) in transports" :key="k">
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
                        <span class="input-group-text bg-grey" id="basic-addon2"
                          >ม.</span
                        >
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
                        v-show="k || (!k && transports.length > 1)"
                      >
                        <i class="nc-icon nc-simple-remove"></i>
                      </p-button>
                      <p-button
                        type="primary"
                        size="sm"
                        icon
                        v-show="k == transports.length - 1"
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
import { Select, Option, Tag } from "element-ui";
import ThailandAutoComplete from "vue-thailand-address-autocomplete";
import axios from "axios";
import { mapGetters } from "vuex";
import { extend } from "vee-validate";
import { required, confirmed } from "vee-validate/dist/rules";
import { ModelSelect } from "vue-search-select";

extend("required", required);
extend("confirmed", confirmed);

export default {
  components: {
    Card,
    [Select.name]: Select,
    [Option.name]: Option,
    [Tag.name]: Tag,
    ThailandAutoComplete,
    ModelSelect,
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
        this.project.zone = resp.data[0].zone;
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

  props: {
    latitude: Number,
    longitude: Number,
    title: String,
  },

  data() {
    return {
      markers: [
        // {
        //   position: { lat: 13.727739463595237, lng: 100.57668640850876 },
        //   title: "HOME"
        // },
      ],
      infoWindow: {
        position: { lat: 0, lng: 0 },
        open: false,
        template: "",
      },
      newAddress: {},
      place: null,
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
      zoneSelect: [
        { text: "Silom", value: "Silom" },
        { text: "Sathorn", value: "Sathorn" },
        { text: "Charoenkrung", value: "Charoenkrung" },
        { text: "Rama3", value: "Rama3" },
        { text: "Sam Yan", value: "Sam Yan" },
        { text: "Charoen Nakorn", value: "Charoen Nakorn" },
        { text: "Wong Wian Yai", value: "Wong Wian Yai" },
        { text: "Tha Phra", value: "Tha Phra" },
        { text: "Bang Wa", value: "Bang Wa" },
        { text: "Bang Kae", value: "Bang Kae" },
        { text: "Rat Burana", value: "Rat Burana" },
        { text: "Ratchada", value: "Ratchada" },
        { text: "Asoke", value: "Asoke" },
        { text: "Phetchaburi", value: "Phetchaburi" },
        { text: "Rama9", value: "Rama9" },
        { text: "Ramkamhang", value: "Ramkamhang" },
        { text: "Thailand Cultural Centre", value: "Thailand Cultural Centre" },
        { text: "Huai khawng", value: "Huai khawng" },
        { text: "Suthisan", value: "Suthisan" },
        { text: "Ladphrao ตอนต้น", value: "Ladphrao ตอนต้น" },
        { text: "Ladphrao ตอนปลาย", value: "Ladphrao ตอนปลาย" },
        { text: "Ratchayothin", value: "Ratchayothin" },
        { text: "Kaset", value: "Kaset" },
        { text: "Bangkhen", value: "Bangkhen" },
        { text: "Vibhavadi", value: "Vibhavadi" },
        { text: "Ram Inthra", value: "Ram Inthra" },
        { text: "Liab duan Ram Inthra", value: "Liab duan Ram Inthra" },
        { text: "Nana", value: "Nana" },
        { text: "South Sukhumvit", value: "South Sukhumvit" },
        { text: "Rama4", value: "Rama4" },
        { text: "Pattanakan", value: "Pattanakan" },
        { text: "Srinagarindra", value: "Srinagarindra" },
        { text: "Bang Na", value: "Bang Na" },
        { text: "Lat Krabang", value: "Lat Krabang" },
        { text: "Theparak", value: "Theparak" },
        { text: "BTS Erawan", value: "BTS Erawan" },
        { text: "BTS Pu Chao", value: "BTS Pu Chao" },
        { text: "BTS Bearing", value: "BTS Bearing" },
        { text: "BTS Bang Na", value: "BTS Bang Na" },
        { text: "BTS Udom Suk", value: "BTS Udom Suk" },
        { text: "BTS Punnawithi", value: "BTS Punnawithi" },
        { text: "BTS Bang Chak", value: "BTS Bang Chak" },
        { text: "BTS ON Nut", value: "BTS ON Nut" },
        { text: "BTS Phra Khanong", value: "BTS Phra Khanong" },
        { text: "BTS Ekamai", value: "BTS Ekamai" },
        { text: "BTS Thong Lo", value: "BTS Thong Lo" },
        { text: "BTS Phrom Phong", value: "BTS Phrom Phong" },
        { text: "North Sukhumvit", value: "North Sukhumvit" },
        { text: "BTS Siam", value: "BTS Siam" },
        { text: "BTS Ratchathewi", value: "BTS Ratchathewi" },
        { text: "BTS Phaya Thai", value: "BTS Phaya Thai" },
        { text: "BTS Victory Monument", value: "BTS Victory Monument" },
        { text: "BTS Sanam Pao", value: "BTS Sanam Pao" },
        { text: "BTS Ari ", value: "BTS Ari " },
        { text: "BTS Saphan Khwai", value: "BTS Saphan Khwai" },
        { text: "BTS Mo Chit", value: "BTS Mo Chit" },
        { text: "Phahon Yothin", value: "Phahon Yothin" },
        { text: "Chatuchak Park", value: "Chatuchak Park" },
        { text: "MRT Bang Sue", value: "MRT Bang Sue" },
        { text: "MRT Tao Poon", value: "MRT Tao Poon" },
        { text: "MRT Bang Pho", value: "MRT Bang Pho" },
        { text: "MRT Bang O", value: "MRT Bang O" },
        { text: "MRT Bang Phlat", value: "MRT Bang Phlat" },
        { text: "MRT Charan", value: "MRT Charan" },
        { text: "MRT Bang Khun Non", value: "MRT Bang Khun Non" },
        { text: "MRT Sirindhorn", value: "MRT Sirindhorn" },
        { text: "MRT Bang Yi Khan", value: "MRT Bang Yi Khan" },
      ],
      // zoneSelect: {
      //   selects: "",
      //   data: [
      //     { value: "พระราม 9", label: "พระราม 9" },
      //     { value: "อโศก", label: "อโศก" },
      //     { value: "สีลม", label: "สีลม" },
      //   ],
      // },
      transportBTSSelect: [
        { value: "[N17] วัดพระศรีมหาธาตุ", label: "[N17] วัดพระศรีมหาธาตุ" },
        { value: "[N16] กรมทหารราบที่", label: "[N16] กรมทหารราบที่" },
        { value: "[N15] บางบัว", label: "[N15] บางบัว" },
        { value: "[N14] กรมป่าไม้", label: "[N14] กรมป่าไม้" },
        {
          value: "[N13] มหาวิทยาลัยเกษตรศาสตร์",
          label: "[N13] มหาวิทยาลัยเกษตรศาสตร์",
        },
        { value: "[N12] เสนานิคม", label: "[N12] เสนานิคม" },
        { value: "[N11] รัชโยธิน", label: "[N11] รัชโยธิน" },
        { value: "[N10] พหลโยธิน", label: "[N10] พหลโยธิน" },
        { value: "[N9] ห้าแยกลาดพร้าว", label: "[N9] ห้าแยกลาดพร้าว" },
        { value: "[N8] หมอชิต", label: "[N8] หมอชิต" },
        { value: "[N7] สะพานควาย", label: "[N7] สะพานควาย" },
        { value: "[N5] อารีย์", label: "[N5] อารีย์" },
        { value: "[N4] สนามเป้า", label: "[N4] สนามเป้า" },
        {
          value: "[N3] อนุสาวรีย์ชัยสมรภูมิ",
          label: "[N3] อนุสาวรีย์ชัยสมรภูมิ",
        },
        { value: "[N2] พญาไท", label: "[N2] พญาไท" },
        { value: "[N1] ราชเทวี", label: "[N1] ราชเทวี" },
        { value: "[CEN] สยาม", label: "[CEN] สยาม" },
        { value: "[E1] ชิดลม", label: "[E1] ชิดลม" },
        { value: "[E2] เพลินจิต", label: "[E2] เพลินจิต" },
        { value: "[E3] นานา", label: "[E3] นานา" },
        { value: "[E4] อโศก", label: "[E4] อโศก" },
        { value: "[E5] พร้อมพงษ์", label: "[E5] พร้อมพงษ์" },
        { value: "[E6] ทองหล่อ", label: "[E6] ทองหล่อ" },
        { value: "[E7] เอกมัย", label: "[E7] เอกมัย" },
        { value: "[E8] พระโขนง", label: "[E8] พระโขนง" },
        { value: "[E9] อ่อนนุช", label: "[E9] อ่อนนุช" },
        { value: "[E10] บางจาก", label: "[E10] บางจาก" },
        { value: "[E11] ปุณณวิถี", label: "[E11] ปุณณวิถี" },
        { value: "[E12] อุดมสุข", label: "[E12] อุดมสุข" },
        { value: "[E13] บางนา", label: "[E13] บางนา" },
        { value: "[E14] แบริ่ง", label: "[E14] แบริ่ง" },
        { value: "[E15] สำโรง", label: "[E15] สำโรง" },
        { value: "[E16] ปู่เจ้า", label: "[E16] ปู่เจ้า" },
        { value: "[E17] ช้างเอราวัณ", label: "[E17] ช้างเอราวัณ" },
        { value: "[E19] ปากน้ำ", label: "[E19] ปากน้ำ" },
        { value: "[E20] ศรีนครินทร์", label: "[E20] ศรีนครินทร์" },
        { value: "[E21] แพรกษา", label: "[E21] แพรกษา" },
        { value: "[E22] สายลวด", label: "[E22] สายลวด" },
        { value: "[E23] เคหะฯ", label: "[E23] เคหะฯ" },
        { value: "[W1] สนามกีฬาแห่งชาติ", label: "[W1] สนามกีฬาแห่งชาติ" },
        { value: "[S1] ราชดำริ", label: "[S1] ราชดำริ" },
        { value: "[S2] ศาลาแดง", label: "[S2] ศาลาแดง" },
        { value: "[S3] ช่องนนทรี", label: "[S3] ช่องนนทรี" },
        { value: "[S5] สุรศักดิ์", label: "[S5] สุรศักดิ์" },
        { value: "[S6] สะพานตากสิน", label: "[S6] สะพานตากสิน" },
        { value: "[S7] กรุงธนบุรี", label: "[S7] กรุงธนบุรี" },
        { value: "[S8] วงเวียนใหญ่", label: "[S8] วงเวียนใหญ่" },
        { value: "[S9] โพธิ์นิมิตร", label: "[S9] โพธิ์นิมิตร" },
        { value: "[S10] ตลาดพลู", label: "[S10] ตลาดพลู" },
        { value: "[S11] วุฒากาศ", label: "[S11] วุฒากาศ" },
        { value: "[S12] บางหว้า", label: "[S12] บางหว้า" },
      ],
      transportMRTSelect: [
        { value: "ท่าพระ (BL01)", label: "ท่าพระ (BL01)" },
        { value: "จรัญฯ 13 (BL02)", label: "จรัญฯ 13 (BL02)" },
        { value: "ไฟฉาย (BL03)", label: "ไฟฉาย (BL03)" },
        { value: "บางขุนนนท์ (BL04)", label: "บางขุนนนท์ (BL04)" },
        { value: "บางยี่ขัน (BL05)", label: "บางยี่ขัน (BL05)" },
        { value: "สิรินธร (BL06)", label: "สิรินธร (BL06)" },
        { value: "บางพลัด (BL07)", label: "บางพลัด (BL07)" },
        { value: "บางอ้อ (BL08)", label: "บางอ้อ (BL08)" },
        { value: "บางโพ (BL09)", label: "บางโพ (BL09)" },
        { value: "เตาปูน (BL10)", label: "เตาปูน (BL10)" },
        { value: "บางซื่อ (BL11)", label: "บางซื่อ (BL11)" },
        { value: "กำแพงเพชร (BL12)", label: "กำแพงเพชร (BL12)" },
        { value: "สวนจตุจักร (BL13)", label: "สวนจตุจักร (BL13)" },
        { value: "พหลโยธิน (BL14)", label: "พหลโยธิน (BL14)" },
        { value: "ลาดพร้าว (BL15)", label: "ลาดพร้าว (BL15)" },
        { value: "รัชดาภิเษก (BL16)", label: "รัชดาภิเษก (BL16)" },
        { value: "สุทธิสาร (BL17)", label: "สุทธิสาร (BL17)" },
        { value: "ห้วยขวาง (BL18)", label: "ห้วยขวาง (BL18)" },
        {
          value: "ศูนย์วัฒนธรรมแห่งประเทศไทย (BL19)",
          label: "ศูนย์วัฒนธรรมแห่งประเทศไทย (BL19)",
        },
        { value: "พระราม 9 (BL20)", label: "พระราม 9 (BL20)" },
        { value: "เพชรบุรี (BL21)", label: "เพชรบุรี (BL21)" },
        { value: "สุขุมวิท (BL22)", label: "สุขุมวิท (BL22)" },
        {
          value: "ศูนย์การประชุมแห่งชาติสิริกิติ์ (BL23) ",
          label: "ศูนย์การประชุมแห่งชาติสิริกิติ์ (BL23)",
        },
        { value: "คลองเตย (BL24)", label: "คลองเตย (BL24)" },
        { value: "ลุมพินี (BL25)", label: "ลุมพินี (BL25)" },
        { value: "สีลม (BL26)", label: "สีลม (BL26)" },
        { value: "สามย่าน (BL27)", label: "สามย่าน (BL27)" },
        { value: "หัวลำโพง (BL28)", label: "หัวลำโพง (BL28)" },
        { value: "วัดมังกร (BL29)", label: "วัดมังกร (BL29)" },
        { value: "สามยอด (BL30)", label: "สามยอด (BL30)" },
        { value: "สนามไชย (BL31)", label: "สนามไชย (BL31)" },
        { value: "อิสรภาพ (BL32)", label: "อิสรภาพ (BL32)" },
        { value: "บางไผ่ (BL33)", label: "บางไผ่ (BL33)" },
        { value: "บางหว้า (BL34)", label: "บางหว้า (BL34)" },
        { value: "เพชรเกษม 48 (BL35)", label: "เพชรเกษม 48 (BL35)" },
        { value: "ภาษีเจริญ (BL36)", label: "ภาษีเจริญ (BL36)" },
        { value: "บางแค (BL37)", label: "บางแค (BL37)" },
        { value: "หลักสอง (BL38)", label: "หลักสอง (BL38)" },
        { value: "คลองบางไผ่ (PP01)", label: "คลองบางไผ่ (PP01)" },
        { value: "ตลาดบางใหญ่ (PP02)", label: "ตลาดบางใหญ่ (PP02)" },
        { value: "สามแยกบางใหญ่ (PP03)", label: "สามแยกบางใหญ่ (PP03)" },
        { value: "บางพลู (PP04)", label: "บางพลู (PP04)" },
        { value: "บางรักใหญ่ (PP05)", label: "บางรักใหญ่ (PP05)" },
        { value: "บางรักน้อยท่าอิฐ (PP06)", label: "บางรักน้อยท่าอิฐ (PP06)" },
        { value: "ไทรม้า (PP07)", label: "ไทรม้า (PP07)" },
        {
          value: "สะพานพระนั่งเกล้า (PP08)",
          label: "สะพานพระนั่งเกล้า (PP08)",
        },
        { value: "แยกนนทบุรี 1 (PP09)", label: "แยกนนทบุรี 1 (PP09)" },
        { value: "บางกระสอ (PP10)", label: "บางกระสอ (PP10)" },
        {
          value: "ศูนย์ราชการนนทบุรี (PP11)",
          label: "ศูนย์ราชการนนทบุรี (PP11)",
        },
        { value: "กระทรวงสาธารณสุข (PP12)", label: "กระทรวงสาธารณสุข (PP12)" },
        { value: "แยกติวานนท์ (PP13)", label: "แยกติวานนท์ (PP13)" },
        { value: "วงศ์สว่าง (PP14)", label: "วงศ์สว่าง (PP14)" },
        { value: "บางซ่อน (PP15)", label: "บางซ่อน (PP15)" },
        { value: "เตาปูน (PP16)", label: "เตาปูน (PP16)" },
      ],
      transportAIRLINKSelect: [
        {
          value: "สถานีพญาไท Phaya Thai Station",
          label: "สถานีพญาไท Phaya Thai Station",
        },
        {
          value: "สถานีปราชปรารภ Ratchaprarop Station",
          label: "สถานีปราชปรารภ Ratchaprarop Station",
        },
        {
          value: "สถานีมักกะสัน Makkasan Station",
          label: "สถานีมักกะสัน Makkasan Station",
        },
        {
          value: "สถานีรามคำแหง Ramkhamhaeng Station",
          label: "สถานีรามคำแหง Ramkhamhaeng Station",
        },
        {
          value: "สถานีหัวหมาก Hua Mak Station",
          label: "สถานีหัวหมาก Hua Mak Station",
        },
        {
          value: "สถานีบ้านทับช้าง Ban Thap Chang Station",
          label: "สถานีบ้านทับช้าง Ban Thap Chang Station",
        },
        {
          value: "สถานีลาดกระบัง Lat Krabang Station",
          label: "สถานีลาดกระบัง Lat Krabang Station",
        },
        {
          value: "สถานีสุวรรณภูมิ Suvarnabhumi (Airport) Station",
          label: "สถานีสุวรรณภูมิ Suvarnabhumi (Airport) Station",
        },
      ],
      facilitySelects: {
        selects: "",
        data: [
          // { value: "ฟิตเนส", label: "ฟิตเนส" },
          // { value: "สระว่ายน้ำ (Indoor)", label: "สระว่ายน้ำ (Indoor)" },
          // { value: "สระว่ายน้ำ (Outdoor)", label: "สระว่ายน้ำ (Outdoor)" },
          // { value: "ห้องสมุด", label: "ห้องสมุด" },
          // { value: "ห้องรับรอง", label: "ห้องรับรอง" },
          // { value: "ห้องเด็กเล่น", label: "ห้องเด็กเล่น" },
          // { value: "Co-Working Space", label: "Co-Working Space" },
          // { value: "สวน", label: "สวน" },
          // { value: "ซาวน่า", label: "ซาวน่า" },
          // { value: "สนามเด็กเล่น", label: "สนามเด็กเล่น" },
          // { value: "ห้องอเนกประสงค์", label: "ห้องอเนกประสงค์" },
          // { value: "สนามเทนนิส", label: "สนามเทนนิส" },
          // { value: "สนามบาส", label: "สนามบาส" },
          // { value: "ตู้ซักผ้าหยอดเหรียญ", label: "ตู้ซักผ้าหยอดเหรียญ" },
          // { value : "24 hours security", label : "24 hours security"},
          { value: "Badminton hall", label: "Badminton hall" },
          { value: "Basement car park", label: "Basement car park" },
          { value: "Basketball court", label: "Basketball court" },
          { value: "BBQ pits", label: "BBQ pits" },
          { value: "Billiards room", label: "Billiards room" },
          { value: "Clubhouse", label: "Clubhouse" },
          { value: "Covered car park", label: "Covered car park" },
          { value: "Driving range", label: "Driving range" },
          { value: "Fitness corner", label: "Fitness corner" },
          { value: "Function room", label: "Function room" },
          { value: "Game room", label: "Game room" },
          { value: "Gymnasium room", label: "Gymnasium room" },
          { value: "Jacuzzi KAR Karaoke", label: "Jacuzzi KAR Karaoke" },
          { value: "Launderette", label: "Launderette" },
          { value: "Library", label: "Library" },
          { value: "Lounge", label: "Lounge" },
          { value: "Mini golf range", label: "Mini golf range" },
          { value: "Mini mart", label: "Mini mart" },
          { value: "Multi purpose hall", label: "Multi purpose hall" },
          { value: "Open car park", label: "Open car park" },
          { value: "Playground", label: "Playground" },
          { value: "Putting green", label: "Putting green" },
          { value: "Reflexology Path", label: "Reflexology Path" },
          { value: "Sauna", label: "Sauna" },
          { value: "Spa pool", label: "Spa pool" },
          { value: "Squash court", label: "Squash court" },
          { value: "Steam bath", label: "Steam bath" },
          { value: "Swimming pool", label: "Swimming pool" },
          { value: "Tennis courts", label: "Tennis courts" },
          { value: "Wading pool", label: "Wading pool" },
          { value: "Pool deck", label: "Pool deck" },
          { value: "Pavilion", label: "Pavilion" },
          { value: "Sky lounge", label: "Sky lounge" },
          { value: "Club", label: "Club" },
          { value: "CCTV", label: "CCTV" },
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
        zone: "",
      },
      comment: "",
    };
  },

  computed: {
    ...mapGetters({ getUser: "getUser" }),
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    ...mapGetters(["getDealers", "getCenterPosition", "getZoomLevel"]),
    loadedDealers() {
      return this.getDealers;
    },
  },

  methods: {
    openInfoWindowTemplate(index) {
      const { lat, lng, name, street, zip, city } = this.loadedDealers[index];
      this.infoWindow.position = { lat: lat, lng: lng };
      this.infoWindow.template = `<b>${name}</b><br>${street}<br>${zip} ${city}<br>`;
      this.infoWindow.open = true;
    },
    updateCoordinates(newAddress) {
      console.log(newAddress);
      console.log(newAddress.latLng);
      // this.place = {
      //   lat: newAddress.geometry.location.latLng.lat(),
      //   lng: newAddress.geometry.location.latLng.lng(),
      // };
    },
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
        zone: this.project.zone,
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
          zone: this.project.zone,
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
          this.$router.push("/admin/project");
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
