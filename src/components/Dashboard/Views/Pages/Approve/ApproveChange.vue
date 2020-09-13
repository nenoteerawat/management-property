<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <div class="card-header">
          <div class="row">
            <div class="col-md-6">
              <h5 class="card-title">Approve Change</h5>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
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
              <el-table-column class-name="action-buttons td-actions" align="right" label="Actions">
                <template slot-scope="props">
                  <p-button type="info" size="sm" icon @click="handleInfo(props.$index, props.row)">
                    <i class="nc-icon nc-paper"></i>
                  </p-button>
                  <p-button
                    type="success"
                    size="sm"
                    icon
                    @click="handleEdit(props.$index, props.row)"
                  >
                    <i class="nc-icon nc-check-2"></i>
                  </p-button>
                  <p-button
                    type="danger"
                    size="sm"
                    icon
                    @click="handleDelete(props.$index, props.row)"
                  >
                    <i class="nc-icon nc-simple-remove"></i>
                  </p-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="col-sm-6 pagination-info">
            <p class="category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
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
        <!-- Classic Modal -->
        <modal :show.sync="modals.classic" headerClasses="justify-content-center" modalClasses="modal-lg">
          <h4 slot="header" class="title title-up">Change Detail</h4>
          <template>
            <div class="row">
              <div class="col-md-12">
                <el-table :data="tableDetailData">
                  <el-table-column
                    v-for="column in tableDetailColumns"
                    :key="column.label"
                    :min-width="column.minWidth"
                    :prop="column.prop"
                    :label="column.label"
                    sortable
                  ></el-table-column>
                </el-table>
              </div>
            </div>
          </template>
          <template slot="footer">
            <div class="left-side">
              <p-button type="success" link @click="modals.classic = false">Approve Change</p-button>
            </div>
            <div class="divider"></div>
            <div class="right-side">
              <p-button type="default" link @click="modals.classic = false">Close</p-button>
            </div>
          </template>
        </modal>
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

  data() {
    return {
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [1, 2, 3, 5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: ["ownerName", "roomeCode"],
      tableColumns: [
        {
          prop: "type",
          label: "Type",
        },
        {
          prop: "comment",
          label: "Comment",
          minWidth: 150,
        },
        {
          prop: "user",
          label: "User",
        },
        {
          prop: "updateDate",
          label: "Date Time",
        },
      ],
      tableData: [],
      tableDetailColumns: [
        {
          prop: "key",
          label: "Name",
          minWidth: 100,
        },
        {
          prop: "fromValue",
          label: "From Value",
          minWidth: 100,
        },
        {
          prop: "toValue",
          label: "To Value",
        }
      ],
      tableDetailData: [],
      modals: {
        classic: false,
      }
    };
  },

  methods: {
    handleInfo(index, row) {
      console.log(row);
      this.getDetailChangeList(row.id)
      this.modals.classic = true;
    },
    handleEdit(index, row) {
      this.modals.classic = true;
    },
    handleDelete(index, row) {
      this.modals.classic = true;
    },
    getChangeList: function () {
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      const paramsValue = {
        state: 'WAIT_APPROVE'
      };
      AXIOS.get(`api/change/query`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: paramsValue
      }).then((resp) => {
        this.tableData = resp.data;
        console.log("resp : " + JSON.stringify(resp));
        console.log("tableData : " + JSON.stringify(this.tableData));
      }).catch((err) => {
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
    getDetailChangeList: function (id) {
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      const paramsValue = {
        id: id
      };
      AXIOS.get(`api/change/get`,{
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: paramsValue
      }).then((resp) => {
        this.tableDetailData = resp.data;
        console.log("resp : " + JSON.stringify(resp));
        console.log("tableData : " + JSON.stringify(this.tableData));
      }).catch((err) => {
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
  created: function () {
    this.getChangeList();
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
