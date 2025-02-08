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

const items = [
  {
    title: "Dashboard",
    url: "/applications/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "User management",
    url: "/applications/user-management",
    icon: Users2,
  },
  {
    title: "Category product management",
    url: "/applications/categoryproduct-management",
    icon: CircleDivide,
  },
  {
    title: "Product management",
    url: "/applications/product-management",
    icon: FolderArchive,
  },
  {
    title: "Member management",
    url: "#",
    icon: UserCheck2,
  },
  {
    title: "Transaction management",
    url: "#",
    icon: Coins,
  },
  {
    title: "Report",
    url: "#",
    icon: Book,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();
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
        <SidebarGroup>
          <SidebarGroupLabel>Applications</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
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
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
                    <span className="text-nowrap">Remmy Shiranui</span>
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
                <DropdownMenuItem>
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
