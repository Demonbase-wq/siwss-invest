import DashTopBar from "@/components/userDashboard/Dashboard/DashTopBar";
import Sidebar from "@/components/userDashboard/Dashboard/Sidebar";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "User Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 bg-[#e2ebf7] md:pt-24 md:px-8 overflow-hidden">
        <DashTopBar />
        {children}
      </main>
    </div>
  );
}