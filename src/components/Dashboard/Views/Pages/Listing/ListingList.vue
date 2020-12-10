<template>
  <div class="row">
    <div class="col-md-9">
      <card>
        <div class="card-header">
          <div class="row">
            <div class="col-md-6">
              <h5 class="card-title">Listing</h5>
            </div>
            <div class="col-md-6">
              <div class="pull-right">
                <router-link to="listing/create">
                  <p-button type="success" outline round>
                    <i class="nc-icon nc-simple-add"></i> Add
                  </p-button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <div>
                <label>โครงการ</label>
              </div>
              <el-select
                class="select-primary"
                placeholder="select"
                v-model="projectSelects.select"
              >
                <el-option
                  v-for="option in projectSelects.data"
                  class="select-primary"
                  :value="option.value"
                  :label="option.label"
                  :key="option.label"
                ></el-option>
              </el-select>

              <div>
                <label>การเดินทาง</label>
              </div>
              <el-select
                class="select-primary"
                placeholder="Select"
                v-model="transport.type"
                @change="onChangeTransports($event)"
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
            <div class="col-md-3">
              <div>
                <label>ประเภท</label>
              </div>
              <el-select
                class="select-primary"
                placeholder="select"
                v-model="propertySelects.select"
              >
                <el-option
                  v-for="option in propertySelects.data"
                  class="select-primary"
                  :value="option.value"
                  :label="option.label"
                  :key="option.label"
                ></el-option>
              </el-select>
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
            <div class="col-md-3">
              <div>
                <label>ราคา (บาท)</label>
              </div>
              <el-slider
                v-model="price"
                range
                :format-tooltip="formatTooltipPrice"
              ></el-slider>
              <div>
                <label>พื้นที่ (ตร.ม.)</label>
              </div>
              <el-slider
                v-model="area"
                range
                :format-tooltip="formatTooltipArea"
              ></el-slider>
            </div>
            <div class="col-md-3">
              <div>
                <label>ห้องนอน</label>
              </div>
              <el-select
                class="select-primary"
                placeholder="select"
                v-model="bedSelects.select"
              >
                <el-option
                  v-for="option in bedSelects.data"
                  class="select-primary"
                  :value="option.value"
                  :label="option.label"
                  :key="option.label"
                ></el-option>
              </el-select>
              <div>
                <label>ห้องน้ำ</label>
              </div>
              <el-select
                class="select-primary"
                placeholder="select"
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
            <div class="col-md-3" v-if="getUser.roles[0] == 'ROLE_ADMIN'">
              <div>
                <label>sale</label>
              </div>
              <el-select
                class="select-primary"
                placeholder="select"
                v-model="userSelects.select"
              >
                <el-option
                  v-for="option in userSelects.data"
                  class="select-primary"
                  :value="option.value"
                  :label="option.label"
                  :key="option.label"
                ></el-option>
              </el-select>
            </div>
            <div class="col-md-3">
              <fg-input placeholder label="search" v-model="search"></fg-input>
            </div>
            <div class="col-md-3 ml-auto">
              <div class="btn-group" style="margin-top: 13px">
                <p-button
                  type="info"
                  round
                  outline
                  @click="searchlisting($event)"
                >
                  <i class="fa fa-search"></i>Search
                </p-button>
                <p-button
                  type="warning"
                  round
                  outline
                  @click="resetSearch($event)"
                >
                  <i class="fa fa-times"></i>Reset
                </p-button>
              </div>
            </div>

            <!-- <div class="col-md-6">
              <el-select class="select-default" v-model="pagination.perPage" placeholder="Per page">
                <el-option
                  class="select-default"
                  v-for="item in pagination.perPageOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </div>-->
            <!-- <div class="col-md-6">
              <div class="pull-right">
                <fg-input
                  class="input-sm"
                  placeholder="Search"
                  v-model="searchQuery"
                  addon-right-icon="nc-icon nc-zoom-split"
                ></fg-input>
              </div>
            </div>-->
          </div>
          <div class="col-md-12">
            <el-table :data="queriedData" thead-class="hidden_header">
              <el-table-column min-width="5" type="index"></el-table-column>
              <el-table-column min-width="125" label>
                <template slot-scope="props">
                  <div class="img-container">
                    <img
                      v-if="props.row.files.length > 1"
                      style="
                          height: 125px;
                          width: 125px;
                      "
                      :src="props.row.files[0].path"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column min-width="180" label>
                <template slot-scope="props">
                  <div class="row">
                    <div class="col-md-12">
                      <h5 class="title" style="margin-bottom: 0">
                        {{ props.row.projects[0].name }}
                      </h5>
                      <span>
                        <small>Condominium</small>
                        <badge
                          v-show="props.row.room.exclusive"
                          slot="header"
                          type="success"
                          >E
                        </badge>
                        <badge
                          v-if="props.row.status == 'BOOKING'"
                          slot="header"
                          type="warning"
                          >ติดจอง
                        </badge>
                      </span>
                    </div>
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-12">
                          <span>เจ้าของ : {{ props.row.owner.name }}</span>
                        </div>
                        <div class="col-md-3">
                          <div class="pull-right">
                            <div class="row">
                              <div class="col-md-4">
                                <i class="fa fa-eye"></i>
                              </div>
                              <div class="col-md-6" style="padding-left: 0">
                                <!-- <span>14</span> -->
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="pull-right">
                            <div class="row">
                              <div class="col-md-4">
                                <i class="fa fa-paper-plane"></i>
                              </div>
                              <div class="col-md-6" style="padding-left: 0">
                                <!-- <span>14</span> -->
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="pull-right">
                            <div class="row">
                              <div class="col-md-4">
                                <i class="fa fa-key"></i>
                              </div>
                              <div class="col-md-6" style="padding-left: 0">
                                <!-- <span>14</span> -->
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                  <!-- <span>Condominium</span> -->
                  <!-- <badge v-show="props.row.listing.exclusive" slot="header" type="success">M</badge> -->
                </template>
              </el-table-column>
              <el-table-column min-width="180" label>
                <template slot-scope="props">
                  <div class="row">
                    <div class="col-md-6" style="margin: 10px 0">
                      <div class="row">
                        <div class="col-md-4">
                          <i class="fa fa-area-chart"></i>
                        </div>
                        <div class="col-md-6" style="padding-left: 0">
                          <span>{{ props.row.room.area }} ตร.ม.</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6" style="margin: 10px 0">
                      <div class="row">
                        <div class="col-md-4">
                          <i class="fa fa-arrows-v"></i>
                        </div>
                        <div class="col-md-6" style="padding-left: 0">
                          <span>{{ props.row.room.floor }} Fl.</span>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div class="col-md-6" style="margin: 10px 0">
                      <div class="row">
                        <div class="col-md-4">
                          <i class="fa fa-bed"></i>
                        </div>
                        <div class="col-md-6" style="padding-left: 0">
                          <span>{{ props.row.room.bed }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6" style="margin: 10px 0">
                      <div class="row">
                        <div class="col-md-4">
                          <i class="fa fa-bath"></i>
                        </div>
                        <div class="col-md-6" style="padding-left: 0">
                          <span>{{ props.row.room.toilet }}</span>
                        </div>
                      </div>
                    </div>
                    <!-- <span>Condominium</span> -->
                    <!-- <badge v-show="props.row.listing.exclusive" slot="header" type="primary">M</badge> -->
                  </div>
                </template>
              </el-table-column>
              <el-table-column min-width="140" label>
                <template slot-scope="props">
                  <div class="cell">
                    <h6>
                      S {{ Number(props.row.room.price).toLocaleString() }}
                    </h6>
                  </div>
                  <div class="cell" v-show="props.row.room.type == 2">
                    <h6>
                      R {{ Number(props.row.room.priceRent).toLocaleString() }}
                    </h6>
                  </div>
                  <div class="cell">
                    <span>
                      <i class="fa fa-plus" aria-hidden="true"></i>
                      {{ props.row.createdBy }}
                    </span>
                  </div>
                  <div class="cell">
                    <span>
                      <i class="fa fa-clock-o" aria-hidden="true"></i>
                      {{ props.row.createdDateTime }}
                    </span>
                  </div>
                </template>
              </el-table-column>

              <!-- <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                :min-width="column.minWidth"
                :prop="column.prop"
                :label="column.label"
              ></el-table-column>-->
              <el-table-column
                class-name="action-buttons td-actions"
                align="right"
                label
                min-width="70"
              >
                <template slot-scope="props">
                  <!-- <p-button type="info" size="sm" icon @click="handleLike(props.$index, props.row)">
                    <i class="fa fa-user"></i>
                  </p-button>-->
                  <td class="td-actions text-right">
                    <p-button
                      type="success"
                      size="sm"
                      icon
                      @click="handleEdit(props.$index, props.row)"
                    >
                      <i class="fa fa-edit"></i>
                    </p-button>
                    <p-button
                      type="danger"
                      size="sm"
                      icon
                      @click="handleDelete(props.$index, props.row)"
                    >
                      <i class="fa fa-times"></i>
                    </p-button>
                  </td>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="col-md-6 pagination-info">
            <p class="category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
            </p>
          </div>
          <div class="col-md-6">
            <p-pagination
              class="pull-right"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="pagination.total"
            ></p-pagination>
          </div>
          <div class="col-md-6">
            <el-select
              class="select-default"
              v-model="pagination.perPage"
              placeholder="Per page"
            >
              <el-option
                class="select-default"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>
        </div>
      </card>
    </div>
    <div class="col-md-3">
      <DailyBar />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import PPagination from "src/components/UIComponents/Pagination.vue";
import DailyBar from "../Daily/DailyBar";
import { Card, Modal, Badge } from "src/components/UIComponents";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  components: {
    Card,
    Badge,
    DailyBar,
    Modal,
    PPagination,
  },

  created: function () {
    this.getListing();
    this.getProjectList();
    if (this.getUser.roles[0] == "ROLE_ADMIN") {
      this.getUserList();
    }
    this.getLead();
    // this.getActionLog();
  },

  data() {
    return {
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      search: "",
      searchQuery: "",
      price: [0, 0],
      area: [0, 0],
      tableColumns: [],
      tableMatchListing: [],
      modals: {
        classic: false,
      },
      modalsIndex: {},
      modalsRow: {},
      saleUserSelects: {
        select: "",
        data: [],
      },
      leadSelects: {
        select: "",
        data: [],
      },
      saleUserSearchSelects: {
        select: "",
        data: [],
      },
      projectSelects: {
        select: "",
        data: [],
      },
      userSelects: {
        select: "",
        data: [],
      },
      propertySelects: {
        select: "",
        data: [
          { value: "1", label: "คอนโด" },
          { value: "2", label: "บ้าน" },
          { value: "3", label: "ทาวน์เฮาส์" },
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
      transport: {
        type: "",
        name: "",
        range: "",
        transportOption: [],
      },
      transportTypeSelect: {
        simple: "",
        data: [
          { value: "BTS", label: "BTS" },
          { value: "MRT", label: "MRT" },
          { value: "AIRLINK", label: "AIRLINK" },
        ],
      },
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
        { value: "สถานีพญาไท Phaya Thai Station", label: "สถานีพญาไท Phaya Thai Station" },
        { value: "สถานีปราชปรารภ Ratchaprarop Station", label: "สถานีปราชปรารภ Ratchaprarop Station" },
        { value: "สถานีมักกะสัน Makkasan Station", label: "สถานีมักกะสัน Makkasan Station" },
        { value: "สถานีรามคำแหง Ramkhamhaeng Station", label: "สถานีรามคำแหง Ramkhamhaeng Station" },
        { value: "สถานีหัวหมาก Hua Mak Station", label: "สถานีหัวหมาก Hua Mak Station" },
        { value: "สถานีบ้านทับช้าง Ban Thap Chang Station", label: "สถานีบ้านทับช้าง Ban Thap Chang Station" },
        { value: "สถานีลาดกระบัง Lat Krabang Station", label: "สถานีลาดกระบัง Lat Krabang Station" },
        { value: "สถานีสุวรรณภูมิ Suvarnabhumi (Airport) Station", label: "สถานีสุวรรณภูมิ Suvarnabhumi (Airport) Station" },
      ],
      tableColumns: [
        {
          prop: "createdBy",
          label: "",
        },
        {
          prop: "createdDateTime",
          label: "",
        },
      ],
      tableData: [],
      // tasks: [],
      comment: "",
    };
  },

  methods: {
    formatTooltipPrice(val) {
      return val * 10000;
    },
    formatTooltipArea(val) {
      return val * 3;
    },
    onChangeTransports(event) {
      if (event == "BTS")
        this.transport.transportOption = this.transportBTSSelect;
      else if (event == "MRT")
        this.transport.transportOption = this.transportMRTSelect;
      else if (event == "AIRLINK")
        this.transport.transportOption = this.transportAIRLINKSelect;
    },
    searchlisting: function () {
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      console.log(JSON.stringify(this.projectSelects));
      let postBody = {
        roomSearchRequest: {
          projectId: this.projectSelects.select,
          type: this.propertySelects.select,
          bed: this.bedSelects.select,
          toilet: this.toiletSelects.select,
          price: this.price.toString(),
          area: this.area.toString(),
        },
        saleUser: this.userSelects.select,
        search: this.search,
        transportType: this.transport.type,
        transportName: this.transport.name,
      };
      console.log("postBody : " + JSON.stringify(postBody));
      AXIOS.post(`api/listing/list`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((resp) => {
          this.tableData = resp.data;
        })
        .catch((err) => {
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
    getLead: function () {
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.get(`api/lead/selects`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((resp) => {
          for (let value of resp.data) {
            this.leadSelects.data.push({
              value: value.id,
              label: value.firstName + " " + value.lastName,
            });
          }
        })
        .catch((err) => {
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
    resetSearch: function () {
      this.projectSelects.select = "";
      this.propertySelects.select = "";
      this.bedSelects.select = "";
      this.toiletSelects.select = "";
      this.price = [0, 0];
      this.area = [0, 0];
      this.userSelects.select = "";
      this.search = "";
      this.transport.type = "";
      this.transport.name = "";
      this.searchlisting();
    },
    getUserList: function () {
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      let postBody = {
        role: "",
        id: "",
      };
      AXIOS.post(`api/user/list`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((resp) => {
        // console.log("getUser all resp : " + JSON.stringify(resp));
        this.userSelects.data = resp.data.map((item) => {
          return {
            value: item.username,
            label: item.firstName + " " + item.lastName,
          };
        });
      });
    },
    getProjectList: function () {
      let postBody = {
        role: "",
        id: "",
      };
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/project/list`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((resp) => {
          for (let value of resp.data) {
            this.projectSelects.data.push({
              value: value.id,
              label: value.name,
            });
          }
          // console.log("resp : " + JSON.stringify(this.tableData));
        })
        .catch((err) => {
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
    getListing: function () {
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
          this.tableData = resp.data;
          // console.log("getListing : " + JSON.stringify(this.tableData));
        })
        .catch((err) => {
          console.log("getListing err : " + JSON.stringify(err));
          reject(err);
        });
    },
    handleLike(index, row) {
      alert(`Your clicked on Like button ${index}`);
    },
    handleEdit(index, row) {
      this.$router.push("/admin/listing/create?id=" + row.id);
    },
    deleteList(row) {
      let postBody = {
        id: row.id,
        comment: this.comment,
      };
      console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/listing/delete`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: postBody,
      }).then((resp) => {
        this.$message({
          type: "success",
          message: "Delete completed",
        });
        this.getListing();
      });
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
    openBoxComment(row) {
      this.$prompt("Please input your comment", "comment", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputValidator: this.validateComment,
      })
        .then(({ value }) => {
          this.deleteList(row);
        })
        .catch(() => {
          return false;
        });
    },
    handleDelete(index, row) {
      console.log("getUser : " + JSON.stringify(this.getUser));
      if (this.getUser.roles[0] === "ROLE_SALE") {
        this.openBoxComment(row);
      } else {
        this.$confirm(
          "This will permanently delete listing. Continue?",
          "Warning",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        )
          .then(() => {
            this.deleteList(row);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "Delete canceled",
            });
          });
      }
    },
    // handleTaskEdit(index) {
    //   alert(`You want to edit task: ${JSON.stringify(this.tasks[index])}`);
    // },
    // handleTaskDelete(index) {
    //   alert(`You want to delete task: ${JSON.stringify(this.tasks[index])}`);
    // },
  },
  computed: {
    ...mapGetters({ getUser: "getUser" }),
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },

    pagedData() {
      return this.tableData.slice(this.from, this.to);
    },

    queriedData() {
      if (!this.searchQuery) {
        this.pagination.total = this.tableData.length;
        return this.pagedData;
      }
      let result = this.tableData.filter((row) => {
        let isIncluded = false;
        for (let key of this.propsToSearch) {
          let rowValue = row[key].toString();
          if (rowValue.includes && rowValue.includes(this.searchQuery)) {
            isIncluded = true;
          }
        }
        return isIncluded;
      });
      this.pagination.total = result.length;
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      this.pagination.total = this.tableData.length;
      return this.tableData.length;
    },
  },
};
</script>
<style lang="scss">
.el-table .td-actions {
  button.btn {
    margin-right: 2px;
  }

  .title-project {
    font-size: 1.714em;
    line-height: 1.45em;
    font-weight: 400;
  }
}
</style>
