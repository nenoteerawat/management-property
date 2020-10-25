<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submit)">
      <card>
        <template slot="header">
          <h5 class="card-title">
            Lead
            <hr />
          </h5>
        </template>
        <div class="row">
          <div class="col-md-3">
            <el-upload
              class="picture"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handlePreview"
              :auto-upload="false"
              :show-file-list="false"
              style="text-align: center"
            >
              <img
                v-if="imageUrl"
                style="width: 150px; height: 150px"
                :src="imageUrl"
                class="avatar border-gray"
              />
              <h6 class="description">Choose Picture</h6>
            </el-upload>
          </div>
          <div class="col-md-9">
            <div class="row">
              <div class="col-md-3">
                <fg-input
                  placeholder
                  label="ชื่อ"
                  v-model="lead.firstName"
                ></fg-input>
              </div>
              <div class="col-md-3">
                <fg-input
                  placeholder
                  label="นามสกุล"
                  v-model="lead.lastName"
                ></fg-input>
              </div>
              <div class="col-md-3">
                <fg-input
                  placeholder
                  label="ชื่อเล่น"
                  v-model="lead.nickName"
                ></fg-input>
              </div>
              <div class="col-md-3">
                <fg-input
                  placeholder
                  label="อาชีพ"
                  v-model="lead.job"
                ></fg-input>
              </div>
              <div class="col-md-3">
                <fg-input
                  placeholder
                  label="phone"
                  type="number"
                  v-model="lead.phone"
                ></fg-input>
              </div>
              <div class="col-md-3">
                <fg-input
                  placeholder
                  label="line"
                  v-model="lead.line"
                ></fg-input>
              </div>
              <div class="col-md-3">
                <fg-input
                  placeholder
                  label="e-mail"
                  v-model="lead.email"
                ></fg-input>
              </div>
              <div class="col-md-3">
                <fg-input
                  placeholder
                  label="สัญชาติ"
                  v-model="lead.nationality"
                ></fg-input>
              </div>
              <div class="col-md-6">
                <fg-input
                  placeholder
                  label="เหตุผลที่ตัดสินใจซื้อ / ย้าย (ปัญหาที่พบ)"
                  v-model="lead.reason"
                ></fg-input>
              </div>
              <div class="col-md-6">
                <fg-input
                  placeholder
                  label="ที่อยู่"
                  v-model="lead.address"
                ></fg-input>
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
              <div class="col-md-3">
                <fieldset>
                  <div class="form-group">
                    <label class="control-label">Type</label>
                    <div class="col-md-12">
                      <p-checkbox v-model="checkboxTypeBuy" :inline="true"
                        >Buy</p-checkbox
                      >
                      <p-checkbox v-model="checkboxTypeRent" :inline="true"
                        >Rent</p-checkbox
                      >
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12">
                <h5>LifeStyle (A)</h5>
              </div>
              <div class="col-md-4">
                <div>
                  <label>Project</label>
                </div>
                <model-select
                  :options="listingSelects1"
                  v-model="listingByLead"
                  class="select"
                  placeholder="select item"
                >
                </model-select>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="ประเภท"
                  v-model="listingByLead.propertyType"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="พื้นที่"
                  v-model="listingByLead.area"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="ชั้น"
                  v-model="listingByLead.floor"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="วิว"
                  v-model="listingByLead.direction"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Notes</label>
                  <textarea
                    rows="5"
                    class="form-control border-input"
                    placeholder="Here can be your notes"
                    v-model="listingByLead.notes"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12">
                <h5>Detail (B)</h5>
              </div>
              <div class="col-md-4">
                <div>
                  <label>Project</label>
                </div>
                <model-select
                  :options="listingSelects2"
                  v-model="listingByAdmin"
                  class="select"
                  placeholder="select item"
                >
                </model-select>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="ประเภท"
                  v-model="listingByAdmin.propertyType"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="พื้นที่"
                  v-model="listingByAdmin.area"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="ชั้น"
                  v-model="listingByAdmin.floor"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="วิว"
                  v-model="listingByAdmin.direction"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Notes</label>
                  <textarea
                    rows="5"
                    class="form-control border-input"
                    placeholder="Here can be your notes"
                    v-model="listingByAdmin.notes"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Timeline start -->
        <div class="row">
          <div class="col-md-11 ml-auto mr-auto">
            <div class="Timeline" style="height: 100px">
              <!-- status Lead Start-->
              <div class="event1">
                <svg height="20" width="20">
                  <circle cx="10" cy="11" r="5" fill="#fbc658" />
                </svg>
                <div class="time">Lead</div>
              </div>
              <!-- line -->
              <svg height="5" width="150">
                <line
                  x1="0"
                  y1="0"
                  x2="150"
                  y2="0"
                  style="stroke: #fbc658; stroke-width: 5"
                />
              </svg>
              <!-- status Lead End -->
              <!-- status Action Start-->
              <div class="event1">
                <svg height="20" width="20">
                  <circle cx="10" cy="11" r="5" fill="#004165" />
                </svg>
                <div class="time">Action</div>
              </div>
              <!-- line -->
              <svg height="5" width="150">
                <line
                  x1="0"
                  y1="0"
                  x2="150"
                  y2="0"
                  style="stroke: #004165; stroke-width: 5"
                />
              </svg>
              <!-- status Action End -->
              <!-- status Following Start-->
              <div class="event1">
                <svg height="20" width="20">
                  <circle cx="10" cy="11" r="5" fill="#004165" />
                </svg>
                <div class="time">Following</div>
              </div>
              <!-- line -->
              <svg height="5" width="150">
                <line
                  x1="0"
                  y1="0"
                  x2="150"
                  y2="0"
                  style="stroke: #004165; stroke-width: 5"
                />
              </svg>
              <!-- status Following End -->
              <!-- status Appointment Start-->
              <div class="event1">
                <svg height="20" width="20">
                  <circle cx="10" cy="11" r="5" fill="#004165" />
                </svg>
                <div class="time">Appointment</div>
              </div>
              <!-- line -->
              <svg height="5" width="150">
                <line
                  x1="0"
                  y1="0"
                  x2="150"
                  y2="0"
                  style="stroke: #004165; stroke-width: 5"
                />
              </svg>
              <!-- status Appointment End -->
              <!-- status Showing Start-->
              <div class="event1">
                <svg height="20" width="20">
                  <circle cx="10" cy="11" r="5" fill="#004165" />
                </svg>
                <div class="time">Showing</div>
              </div>
              <!-- line -->
              <svg height="5" width="150">
                <line
                  x1="0"
                  y1="0"
                  x2="150"
                  y2="0"
                  style="stroke: #004165; stroke-width: 5"
                />
              </svg>
              <!-- status Showing End -->
              <!-- status Negotiation Start-->
              <div class="event1">
                <svg height="20" width="20">
                  <circle cx="10" cy="11" r="5" fill="#004165" />
                </svg>
                <div class="time">Negotiation</div>
              </div>
              <!-- line -->
              <svg height="5" width="150">
                <line
                  x1="0"
                  y1="0"
                  x2="150"
                  y2="0"
                  style="stroke: #004165; stroke-width: 5"
                />
              </svg>
              <!-- status Negotiation End -->
              <!-- status Closing Start-->
              <div class="event1">
                <svg height="20" width="20">
                  <circle cx="10" cy="11" r="5" fill="#004165" />
                </svg>
                <div class="time">Closing</div>
              </div>
              <!-- line -->
              <svg height="5" width="150">
                <line
                  x1="0"
                  y1="0"
                  x2="150"
                  y2="0"
                  style="stroke: #004165; stroke-width: 5"
                />
              </svg>
              <!-- status Closing End -->
              <!-- status Done start -->
              <div class="event1">
                <svg height="20" width="20">
                  <circle cx="10" cy="11" r="5" fill="#004165" />
                </svg>
                <div class="time">Done</div>
              </div>
              <!-- status Done end-->
            </div>
          </div>
        </div>
        <!-- Timeline end -->
        <div class="row">
          <div class="col-md-3">
            <div class="row">
              <div class="col-md-12">
                <h5>ระดับ</h5>
              </div>
              <div class="col-md-12">
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
              <div class="col-md-12">
                <fg-input
                  placeholder
                  label="เงิน"
                  type="number"
                  v-model="lead.price"
                ></fg-input>
              </div>
              <div class="col-md-12">
                <fieldset>
                  <div class="form-group">
                    <label class="control-label">type</label>
                    <div class="col-md-12">
                      <p-radio
                        label="1"
                        v-model="radios.typePay"
                        value="1"
                        :inline="true"
                        >Cash</p-radio
                      >
                      <p-radio
                        label="2"
                        v-model="radios.typePay"
                        value="2"
                        :inline="true"
                        >Loan</p-radio
                      >
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-12">
                <fg-input
                  placeholder
                  label="เงื่อนไข"
                  v-model="lead.condition"
                ></fg-input>
              </div>
              <div class="col-md-12">
                <fg-input
                  placeholder
                  label="สัญญา"
                  v-model="lead.contract"
                ></fg-input>
              </div>
              <div class="col-md-12">
                <div>
                  <label>Pain Point</label>
                </div>
                <el-tag
                  :key="tag"
                  v-for="(tag, index) in painPoints.dynamicPainPoints"
                  type="primary"
                  :closable="true"
                  :close-transition="false"
                  @close="handleClose(index)"
                  >{{ tag }}</el-tag
                >

                <!-- <fg-input
                  placeholder
                  label="เพิ่ม pain point"
                  v-model="painPoints.inputValue"
                ></fg-input> -->
                <fg-input
                  type="text"
                  placeholder="เพิ่ม"
                  v-model="painPoints.inputValue"
                  ref="saveTagInput"
                  size="mini"
                  @keyup.enter="handleInputConfirm"
                />
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="row">
              <div class="col-md-12">
                <h5>LifeStyle (A)</h5>
              </div>
              <div class="col-md-4">
                <div>
                  <label>Project</label>
                </div>
                <model-select
                  :options="listingSelects3"
                  v-model="listingLifeStyleBySale"
                  class="select"
                  placeholder="select item"
                >
                </model-select>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="ประเภท"
                  v-model="listingLifeStyleBySale.propertyType"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="พื้นที่"
                  v-model="listingLifeStyleBySale.area"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="ชั้น"
                  v-model="listingLifeStyleBySale.floor"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="วิว"
                  v-model="listingLifeStyleBySale.direction"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Notes</label>
                  <textarea
                    rows="5"
                    class="form-control border-input"
                    placeholder="Here can be your notes"
                    v-model="listingLifeStyleBySale.notes"
                  ></textarea>
                </div>
              </div>
              <div class="col-md-6">
                <div>
                  <label>Pain</label>
                </div>
                <el-tag
                  :key="tag"
                  v-for="(tag, index) in painSales.dynamicPainSales"
                  type="primary"
                  :closable="true"
                  :close-transition="false"
                  @close="handleClosePainSale(index)"
                  >{{ tag }}</el-tag
                >
                <fg-input
                  type="text"
                  placeholder="เพิ่ม"
                  v-model="painSales.inputValue"
                  ref="saveTagInput"
                  size="mini"
                  @keyup.enter="handleInputPainSale"
                />
              </div>
              <div class="col-md-12">
                <h5>Detail (B)</h5>
              </div>
              <div class="col-md-4">
                <div>
                  <label>Project</label>
                </div>
                <model-select
                  :options="listingSelects4"
                  v-model="listingBySale"
                  class="select"
                  placeholder="select item"
                >
                </model-select>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="ประเภท"
                  v-model="listingBySale.propertyType"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="พื้นที่"
                  v-model="listingBySale.area"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="ชั้น"
                  v-model="listingBySale.floor"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <fg-input
                  placeholder
                  disabled
                  label="วิว"
                  v-model="listingBySale.direction"
                ></fg-input>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Notes</label>
                  <textarea
                    rows="5"
                    class="form-control border-input"
                    placeholder="Here can be your notes"
                    v-model="listingBySale.notes"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <h5>Financial</h5>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="Career"
              v-model="lead.career"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="Year of work"
              v-model="lead.yearOfWork"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="Income Type"
              v-model="lead.incomeType"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="Average Income"
              v-model="lead.averageIncome"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="Liabilities"
              v-model="lead.liabilities"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="Billing Amount"
              v-model="lead.billingAmount"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="Pre-Approve"
              v-model="lead.preApprove"
            ></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              placeholder
              label="Status"
              v-model="lead.status"
            ></fg-input>
          </div>
        </div>
        <div class="col-md-6">
          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Difficulty : {{ difficulty }} %</span>
              </div>
              <div class="col-md-6">
                <div class="pull-right">
                  <span>ลุกค้าคุยง่ายแค่ไหน</span>
                </div>
              </div>
            </div>
          </div>
          <el-slider v-model="difficulty"></el-slider>
        </div>
        <div class="col-md-6">
          <div>
            <div class="row">
              <div class="col-md-6">
                <span>Rapport : {{ rapport }} %</span>
              </div>
              <div class="col-md-6">
                <div class="pull-right">
                  <span>ลุกค้าเชื่อใจคุณแค่ไหน</span>
                </div>
              </div>
            </div>
          </div>
          <el-slider v-model="rapport"></el-slider>
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
    </form>
  </ValidationObserver>
</template>
<script>
import Vue from "vue";
import {
  TimeLine,
  TimeLineItem,
  Card,
  Badge,
} from "src/components/UIComponents";
import "@trevoreyre/autocomplete-vue/dist/style.css";
import axios from "axios";
import { mapGetters } from "vuex";
import { extend } from "vee-validate";
import { email, required, confirmed } from "vee-validate/dist/rules";
import { ModelSelect } from "vue-search-select";
import ThailandAutoComplete from "vue-thailand-address-autocomplete";

extend("required", required);
extend("confirmed", confirmed);
extend("email", email);

export default {
  components: {
    Card,
    TimeLine,
    TimeLineItem,
    Badge,
    ModelSelect,
    ThailandAutoComplete,
    // TransportBox,
  },

  created: function () {
    this.getListings();
    if (this.$route.query.id) {
      setTimeout(() => {
        this.getLead();
      }, 500);
    }
  },

  data() {
    return {
      fullscreenLoading: false,
      btnAction: "Add",
      checkboxTypeRent: false,
      checkboxTypeBuy: false,
      imageUrl: "/static/img/default-avatar.png",

      district: "",
      amphoe: "",
      province: "",
      zipcode: "",

      radios: {
        typePay: "1",
      },
      difficulty: 0,
      rapport: 0,
      info: 0,

      painSales: {
        dynamicPainSales: [],
        inputVisible: true,
        inputValue: "",
      },
      painPoints: {
        dynamicPainPoints: [],
        inputVisible: true,
        inputValue: "",
      },
      gradeSelects: {
        select: "",
        data: [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          { value: "c", label: "C" },
        ],
      },
      dataPropertyType: [
        { value: "1", label: "คอนโด" },
        { value: "2", label: "บ้าน" },
        { value: "3", label: "ทาวน์เฮาส์" },
      ],
      dataDirection: [
        { value: "1", label: "ตะวันออก" },
        { value: "2", label: "ตะวันออกเฉียงเหนือ" },
        { value: "3", label: "ตะวันออกเฉียงใต้" },
        { value: "4", label: "เหนือ" },
        { value: "5", label: "ใต้" },
        { value: "6", label: "ตะวันตกเฉียงเหนือ" },
        { value: "7", label: "ตะวันตกเฉียงใต้" },
        { value: "8", label: "ตะวันตก" },
      ],
      listings: [],
      listingSelects1: [],
      listingSelects2: [],
      listingSelects3: [],
      listingSelects4: [],
      listingByLead: {
        value: "",
        text: "",
        propertyType: "",
        area: "",
        floor: "",
        direction: "",
        notes: "",
      },
      listingByAdmin: {
        value: "",
        text: "",
        propertyType: "",
        area: "",
        floor: "",
        direction: "",
        notes: "",
      },
      listingLifeStyleBySale: {
        value: "",
        text: "",
        propertyType: "",
        area: "",
        floor: "",
        direction: "",
        notes: "",
      },
      listingBySale: {
        value: "",
        text: "",
        propertyType: "",
        area: "",
        floor: "",
        direction: "",
        notes: "",
      },
      lead: {
        firstName: "",
        lastName: "",
        nickName: "",
        email: "",
        line: "",
        price: "",
        phone: "",
        address: "",
        reason: "",
        job: "",
        nationality: "",
        career: "",
        yearOfWork: "",
        incomeType: "",
        averageIncome: "",
        liabilities: "",
        billingAmount: "",
        preApprove: "",
        status: "",
        contract: "",
        condition: "",
      },
    };
  },

  watch: {
    listingByLead: function (event) {
      let listing = this.listings.filter((listing) => {
        if (listing.id == event.value) return true;
      });
      // console.log("listing : "+ JSON.stringify(listing))
      this.listingByLead.propertyType = this.dataPropertyType.filter((data) => {
        if (data.value == listing[0].room.propertyType) return true;
      })[0].label;
      this.listingByLead.area = listing[0].room.area + " ตร.ม.";
      this.listingByLead.floor = listing[0].room.floor;
      this.listingByLead.direction = this.dataDirection.filter((data) => {
        if (data.value == listing[0].room.direction) return true;
      })[0].label;
    },
    listingByAdmin: function (event) {
      let listing = this.listings.filter((listing) => {
        if (listing.id == event.value) return true;
      });
      // console.log("listing : "+ JSON.stringify(listing))
      this.listingByAdmin.propertyType = this.dataPropertyType.filter(
        (data) => {
          if (data.value == listing[0].room.propertyType) return true;
        }
      )[0].label;
      this.listingByAdmin.area = listing[0].room.area + " ตร.ม.";
      this.listingByAdmin.floor = listing[0].room.floor;
      this.listingByAdmin.direction = this.dataDirection.filter((data) => {
        if (data.value == listing[0].room.direction) return true;
      })[0].label;

    },
    listingLifeStyleBySale: function (event) {
      let listing = this.listings.filter((listing) => {
        if (listing.id == event.value) return true;
      });
      // console.log("listing : "+ JSON.stringify(listing))
      this.listingLifeStyleBySale.propertyType = this.dataPropertyType.filter(
        (data) => {
          if (data.value == listing[0].room.propertyType) return true;
        }
      )[0].label;
      this.listingLifeStyleBySale.area = listing[0].room.area + " ตร.ม.";
      this.listingLifeStyleBySale.floor = listing[0].room.floor;
      this.listingLifeStyleBySale.direction = this.dataDirection.filter(
        (data) => {
          if (data.value == listing[0].room.direction) return true;
        }
      )[0].label;
    },
    listingBySale: function (event) {
      let listing = this.listings.filter((listing) => {
        if (listing.id == event.value) return true;
      });
      // console.log("listing : "+ JSON.stringify(listing))
      this.listingBySale.propertyType = this.dataPropertyType.filter((data) => {
        if (data.value == listing[0].room.propertyType) return true;
      })[0].label;
      this.listingBySale.area = listing[0].room.area + " ตร.ม.";
      this.listingBySale.floor = listing[0].room.floor;
      this.listingBySale.direction = this.dataDirection.filter((data) => {
        if (data.value == listing[0].room.direction) return true;
      })[0].label;
    },
  },

  methods: {
    select(address) {
      this.district = address.district;
      this.amphoe = address.amphoe;
      this.province = address.province;
      this.zipcode = address.zipcode;
    },
    getListings: function () {
      let postBody = {
        role: "",
        id: "",
      };
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/listing/list`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((resp) => {
          // console.log("getListings resp : " + JSON.stringify(resp.data));
          this.listings = resp.data;
          for (let value of resp.data) {
            this.listingSelects1.push({
              value: value.id,
              text: value.projects[0].name + " - " + value.owner.listingCode,
            });
            this.listingSelects2.push({
              value: value.id,
              text: value.projects[0].name + " - " + value.owner.listingCode,
            });
            this.listingSelects3.push({
              value: value.id,
              text: value.projects[0].name + " - " + value.owner.listingCode,
            });
            this.listingSelects4.push({
              value: value.id,
              text: value.projects[0].name + " - " + value.owner.listingCode,
            });
          }
          // console.log(
          //   "listingSelects resp : " + JSON.stringify(this.listingSelects)
          // );
        })
        .catch((err) => {
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
    getLead: function () {
      let paramsValue = {
        id: this.$route.query.id,
      };
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.get(`api/lead/get`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: paramsValue,
      })
        .then((resp) => {
          // console.log("getLead resp : " + JSON.stringify(resp.data));
          this.lead = resp.data;
          //listingLead
          if (resp.data.listingByLead != null) {
            let selectListing = this.listingSelects1.filter((listing) => {
              if (listing.value == resp.data.listingByLead.id) return listing;
            });
            this.listingByLead.value = selectListing[0].value;
            this.listingByLead.text = selectListing[0].text;
            this.listingByLead.propertyType = this.dataPropertyType.filter(
              (data) => {
                if (data.value == resp.data.listingByLead.room.propertyType)
                  return true;
              }
            )[0].label;
            this.listingByLead.area = resp.data.listingByLead.room.area;
            this.listingByLead.floor = resp.data.listingByLead.room.floor;
            this.listingByLead.direction = this.dataDirection.filter((data) => {
              if (data.value == resp.data.listingByLead.room.direction)
                return true;
            })[0].label;
            this.listingByLead.notes = resp.data.listingByLeadNotes;
          }

          //listingAdmin
          if (resp.data.listingByAdmin != null) {
            let selectListing = this.listingSelects2.filter((listing) => {
              if (listing.value == resp.data.listingByAdmin.id) return listing;
            });
            this.listingByAdmin.value = selectListing[0].value;
            this.listingByAdmin.text = selectListing[0].text;
            this.listingByAdmin.propertyType = this.dataPropertyType.filter(
              (data) => {
                if (data.value == resp.data.listingByAdmin.room.propertyType)
                  return true;
              }
            )[0].label;
            this.listingByAdmin.area = resp.data.listingByAdmin.room.area;
            this.listingByAdmin.floor = resp.data.listingByAdmin.room.floor;
            this.listingByAdmin.direction = this.dataDirection.filter(
              (data) => {
                if (data.value == resp.data.listingByAdmin.room.direction)
                  return true;
              }
            )[0].label;
            this.listingByAdmin.notes = resp.data.listingByAdminNotes;
          }

          //listingSale
          if (resp.data.listingBySale != null) {
            let selectListing = this.listingSelects3.filter((listing) => {
              if (listing.value == resp.data.listingBySale.id) return listing;
            });
            this.listingBySale.value = selectListing[0].value;
            this.listingBySale.text = selectListing[0].text;
            this.listingBySale.propertyType = this.dataPropertyType.filter(
              (data) => {
                if (data.value == resp.data.listingBySale.room.propertyType)
                  return true;
              }
            )[0].label;
            this.listingBySale.area = resp.data.listingBySale.room.area;
            this.listingBySale.floor = resp.data.listingBySale.room.floor;
            this.listingBySale.direction = this.dataDirection.filter((data) => {
              if (data.value == resp.data.listingBySale.room.direction)
                return true;
            })[0].label;
            this.listingBySale.notes = resp.data.listingBySaleNotes;
          }

          //listingLifeStyleBySale
          if (resp.data.listingLifeStyleBySale != null) {
            let selectListing = this.listingSelects4.filter((listing) => {
              if (listing.value == resp.data.listingLifeStyleBySale.id)
                return listing;
            });
            this.listingLifeStyleBySale.value = selectListing[0].value;
            this.listingLifeStyleBySale.text = selectListing[0].text;
            this.listingLifeStyleBySale.propertyType = this.dataPropertyType.filter(
              (data) => {
                if (
                  data.value ==
                  resp.data.listingLifeStyleBySale.room.propertyType
                )
                  return true;
              }
            )[0].label;
            this.listingLifeStyleBySale.area =
              resp.data.listingLifeStyleBySale.room.area;
            this.listingLifeStyleBySale.floor =
              resp.data.listingLifeStyleBySale.room.floor;
            this.listingLifeStyleBySale.direction = this.dataDirection.filter(
              (data) => {
                if (
                  data.value == resp.data.listingLifeStyleBySale.room.direction
                )
                  return true;
              }
            )[0].label;
            this.listingLifeStyleBySale.notes =
              resp.data.listingLifeStyleBySaleNotes;
          }

          this.gradeSelects.select = resp.data.grade;
          this.painPoints.dynamicPainPoints = resp.data.painPoints;
          this.painSales.dynamicPainSales = resp.data.painSales;
          this.checkboxTypeRent = resp.data.typeRent;
          this.checkboxTypeBuy = resp.data.typeBuy;
          this.difficulty = resp.data.difficulty;
          this.rapport = resp.data.rapport;
          this.info = resp.data.info;
          this.radios.typePay = resp.data.typePay;
          this.btnAction = "Edit";
        })
        .catch((err) => {
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
    handleInputConfirm() {
      let inputValue = this.painPoints.inputValue;
      if (inputValue) {
        this.painPoints.dynamicPainPoints.push(inputValue);
      }
      this.painPoints.inputVisible = false;
      this.painPoints.inputValue = "";
    },
    handleClose(tag) {
      this.painPoints.dynamicPainPoints.splice(
        this.painPoints.dynamicPainPoints.indexOf(tag),
        1
      );
    },
    handleInputPainSale() {
      let inputValue = this.painSales.inputValue;
      if (inputValue) {
        this.painSales.dynamicPainSales.push(inputValue);
      }
      this.painSales.inputVisible = false;
      this.painSales.inputValue = "";
    },
    handleClosePainSale(tag) {
      this.painSales.dynamicPainSales.splice(
        this.painSales.dynamicPainSales.indexOf(tag),
        1
      );
    },
    handlePreview(file) {
      this.imageUrl.imageUrl = URL.createObjectURL(file.raw);
    },
    submit() {
      this.createLead();
    },
    createLead() {
      this.fullscreenLoading = true;
      let path = "api/lead/create";
      let postBody = {
        listingByLead: this.listingByLead,
        listingByAdmin: this.listingByAdmin,
        listingBySale: this.listingBySale,
        listingLifeStyleBySale: this.listingLifeStyleBySale,
        painPoints: this.painPoints.dynamicPainPoints,
        painSales: this.painPoints.dynamicPainSales,
        grade: this.gradeSelects.select,
        price: this.lead.price,
        typeBuy: this.checkboxTypeBuy,
        typeRent: this.checkboxTypeRent,
        firstName: this.lead.firstName,
        lastName: this.lead.lastName,
        nickName: this.lead.nickName,
        email: this.lead.email,
        line: this.lead.line,
        phone: this.lead.phone,
        address: this.lead.address,
        reason: this.lead.reason,
        job: this.lead.job,
        nationality: this.lead.nationality,
        career: this.lead.career,
        yearOfWork: this.lead.yearOfWork,
        incomeType: this.lead.incomeType,
        averageIncome: this.lead.averageIncome,
        liabilities: this.lead.liabilities,
        billingAmount: this.lead.billingAmount,
        preApprove: this.lead.preApprove,
        status: this.lead.status,
        condition: this.lead.condition,
        contract: this.lead.contract,
        difficulty: this.difficulty,
        rapport: this.rapport,
        typePay: this.radios.typePay,
      };
      if (this.$route.query.id) {
        path = "api/lead/edit";
        postBody = {
          id: this.$route.query.id,
          listingByLead: this.listingByLead,
          listingByAdmin: this.listingByAdmin,
          listingBySale: this.listingBySale,
          listingLifeStyleBySale: this.listingLifeStyleBySale,
          painPoints: this.painPoints.dynamicPainPoints,
          painSales: this.painPoints.dynamicPainSales,
          grade: this.gradeSelects.select,
          price: this.lead.price,
          typeBuy: this.checkboxTypeBuy,
          typeRent: this.checkboxTypeRent,
          firstName: this.lead.firstName,
          lastName: this.lead.lastName,
          nickName: this.lead.nickName,
          email: this.lead.email,
          line: this.lead.line,
          phone: this.lead.phone,
          address: this.lead.address,
          reason: this.lead.reason,
          job: this.lead.job,
          nationality: this.lead.nationality,
          career: this.lead.career,
          yearOfWork: this.lead.yearOfWork,
          incomeType: this.lead.incomeType,
          averageIncome: this.lead.averageIncome,
          liabilities: this.lead.liabilities,
          billingAmount: this.lead.billingAmount,
          preApprove: this.lead.preApprove,
          status: this.lead.status,
          difficulty: this.difficulty,
          rapport: this.rapport,
          condition: this.lead.condition,
          contract: this.lead.contract,
          typePay: this.radios.typePay,
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
          this.$router.push("/admin/lead");
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
<style src="src/assets/css/timeline.css" scoped/>
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
