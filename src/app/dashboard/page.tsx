import React from "react";
import DashboardPage from "@/components/userDashboard/Dashboard/Main";
import { auth } from "../../../auth";
import Pending from "@/components/userDashboard/Dashboard/Pending";
import Decline from "@/components/userDashboard/Dashboard/Decline";

const page = async () => {
  const session = await auth();

  return (
    <div>
      {session?.user.kyc === "Pending" ? (
        <div>
          <Pending />
        </div>
      ) : session?.user.kyc === "Declined" ? (<div>
        <Decline />
      </div>) :(
        <div>
          <DashboardPage />
        </div>
      )}
    </div>
  );
};

export default page;
