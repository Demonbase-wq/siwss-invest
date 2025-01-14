import CryptoDeposit from "@/components/userDashboard/Check/Crypto";
import DepositForm from "@/components/userDashboard/Check/Deposit";
import React from "react";

const page = () => {
  return (
    <div className="container px-4 lg:pl-12 lg:px-0 py-10">
      <h1 className="text-4xl font-bold mb-6">Deposit Funds</h1>
      <DepositForm />
    </div>
  );
};

export default page;
