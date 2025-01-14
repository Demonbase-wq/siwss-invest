"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { formatDate } from "@/lib/util";
import useSWR from "swr";

ModuleRegistry.registerModules([AllCommunityModule]);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ReferralTable() {
  const { data: users } = useSWR("/api/get-users", fetcher);
  const { data: referrals } = useSWR("/api/get-referrals", fetcher);

  // Combine and memoize the row data
  const rowData = useMemo(() => {
    if (users?.users && referrals?.referrals) {
      return referrals.referrals.map((referral: any) => {
        const referredUser = users.users.find(
          (user: any) => user.id === referral.fields.referred_user_id
        );
        return {
          id: referral.id,
          name: `${referredUser?.first_name || "N/A"} ${
            referredUser?.last_name || "N/A"
          }`,
          email: referredUser?.email || "N/A",
          status: referral.fields.status,
          date: referral.fields.date,
          payoutPercentage: (referral.fields.payout_percentage * 100).toFixed(0), // Convert to whole number percentage
        };
      });
    }
    return [];
  }, [users, referrals]);

  const isLoading = !users || !referrals;

  const colDefs: ColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    {
      field: "date",
      headerName: "Date",
      valueFormatter: (params: any) => `${formatDate(params.value)}`,
    },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (params: any) => {
        const isCompleted = params.value === "Verified";
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
      field: "payoutPercentage",
      headerName: "Payout Percentage",
      valueFormatter: (params: any) => `${params.value}%`,
    },
  ];

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

  if (isLoading) {
    return (
      <dialog
        id="loading-modal"
        className={`modal bg-primary ${isLoading ? "opacity-100" : ""}`}
      >
        <div className="flex items-center justify-center gap-3">
          <span className="loading loading-dots loading-lg bg-white"></span>
        </div>
      </dialog>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4>Referrals</h4>
      </div>
      <div className="rounded-md">
        <div style={{ width: "100%", height: "100%" }}>
          <AgGridReact
            theme={myTheme}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            domLayout="autoHeight"
            animateRows={true}
          />
        </div>
      </div>
    </div>
  );
}
