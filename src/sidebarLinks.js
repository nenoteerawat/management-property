import { geoClipAntimeridian } from "d3";

export default [
  {
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    path: "/admin/overview",
    roles : ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_SALE_MANAGER", "ROLE_SALE"]
  },
  {
    name: "Pages",
    icon: "nc-icon nc-book-bookmark",
    roles: ["ROLE_ADMIN","ROLE_MANAGER"],
    children: [
      {
        name: "Timeline",
        path: "/pages/timeline"
      },
      {
        name: "User Profile",
        path: "/pages/user"
      },
      {
        name: "Login",
        path: "/login"
      },
      {
        name: "Register",
        path: "/register"
      },
      {
        name: "Lock",
        path: "/lock"
      }
    ]
  },
  {
    name: "Components",
    icon: "nc-icon nc-layout-11",
    roles: ["ROLE_ADMIN", "ROLE_MANAGER"],
    children: [
      {
        name: "Buttons",
        path: "/components/buttons"
      },
      {
        name: "Grid System",
        path: "/components/grid-system"
      },
      {
        name: "Panels",
        path: "/components/panels"
      },
      {
        name: "Sweet Alert",
        path: "/components/sweet-alert"
      },
      {
        name: "Notifications",
        path: "/components/notifications"
      },
      {
        name: "Icons",
        path: "/components/icons"
      },
      {
        name: "Typography",
        path: "/components/typography"
      }
    ]
  },
  {
    name: 'Owner',
    icon: 'nc-icon nc-shop',
    path: '/admin/owner',
    roles: ["ROLE_SALE"]
  },
  {
    name: 'Pages',
    icon: 'nc-icon nc-book-bookmark',
    roles: ['ROLE_ADMIN', "ROLE_MANAGER"],
    children: [
      {
        name: "Regular Forms",
        path: "/forms/regular"
      },
      {
        name: "Extended Forms",
        path: "/forms/extended"
      },
      {
        name: "Validation Forms",
        path: "/forms/validation"
      },
      {
        name: "Wizard",
        path: "/forms/wizard"
      }
    ]
  },
  {
    name: "Table List",
    icon: "nc-icon nc-single-copy-04",
    roles: ["ROLE_SALE","ROLE_ADMIN"],
    collapsed: true,
    children: [
      {
        name: "Regular Tables",
        path: "/table-list/regular"
      },
      {
        name: "Extended Tables",
        path: "/table-list/extended"
      },
      {
        name: "Paginated Tables",
        path: "/table-list/paginated"
      }
    ]
  },
  {
    name: "Approve Change",
    icon: "nc-icon nc-single-copy-04",
    roles: ["ROLE_ADMIN", "ROLE_MANAGER"],
    path: "/approve-change/approve"
  },
  {
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    roles: ["ROLE_SALE"],
    children: [
      {
        name: "Google Maps",
        path: "/maps/google"
      },
      {
        name: "Full Screen Maps",
        path: "/maps/full-screen"
      },
      {
        name: "Vector Maps",
        path: "/maps/vector-map"
      }
    ]
  },
  {
    name: "Widgets",
    icon: "nc-icon nc-box",
    path: "/admin/widgets",
    roles: ["ROLE_ADMIN"]
  },
  {
    name: "Charts",
    icon: "nc-icon nc-chart-bar-32",
    path: "/charts",
    roles: ["ROLE_ADMIN"]
  },
  {
    name: "Calendar",
    icon: "nc-icon nc-calendar-60",
    path: "/calendar",
    roles: ["ROLE_SALE"]
  }
];
