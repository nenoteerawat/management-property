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
              <el-slider v-model="price" range :format-tooltip="formatTooltipPrice"></el-slider>
              <div>
                <label>พื้นที่ (ตร.ม.)</label>
              </div>
              <el-slider v-model="area" range :format-tooltip="formatTooltipArea"></el-slider>
            </div>
            <div class="col-md-3">
              <div>
                <label>ห้องนอน</label>
              </div>
              <el-select class="select-primary" placeholder="select" v-model="bedSelects.select">
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
              <el-select class="select-primary" placeholder="select" v-model="toiletSelects.select">
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
              <div class="btn-group" style="margin-top: 13px;">
                <p-button type="info" round outline @click="searchlisting($event)">
                  <i class="fa fa-search"></i>Search
                </p-button>
                <p-button type="warning" round outline @click="resetSearch($event)">
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
              <el-table-column type="index"></el-table-column>
              <!-- <el-table-column min-width="126" label>
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
              </el-table-column>-->
              <el-table-column min-width="200" label>
                <template slot-scope="props">
                  <div class="row">
                    <div class="col-md-12">
                      <h5 class="title" style="margin-bottom: 0;">{{ props.row.projects[0].name}}</h5>
                      <span>
                        <small>Condominium</small>
                        <badge v-show="props.row.room.exclusive" slot="header" type="success">M</badge>
                      </span>
                    </div>
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-12">
                          <span>เจ้าของ : {{ props.row.owner.name}}</span>
                        </div>
                        <div class="col-md-3"></div>
                        <div class="col-md-3">
                          <div class="pull-right">
                            <div class="row">
                              <div class="col-md-4">
                                <i class="fa fa-eye"></i>
                              </div>
                              <div class="col-md-6" style="padding-left: 0;">
                                <span>14</span>
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
                              <div class="col-md-6" style="padding-left: 0;">
                                <span>14</span>
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
                              <div class="col-md-6" style="padding-left: 0;">
                                <span>14</span>
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
              <el-table-column min-width="200" label>
                <template slot-scope="props">
                  <div class="row">
                    <div class="col-md-6" style="margin: 10px 0;">
                      <div class="row">
                        <div class="col-md-4">
                          <i class="fa fa-area-chart"></i>
                        </div>
                        <div class="col-md-6" style="padding-left: 0;">
                          <span>{{ props.row.room.area}} ตร.ม.</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6" style="margin: 10px 0;">
                      <div class="row">
                        <div class="col-md-4">
                          <i class="fa fa-arrows-v"></i>
                        </div>
                        <div class="col-md-6" style="padding-left: 0;">
                          <span>{{ props.row.room.floor}} Fl.</span>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div class="col-md-6" style="margin: 10px 0;">
                      <div class="row">
                        <div class="col-md-4">
                          <i class="fa fa-bed"></i>
                        </div>
                        <div class="col-md-6" style="padding-left: 0;">
                          <span>{{ props.row.room.bed}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6" style="margin: 10px 0;">
                      <div class="row">
                        <div class="col-md-4">
                          <i class="fa fa-bath"></i>
                        </div>
                        <div class="col-md-6" style="padding-left: 0;">
                          <span>{{ props.row.room.toilet}}</span>
                        </div>
                      </div>
                    </div>
                    <!-- <span>Condominium</span> -->
                    <!-- <badge v-show="props.row.listing.exclusive" slot="header" type="primary">M</badge> -->
                  </div>
                </template>
              </el-table-column>
              <el-table-column min-width="100" label>
                <template slot-scope="props">
                  <div class="cell">
                    <h6>S {{ Number(props.row.room.price).toLocaleString() }}</h6>
                  </div>
                  <div class="cell" v-show="props.row.room.type == 2">
                    <h6>R {{ Number(props.row.room.priceRent).toLocaleString() }}</h6>
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
                min-width="50"
              >
                <template slot-scope="props">
                  <!-- <p-button type="info" size="sm" icon @click="handleLike(props.$index, props.row)">
                    <i class="fa fa-user"></i>
                  </p-button>-->
                  <td class="td-actions text-right">
                    <p-button
                      type="info"
                      size="sm"
                      icon
                      @click="handleAction(props.$index, props.row)"
                    >
                      <i class="fa fa-check"></i>
                    </p-button>
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
                      v-if="getUser.roles[0]=='ROLE_ADMIN'"
                    >
                      <i class="fa fa-times"></i>
                    </p-button>
                  </td>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="col-md-6 pagination-info">
            <p class="category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
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
            <el-select class="select-default" v-model="pagination.perPage" placeholder="Per page">
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
      <card>
        <template slot="header">
          <h4 class="card-title" background-color="primary">Task</h4>
          <p class="category" color="primary">Today</p>
        </template>
        <div class="table-full-width table-tasks">
          <table class="table">
            <tbody>
              <DailyBar
                v-for="(task, index) in tasks"
                :key="task.title"
                :task="task"
                :index="index"
                @on-edit="handleTaskEdit"
                @on-delete="handleTaskDelete"
              ></DailyBar>
            </tbody>
          </table>
        </div>
        <template slot="footer">
          <!-- <hr />
          <div class="stats">
            <i class="fa fa-history"></i> Updated 3 minutes ago
          </div>-->
        </template>
      </card>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import PPagination from "src/components/UIComponents/Pagination.vue";
import DailyBar from "../Daily/DailyBar";
import { Card, Badge } from "src/components/UIComponents";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  components: {
    Card,
    Badge,
    DailyBar,
    PPagination,
  },

  created: function () {
    this.getListing();
    this.getProjectList();
    this.getUserList();
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
        { value: "บางนา", label: "บางนา" },
        { value: "สยาม", label: "สยาม" },
      ],
      transportMRTSelect: [
        { value: "พระราม 9", label: "พระราม 9" },
        { value: "ลำโพง", label: "ลำโพง" },
      ],
      transportAIRLINKSelect: [
        { value: "AIRLINK", label: "AIRLINK" },
        { value: "AIRLINK", label: "AIRLINK" },
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
      tasks: [
        {
          done: true,
          img: "/static/img/faces/ayo-ogunseinde-2.jpg",
          title:
            'Sign contract for "What are conference organizers afraid of?"',
        },
        {
          done: false,
          img: "/static/img/faces/erik-lucatero-2.jpg",
          title:
            "Lines From Great Russian Literature? Or E-mails From My Boss?",
        },
        {
          done: true,
          img: "/static/img/faces/kaci-baum-2.jpg",
          title:
            "Using dummy content or fake information in the Web design process can result in products with unrealistic",
        },
        {
          done: false,
          img: "/static/img/faces/joe-gardner-2.jpg",
          title:
            "But I must explain to you how all this mistaken idea of denouncing pleasure",
        },
      ],
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
      console.log(JSON.stringify(this.projectSelects))
      let postBody = {
        roomSearchRequest : {
          projectId : this.projectSelects.select,
          type : this.propertySelects.select,
          bed : this.bedSelects.select,
          toilet: this.toiletSelects.select,
          price: this.price.toString(),
          area: this.area.toString()
        },
        saleUser: this.userSelects.select,
        search: this.search,
        transportType: this.transport.type,
        transportName: this.transport.name
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
    resetSearch: function () {
          this.projectSelects.select = '';
          this.propertySelects.select = '';
          this.bedSelects.select = '';
          this.toiletSelects.select = '';
          this.price = [0,0];
          this.area = [0,0];
          this.userSelects.select = '';
          this.search = '';
          this.transport.type = '';
          this.transport.name = '';
      this.searchlisting();
    },
    getUserList: function(){
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
        console.log("getUser all resp : " + JSON.stringify(resp));
        this.userSelects.data = resp.data.map((item) => {
          return {
            value: item.username,
            label: item.firstName + ' ' + item.lastName,
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
          console.log("resp : " + JSON.stringify(this.tableData));
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
          console.log("resp : " + JSON.stringify(this.tableData));
        })
        .catch((err) => {
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
    handleLike(index, row) {
      alert(`Your clicked on Like button ${index}`);
    },
    handleAction(index, row) {
      
      alert(`Your want to action ${row.listing.name}`);
    },
    handleEdit(index, row) {
      window.location.href = "/admin/listing/create?id=" + row.id;
    },
    handleDelete(index, row) {
      console.log("getUser : " + JSON.stringify(this.getUser));

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
          let postBody = {
            id: row.id,
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    handleTaskEdit(index) {
      alert(`You want to edit task: ${JSON.stringify(this.tasks[index])}`);
    },
    handleTaskDelete(index) {
      alert(`You want to delete task: ${JSON.stringify(this.tasks[index])}`);
    },
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
