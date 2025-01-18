'use client'
import DepositForm from "@/components/userDashboard/Check/Deposit";
import { useTranslation } from "@/translations/provider";
import React from "react";

const page = () => {
    const { translations } = useTranslation();
  
  return (
    <div className="container px-4 lg:pl-12 lg:px-0 py-10">
      <h1 className="text-4xl font-bold mb-6">{translations?.dashboardDeposit?.text1}</h1>
      <DepositForm />
    </div>
  );
};

export default page;
