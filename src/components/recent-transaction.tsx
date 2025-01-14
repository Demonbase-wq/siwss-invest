"use client"

import { ArrowDownRight, ArrowUpRight, MinusCircle, Users } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Transaction {
  id: string
  type: "investment" | "withdrawal" | "profit" | "referral"
  amount: number
  status: "completed" | "pending" | "failed"
  date: string
  description: string
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "investment",
    amount: 5000,
    status: "completed",
    date: "2024-01-15",
    description: "Tech Growth Fund Investment",
  },
  {
    id: "2",
    type: "profit",
    amount: 750,
    status: "completed",
    date: "2024-01-14",
    description: "Quarterly Dividend Payment",
  },
  {
    id: "3",
    type: "withdrawal",
    amount: 1000,
    status: "pending",
    date: "2024-01-13",
    description: "Withdrawal Request",
  },
  {
    id: "4",
    type: "referral",
    amount: 200,
    status: "completed",
    date: "2024-01-12",
    description: "Referral Bonus",
  },
]

export default function RecentTransactions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                {transaction.type === "investment" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : transaction.type === "withdrawal" ? (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                ) : transaction.type === "referral" ? (
                  <Users className="h-4 w-4 text-blue-500" />
                ) : (
                  <MinusCircle className="h-4 w-4 text-blue-500" />
                )}
                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
              </div>
            </TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell className="text-right">
              <span className={
                transaction.type === "investment" || transaction.type === "referral" ? "text-green-500" :
                transaction.type === "withdrawal" ? "text-red-500" :
                "text-blue-500"
              }>
                {transaction.type === "withdrawal" ? "-" : "+"}
                ${transaction.amount.toLocaleString()}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

