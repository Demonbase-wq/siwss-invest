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
import axios from "axios";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

ModuleRegistry.registerModules([AllCommunityModule]);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AdminDeposits: React.FC = () => {
  const { data: depositData, mutate } = useSWR("/api/admin-deposits", fetcher);
  const { data: usersData } = useSWR("/api/admin-users", fetcher);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [selectedDepositId, setSelectedDepositId] = useState<string | null>(null);

  useEffect(() => {
    if (depositData?.deposits && usersData?.users) {
      const deposits = depositData.deposits.map((deposit: any) => {
        const user = usersData.users.find(
          (user: any) => user.id === deposit.user_id
        );
        return {
          ...deposit,
          email: user?.email || "N/A",
          full_name: user
            ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
            : "N/A",
        };
      });
      setRowData(deposits);
      setLoading(false);
    }
  }, [depositData, usersData]);

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
      cellRenderer: (params: any) => (
        <span className="px-2 rounded font-semibold text-green-500">
          +${formatNumber(params.value)}
        </span>
      ),
    },
    { field: "wallet_address", headerName: "Wallet Address", width: 500 },
    { field: "email", headerName: "Email" },
    { field: "full_name", headerName: "Full Name" },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (params: any) => {
        const status = params.value;
        return (
          <span
            className={`px-2 rounded font-semibold ${
                status === "Approved"
                ? "bg-green-100 text-green-800" 
                : status === "Declined" ? "bg-red-100 text-red-800"
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
      field: "approve",
      headerName: "Approve",
      cellRenderer: (params: any) => (
        <button
          className="bg-green-700 block text-white px-3 m-1 rounded"
          onClick={() => handleApproveDeposit(params.data.id)}
        >
          Approve
        </button>
      ),
    },
    {
      field: "decline",
      headerName: "Decline",
      cellRenderer: (params: any) => (
        <button
          className="bg-red-700 block text-white px-3 m-1 rounded"
          onClick={() => handleOpenDeclineModal(params.data.id)}
        >
          Decline
        </button>
      ),
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

  const handleApproveDeposit = async (id: string) => {
    const toastId = toast.loading("Approving deposit...");
    try {
      const response = await axios.post("/api/approve-deposits", { id });
      const message = response?.data.message;
      const error = response?.data.error;
      if (message) {
        toast.dismiss(toastId);
        toast.success(message);
        mutate("/api/admin-deposits");
      }
      if (error) {
        toast.dismiss(toastId);
        toast.error(error);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to approve deposit.");
      console.error(error);
    }
  };

  const handleOpenDeclineModal = (id: string) => {
    setSelectedDepositId(id);
    setIsDeclineModalOpen(true);
  };

  const handleCloseDeclineModal = () => {
    setIsDeclineModalOpen(false);
    setDeclineReason("");
    setSelectedDepositId(null);
  };

  const handleDeclineDeposit = async () => {
    if (!selectedDepositId || !declineReason.trim()) return;

    const toastId = toast.loading("Declining deposit...");
    try {
      const response = await axios.post("/api/decline-deposit", {
        id: selectedDepositId,
        reason: declineReason,
      });
      const message = response?.data.message;
      const error = response?.data.error;
      if (message) {
        toast.dismiss(toastId);
        toast.success(message);
        mutate("/api/admin-deposits");
      }
      if (error) {
        toast.dismiss(toastId);
        toast.error(error);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to decline deposit.");
      console.error(error);
    } finally {
      handleCloseDeclineModal();
    }
  };

  if (loading || !usersData || !depositData) {
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

  return (
    <div className="container px-4 mx-auto py-6">
      {loading ? (
        <Skeleton className="h-[400px]" />
      ) : (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1>Deposit Approvals</h1>
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
        </Card>
      )}

      <Dialog open={isDeclineModalOpen} onOpenChange={setIsDeclineModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline Deposit</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                Reason
              </Label>
              <Input
                id="reason"
                className="col-span-3"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDeclineModal}>
              Cancel
            </Button>
            <Button onClick={handleDeclineDeposit}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDeposits;

