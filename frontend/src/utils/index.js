export const menuOptions = [
  {
    label: "Dashboard",
    value: "Dashboard",
    path: "/",
    icon: "menu-icon tf-icons bx bx-home-circle",
  },
  {
    label: "Item",
    value: "Item",
    // path: "/product",
    icon: "menu-icon bx bx-cart",
    menuSub: [
      {
        label: "Items",
        value: "Items",
        path: "/item/items",
      },
      {
        label: "Category",
        value: "Category",
        path: "/item/category",
      },
    ],
  },
  {
    label: "Material",
    // path: "/material",
    value: "Material",
    icon: "menu-icon bx bx-book-content",
    menuSub: [
      {
        label: "Material",
        value: "Material",
        path: "/material/list",
      },
      {
        label: "Category",
        value: "Category",
        path: "/material/category",
      },
    ],
  },
  {
    label: "Customer",
    value: "Customer",
    path: "/customer",
    icon: "menu-icon bx bx-user-pin",
  },
  {
    label: "Shop",
    value: "Shop",
    path: "/shop",
    icon: "menu-icon bx bx-shopping-bag",
  },
  {
    label: "Cost",
    value: "Cost",
    path: "/cost",
    icon: "menu-icon bx bx-dollar-circle",
  },
  {
    label: "Proposal Status",
    path: "/proposal-status",
    value: "Proposal Status",
    icon: "menu-icon bx bx-info-circle",
  },
  {
    label: "PDF Note",
    path: "/pdf-note",
    value: "PDF Note",
    icon: "menu-icon tf-icons bx bx-notepad",
  },
  {
    label: "Users",
    value: "Users",
    path: "/users",
    icon: "menu-icon tf-icons bx bx-user",
  },
  {
    label: "Role",
    value: "Role",
    path: "/role",
    icon: "menu-icon tf-icons bx bx-shield-alt-2",
  },
  {
    label: "Create Proposal",
    path: "/create-proposal",
    value: "Create Proposal",
    icon: "menu-icon bx bx-book-add",
  },
  {
    label: "Proposal",
    path: "/proposal",
    value: "Proposal",
    icon: "menu-icon bx bx-book-add",
  },
  {
    label: "Settings",
    value: "Settings",
    // path: "/product",
    icon: "menu-icon bx bx-cog",
    menuSub: [
      {
        label: "Global Values",
        value: "Global Values",
        path: "/settings/global-values",
      },
      {
        label: "Status",
        value: "Status",
        path: "/settings/status",
      },
    ],
  },

];
