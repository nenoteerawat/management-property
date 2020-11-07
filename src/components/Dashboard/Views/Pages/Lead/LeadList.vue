<template>
  <div class="row">
    <div class="col-md-9">
      <card>
        <div class="card-header">
          <div class="row">
            <div class="col-md-6">
              <h5 class="card-title">Lead</h5>
            </div>
            <div class="col-md-6">
              <div class="pull-right">
                <router-link to="lead/create">
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
              <!-- <el-table-column min-width="60">
                <template slot-scope="props">
                  <div class="img-container">
                    <img :src="props.row.image" />
                  </div>
                </template>
              </el-table-column>-->
              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                :min-width="column.minWidth"
                :prop="column.prop"
                :label="column.label"
                sortable
              ></el-table-column>
              <el-table-column min-width="100" label="Type">
                <template slot-scope="props">
                  <div class="cell" v-show="props.row.typeBuy">
                    <span> Buy </span>
                  </div>
                  <div class="cell" v-show="props.row.typeRent">
                    <span> Rent </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label>
                <template slot-scope="props">
                  <div class="cell">
                    <span>
                      <i class="fa fa-plus" aria-hidden="true"></i>
                      {{ props.row.createdBy.username }}
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
              <el-table-column
                class-name="action-buttons td-actions"
                align="right"
                label="Actions"
              >
                <template slot-scope="props">
                  <p-button
                    type="info"
                    size="sm"
                    icon
                    @click="handleInfo(props.$index, props.row)"
                  >
                    <i class="fa fa-user"></i>
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
                  >
                    <i class="fa fa-times"></i>
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
    <div class="col-md-3">
      <DailyBar />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import PPagination from "src/components/UIComponents/Pagination.vue";
import DailyBar from "../Daily/DailyBar";
import { Card } from "src/components/UIComponents";
import axios from "axios";
import en from "element-ui/lib/locale/lang/en.js";
import { mapGetters } from "vuex";

Vue.use({ locale: en });
export default {
  components: {
    Card,
    DailyBar,
    PPagination,
  },

  created: function () {
    this.getLead();
  },

  data() {
    return {
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: ["username", "firstName"],
      tableColumns: [
        // {
        //   prop: "name",
        //   label: "Name",
        //   minWidth: 150,
        // },
        {
          prop: "firstName",
          label: "ชื่อ",
        },
        {
          prop: "lastName",
          label: "นามสกุล",
        },
        {
          prop: "status",
          label: "Status",
        },
        {
          prop: "grade",
          label: "grade",
        },
        {
          prop: "painPoints",
          label: "painPoints",
        },
      ],
      tableData: [],
      comment: "",
    };
  },

  methods: {
    getLead: function () {
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.get(`api/lead/list`, {
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
    handleInfo(index, row) {
      // console.log("row : "+row);
      window.location.href = "/admin/lead/view?id=" + row.id;
      // alert(`Your want to edit ${row.name}`);
    },
    handleEdit(index, row) {
      // console.log("row : "+row);
      window.location.href = "/admin/lead/create?id=" + row.id;
      // alert(`Your want to edit ${row.name}`);
    },
    deleteList(row) {
      let postBody = {
        id: row.id,
        comment: this.comment,
      };
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/lead/delete`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((resp) => {
        this.$message({
          type: "success",
          message: "Delete completed",
        });
        this.getLead();
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
      if (this.getUser.roles[0] === "ROLE_SALE") {
        this.openBoxComment(row);
      } else {
        this.$confirm("This will permanently delete user. Continue?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            this.deleteList(row)
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "Delete canceled",
            });
          });
      }
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
