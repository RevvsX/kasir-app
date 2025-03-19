import { Book, Calendar, CircleDivide, Coins, FolderArchive, History, LayoutDashboard, UserCheck2, Users2 } from "lucide-react";

export const url = [
  {
    category: "Applications",
    url: [
      {
        title: "Dashboard",
        url: "/applications/dashboard",
        icon: LayoutDashboard,
        canAccess: ["ADMIN", "OFFICER"]
      },
      {
        title: "User management",
        url: "/applications/user-management",
        icon: Users2,
        canAccess: ["ADMIN"]
      },
      {
        title: "Category product management",
        url: "/applications/categoryproduct-management",
        icon: CircleDivide,
        canAccess: ["ADMIN"]
      },
      {
        title: "Product management",
        url: "/applications/product-management",
        icon: FolderArchive,
        canAccess: ["ADMIN"]
      },
      {
        title: "Discount management",
        url: "/applications/seasonaldiscount-management",
        icon: Calendar,
        canAccess: ["ADMIN"]
      },
      {
        title: "Member management",
        url: "/applications/member-management",
        icon: UserCheck2,
        canAccess: ["ADMIN"]
      },
    ]
  },
  {
    category: "Transactions",
    url: [
      {
        title: "Cashier",
        url: "/transactions/cashier",
        icon: Coins,
        canAccess: ["ADMIN", "OFFICER"]
      },
      {
        title: "Transaction History",
        url: "/transactions/history",
        icon: History,
        canAccess: ["ADMIN"]
      },
      {
        title: "Report",
        url: "/transactions/report",
        icon: Book,
        canAccess: ["ADMIN"]
      },
    ]
  }
]