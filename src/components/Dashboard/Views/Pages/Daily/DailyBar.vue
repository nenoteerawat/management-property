<template>
  <tr>
    <!-- <td>
      <p-checkbox v-model="task.done">
      </p-checkbox>
    </td>
    <td class="img-row">
      <div class="img-wrapper">
        <img :src="task.img" class="img-raised" :alt="task.title">
      </div>
    </td> -->
    <td class="text-left">
      {{ task.comment }}
      <badge v-if="task.done === 'COMPLETED'" slot="header" type="success">{{ task.status }} </badge>
      <badge v-else slot="header" type="warning">{{ task.status }} </badge>
    </td>
    <td class="td-actions text-right">
      <!-- <el-tooltip content="Edit" placement="top"> -->
        <p-button
                      v-if="task.done == 'PENDING'"
                      type="info"
                      size="sm"
                      round
                      icon
                      @click="handleActionCompleted(task)"
                    >
                      <i class="fa fa-check"></i>
                    </p-button>
      <p-button
        type="info"
        aria-label="edit button"
        round
        icon
        class="btn-icon-mini btn-neutral"
        @click="handleEditClick"
      >
        <i class="nc-icon nc-ruler-pencil"></i>
      </p-button>
      <!-- </el-tooltip> -->
      <!-- <el-tooltip placement="top" content="Remove"> -->
      <p-button
        type="danger"
        aria-label="remove button"
        round
        icon
        class="btn-icon-mini btn-neutral"
        @click="handleDeleteClick"
      >
        <i class="nc-icon nc-simple-remove"></i>
      </p-button>
      <!-- </el-tooltip> -->
    </td>
  </tr>
</template>
<script>
import { Badge } from "src/components/UIComponents";
import axios from "axios";

export default {
  components: {
    Badge,
  },
  props: {
    task: {
      type: Object,
      default: () => {
        return {
          id: "",
          done: "",
          comment: "",
          date: "",
          status: "",
        };
      },
    },
    index: Number,
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
    getActionLog: function () {
      let paramsValue = {
        type: "daily",
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
        console.log("getActionLog : " + JSON.stringify(resp.data));
        let actionTypeSelects = this.actionTypeSelects;
        this.tasks = resp.data.map((item) => {
          let status = actionTypeSelects.data.filter(function (actionType) {
            if (actionType.value === item.status) return true;
          });
          return {
            id: item.id,
            comment: item.comment,
            actionDateTime: item.actionDateTime,
            status: status[0].label,
            done: item.done,
          };
        });
      });
    },
    handleEditClick() {
      this.$emit("on-edit", this.index);
    },
    handleDeleteClick() {
      this.$emit("on-delete", this.index);
    },
  },
};
</script>
<style>
</style>
