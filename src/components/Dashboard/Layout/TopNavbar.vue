<template>
  <navbar v-model="showNavbar">
    <div class="navbar-wrapper">
      <div class="navbar-minimize">
        <button id="minimizeSidebar" class="btn btn-icon btn-round" @click="minimizeSidebar">
          <i class="nc-icon nc-minimal-right text-center visible-on-sidebar-mini"></i>
          <i class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"></i>
        </button>
      </div>
      <div class="navbar-toggle">
        <navbar-toggle-button @click.native="toggleSidebar">

        </navbar-toggle-button>
      </div>
      <a class="navbar-brand" href="">Home Real Estate Services</a>
    </div>

    <template slot="navbar-menu">
      <!-- <form>
        <div class="input-group no-border">
          <input type="text" value="" class="form-control" placeholder="Search...">
          <div class="input-group-append">
            <div class="input-group-text">
              <i class="nc-icon nc-zoom-split"></i>
            </div>
          </div>
        </div>
      </form> -->
      <ul class="navbar-nav">
        <!-- <li class="nav-item">
          <a class="nav-link btn-magnify" href="#pablo">
            <i class="nc-icon nc-layout-11"></i>
            <p>
              <span class="d-lg-none d-md-block">Stats</span>
            </p>
          </a>
        </li> -->
        <drop-down icon="nc-icon nc-bell-55" tag="li"
                   position="right"
                   direction="none"
                   class="nav-item btn-rotate dropdown">
          <a slot="title"
             slot-scope="{isOpen}"
             class="nav-link dropdown-toggle"
             data-toggle="dropdown"
             aria-haspopup="true"
             :aria-expanded="isOpen">
            <i class="nc-icon nc-bell-55"></i>
            <p>
              <span class="d-lg-none d-md-block">Some Actions</span>
            </p>
          </a>
          <a v-for="data in listApprove" class="dropdown-item" href="/admin/approve" :key="data.message"> {{ data.message }}</a>
          <!-- <a class="dropdown-item" href="#">Another action</a> -->
          <!-- <a class="dropdown-item" href="#">Something else here</a> -->
        </drop-down>
        <!-- <li class="nav-item">
          <a class="nav-link btn-rotate" href="#pablo">
            <i class="nc-icon nc-settings-gear-65"></i>
            <p>
              <span class="d-lg-none d-md-block">Account</span>
            </p>
          </a>
        </li> -->
      </ul>
    </template>
  </navbar>
</template>
<script>
  import { Navbar, NavbarToggleButton } from 'src/components/UIComponents'
import axios from "axios";

  export default {
    components: {
      Navbar,
      NavbarToggleButton
    },

    created: function () {
      this.getChangeApprove();
    },

    data() {
      return {
        activeNotifications: false,
        showNavbar: false,
        listApprove: [],
      }
    },
    methods: {
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown() {
        this.activeNotifications = false
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      minimizeSidebar() {
        this.$sidebar.toggleMinimize()
      },
      toggleNavbar() {
        this.showNavbar = !this.showNavbar;
      },
      getChangeApprove: function () {
        const AXIOS = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
      });
      const paramsValue = {
        state: "WAIT_APPROVE",
      };
      AXIOS.get(`api/change/query`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: paramsValue,
      }).then((resp) => {
        // console.log("TopNavber all resp : " + JSON.stringify(resp));
        for (let key of resp.data) {
          this.listApprove.push({
            message : key.type+" type : "+key.submitType+" , comment : "+ key.comment
          })
        }
      });
      }
    }
  }

</script>
<style>

</style>
