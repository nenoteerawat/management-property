<template>
  <v-app>
    <!--User Setting-->
    <dashboard-core-app-bar />

    <!--Left Menu-->
    <dashboard-core-drawer />

    <!--Borad-->
    <dashboard-core-view />
  </v-app>
</template>

<script>
export default {
  name: "DashboardIndex",

  components: {
    DashboardCoreAppBar: () => import("./components/core/AppBar"),
    DashboardCoreDrawer: () => import("./components/core/Drawer"),
    DashboardCoreView: () => import("./components/core/View"),
  },

  data: () => ({
    expandOnHover: false
  })
};
</script>
