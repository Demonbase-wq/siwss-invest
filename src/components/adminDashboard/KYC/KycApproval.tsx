"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
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

const KycApprovals: React.FC = () => {
  const { data: kycData } = useSWR("/api/admin-kyc", fetcher);
  const { data: usersData } = useSWR("/api/admin-users", fetcher);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [selectedKycId, setSelectedKycId] = useState<string | null>(null);

  useEffect(() => {
    if (kycData?.kycRequests && usersData?.users) {
      const kycRequests = kycData.kycRequests.map((request: any) => {
        const user = usersData.users.find(
          (user: any) => user.id === request.user_id
        );
        return {
          ...request,
          email: user?.email || "N/A",
          full_name: user
            ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
            : "N/A",
        };
      });
      setRowData(kycRequests);
      setLoading(false);
    }
  }, [kycData, usersData]);

  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      field: "id",
      headerName: "S/N",
      valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
    },
    { field: "id", headerName: "KYC ID" },
    { field: "email", headerName: "Email" },
    { field: "full_name", headerName: "Full Name" },
    // { field: "id_number", headerName: "ID Number" },
    // { field: "ssn", headerName: "SSN" },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (params: any) => {
        const status = params.value;
        return (
          <span
            className={`px-2 rounded font-semibold ${
                status === "Verified"
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
    // {
    //   field: "passport",
    //   headerName: "Passport",
    //   cellRenderer: (params: any) => (
    //     <a
    //       href={params.value}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="text-blue-500 underline"
    //     >
    //       View
    //     </a>
    //   ),
    // },
    // {
    //   field: "front",
    //   headerName: "ID Front",
    //   cellRenderer: (params: any) => (
    //     <a
    //       href={params.value}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="text-blue-500 underline"
    //     >
    //       View
    //     </a>
    //   ),
    // },
    // {
    //   field: "back",
    //   headerName: "ID Back",
    //   cellRenderer: (params: any) => (
    //     <a
    //       href={params.value}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="text-blue-500 underline"
    //     >
    //       View
    //     </a>
    //   ),
    // },
    {
      field: "approve",
      headerName: "Approve",
      cellRenderer: (params: any) => (
        <button
          className="bg-green-700 block text-white px-3 m-1 rounded"
          onClick={() => handleApproveKyc(params.data.id)}
        >
          Approve
        </button>
      ),
    },
    // {
    //   field: "decline",
    //   headerName: "Decline",
    //   cellRenderer: (params: any) => (
    //     <button
    //       className="bg-red-700 block text-white px-3 m-1 rounded"
    //       onClick={() => handleOpenDeclineModal(params.data.id)}
    //     >
    //       Decline
    //     </button>
    //   ),
    // },
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

  const handleApproveKyc = async (id: string) => {
    const toastId = toast.loading("Approving KYC...");
    try {
      const response = await axios.post("/api/approve-kyc", { id });
      const message = response?.data?.message || "KYC approved successfully!";
      toast.success(message);
      toast.dismiss(toastId);

      mutate("/api/admin-kyc");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to approve KYC.");
      console.error(error);
    }
  };

  const handleOpenDeclineModal = (id: string) => {
    setSelectedKycId(id);
    setIsDeclineModalOpen(true);
  };

  const handleCloseDeclineModal = () => {
    setIsDeclineModalOpen(false);
    setDeclineReason("");
    setSelectedKycId(null);
  };

  const handleDeclineKyc = async () => {
    if (!selectedKycId || !declineReason.trim()) return;

    const toastId = toast.loading("Declining KYC...");
    try {
      const response = await axios.post("/api/decline-kyc", {
        id: selectedKycId,
        reason: declineReason,
      });
      const message = response?.data?.message || "KYC declined successfully!";
      toast.success(message);
      toast.dismiss(toastId);

      mutate("/api/admin-kyc");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to decline KYC.");
      console.error(error);
    } finally {
      handleCloseDeclineModal();
    }
  };

  if (loading || !usersData || !kycData) {
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
              <h1>KYC Requests</h1>
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
            <DialogTitle>Decline KYC</DialogTitle>
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
            <Button onClick={handleDeclineKyc}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KycApprovals;

