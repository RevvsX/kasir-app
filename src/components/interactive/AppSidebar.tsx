import {
  Book,
  ChevronUp,
  CircleDivide,
  Coins,
  FolderArchive,
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  User2,
  UserCheck2,
  Users2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";



const url = [
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
        title: "Report",
        url: "/transactions/report",
        icon: Book,
        canAccess: ["ADMIN"]
      },
    ]
  }
]


const AppSidebar = () => {
  const pathname = usePathname();
  const { data } = useSession()
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton>
            <ShoppingBag />
            <div>
              <span>7NightMarket</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {
          url.map((i, index) => {
            return (
              <SidebarGroup key={index}>
                <SidebarGroupLabel>{i.category}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {i.url.map((item) => {
                      if (item.canAccess.includes(data?.user.role as string)) {
                        return (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={pathname == item.url}>
                              <Link href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      }
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )
          })
        }
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  <div className="flex flex-col">
                    <span className="text-nowrap">{data?.user.full_name}</span>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem asChild>
                  <Link href={"/profile"}>
                    <User2 />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
