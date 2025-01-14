"use client";

import * as React from "react";
import {
  AudioWaveform,
  LayoutDashboard,
  ChartCandlestick,
  BookOpen,
  Store,
  Wallet,
  Banknote,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { TeamSwitcher } from "@/components/team-switcher";
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
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    // {
    //   title: "Deposits",
    //   url: "/admin/dashboard/deposits",
    //   icon: PiHandDepositLight,
    // },
    // {
    //   title: "Withdrawals",
    //   url: "admin/dashboard/withdrawals",
    //   icon: BiMoneyWithdraw,
    // },
    // {
    //   title: "Investments",
    //   url: "/admin/dashboard/investments",
    //   icon: Banknote,
    // },
    // {
    //   title: "Users",
    //   url: "/admin/dashboard/users",
    //   icon: BiMoneyWithdraw,
    // },
    // {
    //   title: "Kyc Requests",
    //   url: "/admin/dashboard/kyc",
    //   icon: BiMoneyWithdraw,
    // },
  ],
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data : user } = useSWR("/api/get-user", fetcher);
  const [loading, setLoading] = React.useState(true);

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
    }

  return (
    <Sidebar className="bg-primary" collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="px-2">
          <Link href="/">
            <img
              src="/nav-logo.png"
              alt="logo"
              className=""
            />
          </Link>
        </div>{" "}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
