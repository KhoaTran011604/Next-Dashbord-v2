import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "eCommerce",
            url: "/",
          },
        ],
      },
      {
        title: "Products",
        url: "/products",
        oAuth: false,
        icon: Icons.FourCircle,
        items: [],
      },
      {
        title: "Categories",
        url: "/categories",
        oAuth: false,
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "Orders",
        url: "/orders",
        oAuth: false,
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Reviews",
        url: "/reviews",
        oAuth: false,
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "Users",
        url: "/users",
        oAuth: false,
        icon: Icons.User,
        items: [],
      },

    ],
  },
  {
    label: "OTHERS",
    items: [

      {
        title: "Authentication",
        icon: Icons.Authentication,
        oAuth: true,
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
