// app/bank-statement/page.tsx
"use client";

import { containsTransfer, formatDate, formatNumber } from "@/lib/util";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import useSWR from "swr";
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

ModuleRegistry.registerModules([AllCommunityModule]);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const WalletTransaction: React.FC = () => {
  const { data } = useSWR("/api/transactions", fetcher);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (data) {
      const transactions = data.transactions.map((transaction: any) => ({
        ...transaction.fields, // Spread the fields object
        id: transaction.id, // Add the top-level id
      }));
      setRowData(transactions);
      console.log(rowData);
      setLoading(false);
    }
  }, [data, rowData]);

  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      field: "id",
      headerName: "S/N",
      valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
    },
    { field: "id", headerName: "Reference ID" },
    {
      field: "amount",
      headerName: "Amount",
      cellRenderer: (params: any) => {
        const type = params.data?.type || ""; // Ensure `type` is accessible
        const amount = params.value; // Get the amount value

        // Check transaction type and determine sign
        const isWithdrawal = type.toLowerCase() === "withdrawal";
        const sign = isWithdrawal ? "-" : "+"; // Use "-" for withdrawal and "+" for deposit

        return (
          <span
            className={`px-2 rounded font-semibold ${
              isWithdrawal ? "text-red-500" : "text-green-500"
            }`}
          >
            {sign}${formatNumber(amount)}
          </span>
        );
      },
    },
    { field: "type", headerName: "Type" },
    { field: "wallet_address", headerName: "Wallet Address", width: 500 },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (params: any) => {
        const isCompleted = params.value === "Approved";
        return (
          <span
            className={`px-2 rounded font-semibold ${
              isCompleted
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {params.value}
          </span>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      valueFormatter: (params: any) => `${formatDate(params.value)}`,
    },
    {
      field: "view",
      headerName: "View",
      cellRenderer: (params: any) => {
        return (
          <button
            className="bg-blue-700 block text-white px-3 m-1 rounded"
            onClick={() => handleViewReceipt(params.id)}
          >
            View Receipt
          </button>
        );
      },
    },
  ]);

  const defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  const myTheme = themeQuartz.withParams({
    backgroundColor: "#030834",
    headerBackgroundColor: "#010522",
    foregroundColor: "gray",
    rowBorder: { color: "#333333" },
  });

  const handleViewReceipt = (id: string) => {
    router.push(`/dashboard/history/statement?id=${id}`);
  };

  return (
    <Card className="p-6">
      <Suspense fallback={<Skeleton className="h-[400px]" />}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4>Recent Transactions</h4>
          </div>
          <div className="rounded-md">
            <div style={{ width: "100%", height: "100%" }}>
              <AgGridReact
                theme={myTheme}
                rowData={rowData}
                columnDefs={colDefs}
                rowHeight={50}
                defaultColDef={defaultColDef}
                domLayout="autoHeight"
                animateRows={true}
              />
            </div>
          </div>
        </div>
      </Suspense>
    </Card>
  );
};

export default WalletTransaction;
