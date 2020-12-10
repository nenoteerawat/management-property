<template>
  <div class="sidebar" :data-color="backgroundColor" :data-active-color="activeColor">
    <div class="logo">
      <a
        class="simple-text logo-mini"
        aria-label="sidebar mini logo"
        href="/admin/overview"
      >
        <div class="logo-img">
          <img :src="logo" alt />
        </div>
      </a>
      <a
        class="simple-text logo-normal"
        href="/admin/overview"
      >{{ title }}</a>
    </div>
    <div class="sidebar-wrapper" ref="sidebarScrollArea">
      <slot />
      <ul class="nav">
        <slot name="links">
          <sidebar-item
            v-for="(link, index) in checkAccessRole"
            :key="link.name + index"
            :link="link"
          >
            <sidebar-item
              v-for="(subLink, index) in link.children"
              :key="subLink.name + index"
              :link="subLink"
            ></sidebar-item>
          </sidebar-item>
        </slot>
      </ul>
    </div>
  </div>
</template>

<script>
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getUser: "getUser"
    }),
    checkAccessRole() {
      return this.sidebarLinks.filter((link) =>
        link.roles.filter(role => this.getUser.roles.includes(role)).length > 0
      );
    },
  },
  props: {
    title: {
      type: String,
      default: "Home Real Estate",
      description: "Sidebar title",
    },
    backgroundColor: {
      type: String,
      default: "black",
      validator: (value) => {
        let acceptedValues = ["white", "brown", "black"];
        return acceptedValues.indexOf(value) !== -1;
      },
      description: "Sidebar background color (white|brown|black)",
    },
    activeColor: {
      type: String,
      default: "success",
      validator: (value) => {
        let acceptedValues = [
          "primary",
          "info",
          "success",
          "warning",
          "danger",
        ];
        return acceptedValues.indexOf(value) !== -1;
      },
      description:
        "Sidebar active text color (primary|info|success|warning|danger)",
    },
    logo: {
      type: String,
      default: "/static/img/logo-home-2.png",
      description: "Sidebar Logo",
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description:
        "Sidebar links. Can be also provided as children components (sidebar-item)",
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  methods: {
    async initScrollBarAsync() {
      let isWindows = navigator.platform.startsWith("Win");
      if (!isWindows) {
        return;
      }
      const PerfectScroll = await import("perfect-scrollbar");
      PerfectScroll.initialize(this.$refs.sidebarScrollArea);
    },
  },
  mounted() {
    this.initScrollBarAsync();
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>

<style>
@media (min-width: 992px) {
  .navbar-search-form-mobile,
  .nav-mobile-menu {
    display: none;
  }
}
</style>
