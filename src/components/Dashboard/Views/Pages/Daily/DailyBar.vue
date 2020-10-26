<template>
  <card>
    <template slot="header">
      <div class="row">
        <div class="col-md-6">
          <h4 class="card-title" background-color="primary">Task</h4>
          <p class="category" color="primary">Today</p>
        </div>
        <div class="col-md-6">
          <div class="pull-right">
            <p-button
              type="success"
              outline
              round
              @click.native="
                (modals.actionLog = true),
                  (modalBtn = 'Add'),
                  (actionDateTime = new Date()),
                  (comment = ''),
                  (actionTypeSelects.select = ''),
                  (leadSelects.select = ''),
                  (radios.done = '1'),
                  (view = false)
              "
            >
              <i class="nc-icon nc-simple-add"></i> Add Action
            </p-button>
          </div>
        </div>
      </div>
    </template>
    <el-table :data="tasks" header-row-class-name="text-primary">
      <el-table-column label="รายละเอียด" min-width="150">
        <template slot-scope="props">
          <div class="cell">
            <span>
              {{ props.row.comment }}
            </span>
            <div>
              <badge slot="header">{{ props.row.status }} </badge>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        class-name="action-buttons td-actions"
        align="right"
        label="action"
      >
        <template slot-scope="props">
          <p-button
            v-if="props.row.done === 'COMPLETED'"
            type="info"
            round
            icon
            @click="getActionLogDetail(props.row, 'VIEW')"
          >
            <i class="fa fa-list"></i>
          </p-button>
          <p-button
            v-if="props.row.done === 'PENDING'"
            type="success"
            round
            icon
            @click="handleActionCompleted(props.row)"
          >
            <i class="fa fa-check"></i>
          </p-button>
          <p-button
            v-if="props.row.done === 'PENDING'"
            type="info"
            aria-label="edit button"
            round
            icon
            class="btn-icon-mini btn-neutral"
            @click="getActionLogDetail(props.row, 'EDIT')"
          >
            <i class="nc-icon nc-ruler-pencil"></i>
          </p-button>
          <p-button
            v-if="props.row.done === 'PENDING'"
            type="danger"
            aria-label="remove button"
            round
            icon
            class="btn-icon-mini btn-neutral"
            @click="handleDeleteClick(props.$index, props.row)"
          >
            <i class="nc-icon nc-simple-remove"></i>
          </p-button>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <!-- <hr />
          <div class="stats">
            <i class="fa fa-history"></i> Updated 3 minutes ago
          </div>-->
    </template>
    <modal :show.sync="modals.actionLog" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">Action Log</h4>

      <div class="col-md-12">
        <div>
          <label>Type</label>
        </div>
        <el-select
          class="select-primary select-width-100"
          placeholder="select"
          :disabled="view"
          v-model="actionTypeSelects.select"
        >
          <el-option
            v-for="option in actionTypeSelects.data"
            class="select-primary"
            :value="option.value"
            :label="option.label"
            :key="option.label"
            :disabled="view"
          ></el-option>
        </el-select>
      </div>
      <div class="col-md-12">
        <div>
          <label>Lead</label>
        </div>
        <el-select
          class="select-primary select-width-100"
          placeholder="select"
          :disabled="view"
          v-model="leadSelects.select"
        >
          <el-option
            v-for="option in leadSelects.data"
            class="select-primary"
            :value="option.value"
            :label="option.label"
            :key="option.label"
            :disabled="view"
          ></el-option>
        </el-select>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <label>Comment</label>
          <textarea
            rows="5"
            class="form-control border-input"
            placeholder=""
            v-model="comment"
            :readonly="view"
          ></textarea>
        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <label>Date</label>
          <fg-input>
            <el-date-picker
              :readonly="view"
              v-model="actionDateTime"
              format="dd-MM-yyyy HH:mm:ss"
              type="datetime"
              placeholder="Pick a day"
            ></el-date-picker>
          </fg-input>
        </div>
      </div>
      <div class="col-md-12">
        <fieldset>
          <div class="form-group">
            <label class="control-label">สถานะ</label>
            <div class="col-md-12" v-if="view">
              <span class="text-success"> {{ selectActionLog.done }} </span>
            </div>
            <div class="col-md-12" v-if="!view">
              <p-radio label="1" v-model="radios.done" value="1" :inline="true"
                >Pending</p-radio
              >
              <p-radio label="2" v-model="radios.done" value="2" :inline="true"
                >Completed</p-radio
              >
            </div>
          </div>
        </fieldset>
      </div>
      <template slot="footer">
        <p-button v-show="!view" @click="createActionLog">{{
          modalBtn
        }}</p-button>
        <!-- <p-button type="danger" @click.native="modals.actionLog = false"
          >Close</p-button
        > -->
      </template>
    </modal>
  </card>
</template>
<script>
import { Badge, Modal } from "src/components/UIComponents";
import axios from "axios";

export default {
  components: {
    Badge,
    Modal,
  },
  created: function () {
    this.getActionLog();
    this.getLead();
  },

  data() {
    return {
      modals: {
        actionLog: false,
      },
      painPoints: {
        dynamicPainPoints: [],
        inputVisible: true,
        inputValue: "",
      },
      radios: {
        done: "1",
      },
      view: true,
      actionDateTime: new Date(),
      comment: "",
      leadId: "",
      modalBtn: "Add",

      actionTypeSelects: {
        select: "",
        data: [
          { value: "1", label: "Call ได้" },
          { value: "2", label: "Call ไม่ได้" },
          { value: "3", label: "Chat ได้" },
          { value: "4", label: "Chat ไม่ได้" },
          { value: "5", label: "Apporintment" },
          { value: "6", label: "Showing" },
          { value: "7", label: "Negotiation" },
          { value: "8", label: "Closing" },
        ],
      },
      tasks: [],
      leadSelects: {
        select: "",
        data: [{ value: "", label: "" }],
      },
      selectActionLog: {},
    };
  },
  
  methods: {
    handleActionCompleted: function (row) {
      this.fullscreenLoading = true;
      console.log("handleActionCompleted row : " + JSON.stringify(row));
      let postBody = {
        id: row.id,
      };
      // console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post("api/actionLog/updateStatus", postBody, {
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
          this.getActionLog();
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
          // console.log("getLead : " + JSON.stringify(resp.data));
          this.leadSelects.data = resp.data.map((item) => {
            return {
              value: item.id,
              label: item.firstName + " " + item.lastName,
            };
          });
        })
        .catch((err) => {
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
    getActionLog: function () {
      let paramsValue = {
        type: "DAILY",
      };
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.get(`api/actionLog/list`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: paramsValue,
      }).then((resp) => {
        // console.log("getActionLog : " + JSON.stringify(resp.data));
        let actionTypeSelects = this.actionTypeSelects;
        this.tasks = resp.data.map((item) => {
          let status = actionTypeSelects.data.filter(function (actionType) {
            if (actionType.value === item.status) return true;
          });
          let leadId = item.lead !== null ? item.lead.id : "";
          return {
            id: item.id,
            leadId: leadId,
            comment: item.comment,
            actionDateTime: item.actionDateTime,
            status: status[0].label,
            done: item.done,
          };
        });
        // console.log("tasks : " + JSON.stringify(this.tasks));
      });
    },
    getActionLogDetail: function (row, type) {
      console.log("getActionLogDetail row : " + JSON.stringify(row));
      let done = row.done === "COMPLETED" ? "2" : "1";

      let status = this.actionTypeSelects.data.filter(function (actionType) {
        if (actionType.label === row.status) return true;
      });

      this.modals.actionLog = true;
      this.actionTypeSelects.select = status[0].value;
      this.leadSelects.select = row.leadId;
      this.comment = row.comment;
      this.actionDateTime = new Date(row.actionDateTime);
      this.leadId = row.leadId;
      this.radios.done = done;
      this.selectActionLog = row;
      if (type === "EDIT") {
        this.modalBtn = "Edit";
        this.view = false;
      } else {
        this.view = true;
      }
    },
    createActionLog: function () {
      if (this.modalBtn === "Edit") {
        this.editActionLog();
      } else {
        this.fullscreenLoading = true;
        let postBody = {
          status: this.actionTypeSelects.select,
          comment: this.comment,
          actionDateTime: this.actionDateTime,
          leadId: this.leadSelects.select,
          done: this.radios.done,
          // listingId: this.listingId,
        };
        // console.log("createActionLog postBody : " + JSON.stringify(postBody));
        const AXIOS = axios.create({
          baseURL: process.env.VUE_APP_BACKEND_URL,
        });
        AXIOS.post("api/actionLog/create", postBody, {
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
            this.modals.actionLog = false;

            let status = this.actionTypeSelects.data.filter(function (
              actionType
            ) {
              if (actionType.value === resp.data.status) return true;
            });
            this.getActionLog();
            // this.tasks.unshift({
            //   id: resp.data.id,
            //   comment: resp.data.comment,
            //   actionDateTime: resp.data.actionDateTime,
            //   status: status[0].label,
            //   done: resp.data.done,
            // });
            // console.log("resp.data : " + JSON.stringify(resp.data));
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
      }
    },
    editActionLog: function () {
      this.fullscreenLoading = true;
      let postBody = {
        id: this.selectActionLog.id,
        status: this.actionTypeSelects.select,
        comment: this.comment,
        actionDateTime: this.actionDateTime,
        leadId: this.leadSelects.select,
        done: this.radios.done,
        // listingId: this.listingId,
      };
      // console.log("editActionLog postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post("api/actionLog/edit", postBody, {
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
          this.modals.actionLog = false;
          this.getActionLog();
        })
        .catch((err) => {
          this.fullscreenLoading = false;
          this.$notify({
            message: "Error",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "warning",
          });
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
    handleDeleteClick(index, row) {
      this.$confirm(
        "This will permanently delete ActionLog. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.deleteActionLog(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    deleteActionLog(row) {
      let postBody = {
        id: row.id,
      };
      // console.log("postBody : " + JSON.stringify(postBody));
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.post(`api/actionLog/delete`, postBody, {
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
        this.getActionLog();
      });
    },
  },
};
</script>
<style>
</style>
