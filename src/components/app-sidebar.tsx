"use client";

import * as React from "react";
import {
  AudioWaveform,
  LayoutDashboard,
  ChartCandlestick,
  Store,
  Wallet,
  Banknote,
  Command,
  GalleryVerticalEnd,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { useTranslation } from "@/translations/provider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { PiHandDepositLight } from "react-icons/pi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GoHistory } from "react-icons/go";
import { TbAffiliate } from "react-icons/tb";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user, error } = useSWR("/api/get-user", fetcher);
  const [loading, setLoading] = React.useState(true);
  const { translations } = useTranslation();

  // This is sample data.
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: translations?.dashboardSidebar?.text1,
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
        // items: [
        //   {
        //     title: "History",
        //     url: "#",
        //   },
        //   {
        //     title: "Starred",
        //     url: "#",
        //   },
        //   {
        //     title: "Settings",
        //     url: "#",
        //   },
        // ],
      },
      {
        title: translations?.dashboardSidebar?.text2,
        url: "/dashboard/market",
        icon: Store,
      },
      {
        title: translations?.dashboardSidebar?.text3,
        url: "/dashboard/spot",
        icon: ChartCandlestick,
      },
    ],
    projects: [
      {
        name: translations?.dashboardSidebar?.text5,
        url: "/dashboard/wallet",
        icon: Wallet,
      },
      {
        name: translations?.dashboardSidebar?.text6,
        url: "/dashboard/investments",
        icon: Banknote,
      },
      {
        name: translations?.dashboardSidebar?.text7,
        url: "/dashboard/deposit",
        icon: PiHandDepositLight,
      },
      {
        name: translations?.dashboardSidebar?.text8,
        url: "/dashboard/withdraw",
        icon: BiMoneyWithdraw,
      },
      {
        name: translations?.dashboardSidebar?.text9,
        url: "/dashboard/history",
        icon: GoHistory,
      },
      {
        name: translations?.dashboardSidebar?.text10,
        url: "/dashboard/refer&earn",
        icon: TbAffiliate,
      },
    ],
  };

  React.useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading || !user) {
    return (
      <dialog
        id="loading-modal"
        className={`modal bg-primary ${loading ? "opacity-100" : ""}`}
      >
        <div className="flex items-center justify-center gap-3">
          <span className="loading loading-dots loading-lg bg-white"></span>
        </div>
      </dialog>
    );
  }

  const userData = {
    name: `${user?.first_name} ${user?.last_name}`,
    email: user?.email,
    avatar: user?.img,
  };

  return (
    <Sidebar className="bg-primary" collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="px-2">
          <Link href="/">
            <img src="/logo.png" alt="logo" className="" />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
