import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        oAuth: false,
        items: [
          {
            title: "eCommerce",
            url: "/",
          },
        ],
      },
      // {
      //   title: "1.Tasks",
      //   icon: Icons.Alphabet,
      //   url: "/table-tasks",
      //   items: [],
      // },
      // {
      //   title: "2.Tasks",
      //   icon: Icons.Alphabet,
      //   url: "/tanstack-table-tasks",
      //   items: [],
      // },
      {
        title: "Products",
        icon: Icons.Product,
        oAuth: false,
        url: "/products",
        items: [],
      },
      {
        title: "Categories",
        icon: Icons.Category,

        oAuth: false,
        url: "/categories",
        items: [],
      },
      {
        title: "Orders",
        icon: Icons.Order,
        oAuth: false,
        url: "/orders",
        items: [],
      },
      {
        title: "Reviews",
        icon: Icons.Review,
        oAuth: false,
        url: "/reviews",
        items: [],
      },
      {
        title: "Users",
        icon: Icons.User,
        oAuth: false,
        url: "/users",
        items: [],
      },



      //     {
      //       title: "Calendar",
      //       url: "/calendar",
      //       icon: Icons.Calendar,
      //       items: [],
      //     },
      //     {
      //       title: "Profile",
      //       url: "/profile",
      //       icon: Icons.User,
      //       items: [],
      //     },
      //     {
      //       title: "Forms",
      //       icon: Icons.Alphabet,
      //       items: [
      //         {
      //           title: "Form Elements",
      //           url: "/forms/form-elements",
      //         },
      //         {
      //           title: "Form Layout",
      //           url: "/forms/form-layout",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Tables",
      //       url: "/tables",
      //       icon: Icons.Table,
      //       items: [
      //         {
      //           title: "Tables",
      //           url: "/tables",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Pages",
      //       icon: Icons.Alphabet,
      //       items: [
      //         {
      //           title: "Settings",
      //           url: "/pages/settings",
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   label: "OTHERS",
      //   items: [
      //     {
      //       title: "Charts",
      //       icon: Icons.PieChart,
      //       items: [
      //         {
      //           title: "Basic Chart",
      //           url: "/charts/basic-chart",
      //         },
      //       ],
      //     },
      //     {
      //       title: "UI Elements",
      //       icon: Icons.FourCircle,
      //       items: [
      //         {
      //           title: "Alerts",
      //           url: "/ui-elements/alerts",
      //         },
      //         {
      //           title: "Buttons",
      //           url: "/ui-elements/buttons",
      //         },
      //       ],
      //     },
      {
        title: "Authentication",
        oAuth: true,
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/auth/sign-in",
          },
          {
            title: "Sign Up",
            url: "/auth/sign-up",
          },
        ],
      },
    ],
  },
];
