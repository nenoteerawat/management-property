<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

    <!-- <dashboard-core-settings /> -->

    <!-- <dashboard-core-daily-plan /> -->
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      DashboardCoreDrawer: () => import('./components/core/Drawer'),
      // DashboardCoreSettings: () => import('./components/core/Settings'),
      DashboardCoreView: () => import('./components/core/View'),
      // DashboardCoreDailyPlan: () => import('./components/core/DailyPlan'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
