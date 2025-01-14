import { AppSidebar } from "@/components/adminDashboard/components/app-sidebar";
import BreadCrumb from "@/components/adminDashboard/components/BreadCrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-primary flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadCrumb />
          </div>
        </header>

        {children}

      </SidebarInset>
    </SidebarProvider>
  );
}
