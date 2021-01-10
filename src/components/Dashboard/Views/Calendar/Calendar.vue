<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-10 ml-auto mr-auto">
        <div class="card card-calendar">
          <div class="card-body">
            <fullCalendar
              ref="calendar"
              defaultView="dayGridMonth"
              :plugins="calendarPlugins"
              :events="events"
              :selectable="true"
              @dateClick="dateClick"
              @eventClick="eventClick"
              :header="header"
              :buttonIcons="buttonIcons"
              :selectHelper="true"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <modal :show.sync="modals.actionLog" headerClasses="justify-content-center">
        <h4 slot="header" class="title title-up">Action Log</h4>

        <div class="col-md-12">
          <div>
            <label>Type</label>
          </div>
          <el-select
            class="select-primary select-width-100"
            :disabled="viewCompleteDone()"
            placeholder="select"
            v-model="actionTypeSelects.select"
          >
            <el-option
              v-for="option in actionTypeSelects.data"
              class="select-primary"
              :disabled="viewCompleteDone()"
              :value="option.value"
              :label="option.label"
              :key="option.label"
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
              :readonly="viewCompleteDone()"
              v-model="comment"
            ></textarea>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label>Date</label>
            <fg-input>
              <el-date-picker
                :readonly="viewCompleteDone()"
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
              <div class="col-md-12" v-if="viewCompleteDone()">
                <span class="text-success"> COMPLETED </span>
              </div>
              <div class="col-md-12" v-if="!viewCompleteDone()">
                <p-radio
                  label="1"
                  v-model="radios.done"
                  value="1"
                  :inline="true"
                  >Pending</p-radio
                >
                <p-radio
                  label="2"
                  v-model="radios.done"
                  value="2"
                  :inline="true"
                  >Completed</p-radio
                >
              </div>
            </div>
          </fieldset>
        </div>
        <template slot="footer">
          <p-button v-if=isAddEvent @click="createActionLog">Add</p-button>
          <p-button v-show="!viewCompleteDone()" v-if=!isAddEvent @click="editActionLog">Edit</p-button>
        </template>
      </modal>
    </div>
  </div>
</template>
<script>
// import Swal from "sweetalert2";
import axios from "axios";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Modal } from "src/components/UIComponents";
import { Select, Option } from "element-ui";

const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();
export default {
  components: {
    FullCalendar,
    Modal,
    [Select.name]: Select,
    [Option.name]: Option,
  },
    created: function () {
    this.listActionLog();
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      header: {
        center: "dayGridMonth,timeGridWeek,timeGridDay",
        right: "prev,next,today",
      },
      buttonIcons: {
        close: "fa-times",
        prev: "fc-icon-chevron-left",
        next: "fc-icon-chevron-right",
        prevYear: "fc-icon-chevron-left",
        nextYear: "fc-icon-chevron-right",
      },
      events: [
        // {
        //   title: "All Day Event",
        //   start: new Date(y, m, 1),
        //   className: "event-default",
        //   dataPropE: {aaa: 'nenot', bbb:'sdfefefef', sss:'ssssss'},
        //   disableDragging: true,
        // },
        // {
        //   id: 999,
        //   title: "Repeating Event",
        //   start: new Date(y, m, d - 4, 6, 0),
        //   allDay: false,
        //   className: "event-rose",
        // },
        // {
        //   id: 999,
        //   title: "Repeating Event",
        //   start: new Date(y, m, d + 3, 6, 0),
        //   allDay: false,
        //   className: "event-rose",
        // },
        // {
        //   title: "Meeting",
        //   start: new Date(y, m, d - 1, 10, 30),
        //   allDay: false,
        //   className: "event-green",
        // },
        // {
        //   title: "Lunch",
        //   start: new Date(y, m, d + 7, 12, 0),
        //   end: new Date(y, m, d + 7, 14, 0),
        //   allDay: false,
        //   className: "event-red",
        // },
        // {
        //   title: "Md-pro Launch",
        //   start: new Date(y, m, d - 2, 12, 0),
        //   allDay: true,
        //   className: "event-azure",
        // },
        // {
        //   title: "Birthday Party",
        //   start: new Date(y, m, d + 1, 19, 0),
        //   end: new Date(y, m, d + 1, 22, 30),
        //   allDay: false,
        //   className: "event-azure",
        // },
        // {
        //   title: "Click for Creative Tim",
        //   start: new Date(y, m, 21),
        //   end: new Date(y, m, 23),
        //   url: "http://www.creative-tim.com/",
        //   className: "event-orange",
        // },
        // {
        //   title: "Click for Google",
        //   start: new Date(y, m, 21),
        //   end: new Date(y, m, 23),
        //   url: "http://www.creative-tim.com/",
        //   className: "event-orange",
        // },
      ],
      modals: {
        actionLog: false,
      },
      actionTypeSelects: {
        select: "",
        data: [
          { value: "1", label: "Call ได้" },
          { value: "2", label: "Call ไม่ได้" },
          { value: "3", label: "Chat ได้" },
          { value: "4", label: "Chat ไม่ได้" },
          { value: "5", label: "Following" },
          { value: "6", label: "Apporintment" },
          { value: "7", label: "Showing" },
          { value: "8", label: "Negotiation" },
          { value: "9", label: "Closing" },
        ],
      },
      comment: "",
      actionDateTime: "",
      fullscreenLoading: false,
      radios: {
        done: "1",
      },
      isAddEvent: true,
      eventId: '',
    };
  },
  methods: {
    viewCompleteDone: function(){
      // PENDING = 1, COMPLETE = 2
      return this.radios.done==="2";
    },
    dateClick: function (info) {
      console.log(info);
      let calendarApi = this.$refs.calendar.getApi();
      console.log("events : " + this.$refs.calendar.events);
      console.log("info jsEvent : " + info.jsEvent);
      console.log("info resource : " + info.resource)
      this.radios.done = "1";
      this.comment = "";
      this.actionTypeSelects.select = "";
      this.actionDateTime = info.date;
      this.eventId = '';
      this.isAddEvent = true;
      this.modals.actionLog = true;
    },
    eventClick: function (info) {
      console.log("click events id : " + info.event.id);
      this.fullscreenLoading = true;
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.get("api/actionLog/findById/" + info.event.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((resp) => {
          this.fullscreenLoading = false;
          console.log("action logs findby id response : "+JSON.stringify(resp.data));
          this.radios.done = resp.data.done;
          this.comment = resp.data.comment;
          this.actionTypeSelects.select = resp.data.status
          this.actionDateTime = resp.data.actionDateTime;
          this.eventId = info.event.id;
          this.isAddEvent = false;
          this.modals.actionLog = true;
        })
        .catch((err) => {
          this.fullscreenLoading = false;
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
    createActionLog: function () {
      this.fullscreenLoading = true;

      let postBody = {
        status: this.actionTypeSelects.select,
        comment: this.comment,
        actionDateTime: this.actionDateTime,
        leadId: this.$route.query.id,
        done: this.radios.done,
        // listingId: this.listingId,
      };
      console.log("postBody : " + JSON.stringify(postBody));
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
          this.listActionLog();
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
    editActionLog: function () {
      this.fullscreenLoading = true;

      let postBody = {
        id : this.eventId,
        status: this.actionTypeSelects.select,
        comment: this.comment,
        actionDateTime: this.actionDateTime,
        leadId: this.$route.query.id,
        done: this.radios.done,
        // listingId: this.listingId,
      };
      console.log("postBody : " + JSON.stringify(postBody));
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
          this.listActionLog();
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
    listActionLog: function () {
      this.fullscreenLoading = true;
      const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      AXIOS.get("api/actionLog/show/calendar", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((resp) => {
          this.fullscreenLoading = false;
          console.log(resp.data);
          this.events = resp.data
          this.modals.actionLog = false;
        })
        .catch((err) => {
          this.fullscreenLoading = false;
          console.log("err : " + JSON.stringify(err));
          reject(err);
        });
    },
  },
};
</script>
<style>
#fullCalendar {
  min-height: 300px;
}

.el-loading-spinner .path {
  stroke: #66615b !important;
}
</style>
