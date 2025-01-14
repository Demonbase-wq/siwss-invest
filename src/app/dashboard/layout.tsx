import { AppSidebar } from "@/components/app-sidebar";
import BreadCrumb from "@/components/BreadCrumb";
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
    // <div className="flex flex-col md:flex-row dashboard-bg">
    //   <Sidebar />
    //   <main className="flex-1 bg-mix md:pt-24 md:px-8 overflow-hidden">
    //     <DashTopBar />

    // <div className="px-8 md:px-4 mt-[100px] md:mt-[30px]">
    //   <div>
    //     <div
    //       id="cr-widget-marquee"
    //       data-coins="bitcoin,ethereum,tether,ripple,cardano"
    //       data-theme="dark"
    //       data-show-symbol="true"
    //       data-show-icon="true"
    //       data-show-period-change="true"
    //       data-period-change="24H"
    //       data-api-url="https://api.cryptorank.io/v0"
    //     >
    //       <Link href="https://cryptorank.io">Coins by Cryptorank</Link>
    //       <script src="https://cryptorank.io/widget/marquee.js"></script>
    //     </div>
    //   </div>
    // </div>

    //     {children}
    //   </main>
    // </div>
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
