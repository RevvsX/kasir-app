import AppSidebar from "@/components/interactive/AppSidebar";
import DynamicBreadcrumb from "@/components/interactive/DynamicBreadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-2">
        <div className="flex items-center gap-4 p-2">
          <SidebarTrigger />
          <DynamicBreadcrumb />
        </div>
        <main className="p-2 max-w-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
