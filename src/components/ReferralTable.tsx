"use client";

import { useState } from "react";
import { AllCommunityModule, ColDef, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { formatDate } from "@/lib/util";

ModuleRegistry.registerModules([AllCommunityModule]);


const referrals = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    date: "2024-01-15",
    status: "Verified",
    payoutPercentage: 10,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    date: "2024-01-14",
    status: "Pending",
    payoutPercentage: 15,
  },
];

export default function ReferralTable() {
    const [rowData, setRowData] = useState(referrals);

  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "date", headerName: "Date",       valueFormatter: (params: any) => `${formatDate(params.value)}`,
     },
    { field: "status", headerName: "Status",  cellRenderer: (params : any) => {
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
      }, },
    {
      field: "payoutPercentage",
      headerName: "Payout Percentage",
      valueFormatter: (params: any) => `${params.value}%`,
    },
  ]);

  const defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  const myTheme = themeQuartz.withParams({
    backgroundColor: '#030834',
    headerBackgroundColor: '#010522',
    foregroundColor: 'gray',
    rowBorder: { color: '#333333' },
});

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
