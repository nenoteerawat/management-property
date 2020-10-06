<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <div class="card-header">
          <div class="row">
            <div class="col-md-6">
              <h5 class="card-title">อนุมัติการแก้ไขข้อมูล</h5>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
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
            <div class="col-md-6">
              <div class="pull-right">
                <fg-input
                  class="input-sm"
                  placeholder="Search"
                  v-model="searchQuery"
                  addon-right-icon="nc-icon nc-zoom-split"
                ></fg-input>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <el-table :data="queriedData" header-row-class-name="text-primary">
              <el-table-column type="index"></el-table-column>
              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                :min-width="column.minWidth"
                :prop="column.prop"
                :label="column.label"
                sortable
              ></el-table-column>
              <el-table-column
                class-name="action-buttons td-actions"
                align="right"
                label="จัดการ"
              >
                <template slot-scope="props">
                  <p-button
                    type="info"
                    size="sm"
                    icon
                    @click="handleInfo(props.$index, props.row)"
                  >
                    <i class="nc-icon nc-paper"></i>
                  </p-button>
                  <p-button
                    type="success"
                    size="sm"
                    icon
                    @click="handleApprove(props.$index, props.row)"
                  >
                    <i class="nc-icon nc-check-2"></i>
                  </p-button>
                  <p-button
                    type="danger"
                    size="sm"
                    icon
                    @click="handleCancel(props.$index, props.row)"
                  >
                    <i class="nc-icon nc-simple-remove"></i>
                  </p-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="col-sm-6 pagination-info">
            <p class="category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
            </p>
          </div>
          <div class="col-sm-6">
            <p-pagination
              class="pull-right"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="pagination.total"
            ></p-pagination>
          </div>
        </div>
      </card>
    </div>
    <div class="row">
      <div class="col-md-12 text-center">
        <!-- Change log detail modal end -->
        <modal
          :show.sync="modals.classic"
          headerClasses="justify-content-center"
          modalClasses="modal-lg"
        >
          <h4 slot="header" class="title title-up">
            รายละเอียดการเปลี่ยนแปลงข้อมูล
          </h4>
          <template>
            <div class="row">
              <div class="col-md-12">
                <el-table :data="tableDetailData">
                  <el-table-column
                    min-width="20"
                    type="index"
                  ></el-table-column>
                  <el-table-column min-width="120" label="หัวข้อ">
                    <template slot-scope="props">
                      <div class="cell">
                        <h6>{{ props.row.key }}</h6>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="170" label="จากข้อมูล">
                    <template slot-scope="props">
                      <div class="cell">
                        <h6
                          v-if="props.row.fromValue === props.row.toValue"
                          class="text-success"
                        >
                          {{ props.row.fromValue }}
                        </h6>
                        <h6 v-else class="text-danger">
                          {{ props.row.fromValue }}
                        </h6>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="170" label="เป็นข้อมูล">
                    <template slot-scope="props">
                      <div class="cell">
                        <h6
                          v-if="props.row.fromValue === props.row.toValue"
                          class="text-success"
                        >
                          {{ props.row.toValue }}
                        </h6>
                        <h6 v-else class="text-danger">
                          {{ props.row.toValue }}
                        </h6>
                      </div>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column
                    v-for="column in tableDetailColumns"
                    :key="column.label"
                    :min-width="column.minWidth"
                    :prop="column.prop"
                    :label="column.label"
                    sortable
                  ></el-table-column>-->
                </el-table>
              </div>
            </div>
          </template>
          <template slot="footer">
            <div class="left-side">
              <p-button
                type="success"
                link
                @click="handleApprove(modalsIndex, modalsRow)"
                >อนุมัติ</p-button
              >
            </div>
            <div class="divider"></div>
            <div class="right-side">
              <p-button
                type="danger"
                link
                @click="handleCancel(modalsIndex, modalsRow)"
                >ยกเลิก</p-button
              >
            </div>
          </template>
        </modal>
        <!-- Change log detail modal end -->
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Table, TableColumn, Select, Option } from "element-ui";
import PPagination from "src/components/UIComponents/Pagination.vue";
import DailyBar from "../Daily/DailyBar";
import { Card, Modal, Button } from "src/components/UIComponents";
import axios from "axios";

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
export default {
  components: {
    Card,
    Modal,
    [Button.name]: Button,
    DailyBar,
    PPagination,
  },

  created: function () {
    this.getChangeList();
  },

  data() {
    return {
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: ["ownerName", "roomeCode"],
      tableColumns: [
        {
          prop: "type",
          label: "ประเภท",
        },
        {
          prop: "comment",
          label: "หมายเหตุ",
          minWidth: 100,
        },
        {
          prop: "submitBy",
          label: "ผู้ขอแก้ข้อมูล",
        },
        {
          prop: "updateDate",
          label: "เวลาในการแก้ไข",
        },
      ],
      tableData: [],
      tableDetailColumns: [
        {
          prop: "key",
          label: "หัวข้อ",
        },
        {
          prop: "fromValue",
          label: "จากข้อมูล",
          minWidth: 170,
        },
        {
          prop: "toValue",
          label: "เป็นข้อมูล",
          minWidth: 170,
        },
      ],
      tableDetailData: [],
      modals: {
        classic: false,
      },
      modalsIndex: {},
      modalsRow: {},
    };
  },

  methods: {
    handleInfo(index, row) {
      this.modalsIndex = index;
      this.modalsRow = row;
      console.log(row);
      this.getDetailChangeList(row.id);
      this.modals.classic = true;
    },
    handleApprove(index, row) {
      this.$confirm(
        "This will permanently approve " + row.type + ". Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          let headers = { "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"), 
          };
          let body = {
            changeLogId: row.id,
            isApprove: "true",
          };
          const AXIOS = axios.create({
            baseURL: process.env.VUE_APP_BACKEND_URL,
          });
          AXIOS.post(`api/change/approve`, body, { headers })
            .then((resp) => {
              this.getChangeList();
              this.modals.classic = false;
            })
            .catch((err) => {
              console.log("err : " + JSON.stringify(err));
              reject(err);
            });
          this.$message({
            type: "success",
            message: "Approve completed",
          });
        })
        .catch(() => {});
    },
    handleCancel(index, row) {
      this.$confirm(
        "This will permanently cancel " + row.type + ". Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          let headers = { "Content-Type": "application/json" };
          let body = {
            changeLogId: row.id,
            isApprove: "false",
          };
          const AXIOS = axios.create({
            baseURL: process.env.VUE_APP_BACKEND_URL,
          });
          AXIOS
            .post(`api/change/approve`, body, { headers })
            .then((resp) => {
              this.getChangeList();
              this.modals.classic = false;
            })
            .catch((err) => {
              console.log("err : " + JSON.stringify(err));
              reject(err);
            });
          this.$message({
            type: "success",
            message: "Delete completed",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    getChangeList: function () {
      const paramsValue = {
        state: "WAIT_APPROVE",
      };
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.get(`api/change/query`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: paramsValue,
      }).then((resp) => {
        this.tableData = resp.data;
      });
      // Vue.prototype.$http
      //   .get(`api/change/query`, {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     params: paramsValue,
      //   })
      //   .then((resp) => {
      //     this.tableData = resp.data;
      //     console.log("resp : " + JSON.stringify(resp));
      //     console.log("tableData : " + JSON.stringify(this.tableData));
      //   })
      //   .catch((err) => {
      //     console.log("err : " + JSON.stringify(err));
      //     reject(err);
      //   });
    },
    getDetailChangeList: function (id) {
      const paramsValue = {
        id: id,
      };
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.get(`api/change/get`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: paramsValue,
      })
        .then((resp) => {
          console.log("tableDetailData : " + JSON.stringify(resp.data));
          this.tableDetailData = resp.data;
        })
        .catch((err) => {
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
  },

  computed: {
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
}
</style>
