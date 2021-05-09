<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <div class="card-header">
          <div class="row">
            <div class="col-md-6">
              <h5 class="card-title">Project</h5>
            </div>
            <div class="col-md-6">
              <div class="pull-right">
                <router-link to="project/create">
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
              <el-table-column min-width="200" label="โครงการ">
                <template slot-scope="props">
                  <div class="col-md-12">
                    <h4>{{ props.row.name }}</h4>
                  </div>
                  <div class="col-md-12 cell">
                    ตำบล : {{ props.row.amphoe }} อำเภอ :
                    {{ props.row.district }} จังหวัด : {{ props.row.province }}
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column label="floor">
                <template slot-scope="props">
                  <div class="cell">ชั้น {{ props.row.floor}}</div>
                </template>
              </el-table-column>
              <el-table-column label="building">
                <template slot-scope="props">
                  <div class="cell">ตึก {{ props.row.building}}</div>
                </template>
              </el-table-column>
              <el-table-column label="developer">
                <template slot-scope="props">
                  <div class="cell">ปี {{ props.row.developer}}</div>
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
              <el-table-column
                class-name="action-buttons td-actions"
                align="right"
                label="Actions"
              >
                <template slot-scope="props">
                  <!-- <p-button type="info" size="sm" icon @click="handleLike(props.$index, props.row)">
                    <i class="fa fa-user"></i>
                  </p-button>-->
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
    <!-- <div class="col-md-3">
      <DailyBar />
    </div> -->
  </div>
</template>
<script>
import Vue from "vue";
import PPagination from "src/components/UIComponents/Pagination.vue";
import DailyBar from "../Daily/DailyBar";
import { Card } from "src/components/UIComponents";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  components: {
    Card,
    DailyBar,
    PPagination,
  },

  created: function () {
    this.getProject();
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
      propsToSearch: ["name","team","floor","building","develop"],
      tableColumns: [
        // {
        //   prop: "name",
        //   label: "Name",
        //   minWidth: 150,
        // },
        {
          prop: "team",
          label: "Team",
        },
        {
          prop: "floor",
          label: "ชั้น",
        },
        {
          prop: "building",
          label: "ตึก",
        },
        {
          prop: "develop",
          label: "ปีที่สร้างเสร็จ (ปี)",
          minWidth: 100,
        },
      ],
      tableData: [],
      comment: "",
    };
  },

  methods: {
    getProject: function () {
      let postBody = {
        role: "",
        id: "",
        groupBuilding: false,
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
          this.tableData = resp.data;
          console.log("resp : " + JSON.stringify(resp));
          console.log("tableData : " + JSON.stringify(this.tableData));
        })
        .catch((err) => {
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
    handleLike(index, row) {
      alert(`Your clicked on Like button ${index}`);
    },
    handleEdit(index, row) {
      console.log("row : " + row);
      this.$router.push("/admin/project/create?id=" + row.id);
      // alert(`Your want to edit ${row.name}`);
    },
    deleteProject(row) {
      let postBody = {
        id: row.id,
        comment: this.comment,
      };
      console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/project/delete`, postBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((resp) => {
        this.$message({
          type: "success",
          message: "Delete completed",
        });
        this.getProject();
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
          this.deleteProject(row);
        })
        .catch(() => {
          return false;
        });
    },
    handleDelete(index, row) {
      if (this.getUser.roles[0] === "ROLE_SALE") {
        this.openBoxComment(row);
      } else {
        this.$confirm(
          "This will permanently delete project. Continue?",
          "Warning",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        )
          .then(() => {
            this.deleteProject(row);
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
          let rowTemp = row[key] == null ? "" : row[key].toString();
          let rowValue = rowTemp;
          if (rowValue.includes && rowValue.toLowerCase().includes(this.searchQuery.toLowerCase())) {
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

.card label {
  color: black;
}
</style>
