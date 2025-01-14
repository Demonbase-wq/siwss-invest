import React from "react";
// import KycPending from "@/components/userDashboard/Dashboard/KycPending";
// import { auth } from "../../../../auth";
import KYC from "@/components/userDashboard/Kyc/KycDetails";

const page = async () => {
  // const session = await auth();

  return (
    <div>
      <div className="">
        <KYC />
      </div>
    </div>
  );
};

export default page;
