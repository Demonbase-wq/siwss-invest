// app/bank-statement/page.tsx
'use client';

import { containsTransfer, formatDate, formatNumber } from '@/lib/util';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());



const BankStatement: React.FC = () => {
  const { data } = useSWR("/api/transactions", fetcher);
  const [loading, setLoading] = useState(true)

  const router = useRouter();

  useEffect(() => {
    if(data){
      setLoading(false)
    }
  }, [data]);



  const handleViewReceipt = (id: string) => {
    router.push(`/dashboard/statements/statement?id=${id}`);
  };

  return (
    <div className="md:pt-6">
      <dialog id="loading-modal" className={`modal bg-[#004080] ${loading ? 'opacity-100' : ''}`}>
        <div className='flex items-center justify-center gap-3'>
          <span className="loading loading-ring loading-lg bg-white"></span>
        </div>
      </dialog>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-6xl">
        <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between md:items-center mb-4">
          <h2 className="text-2xl font-bold text-primary">Bank Statement</h2>
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:items-center md:space-x-4">
            <div className="relative">
              <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>Results: 7</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.516 7.548A7.489 7.489 0 001 12a7.5 7.5 0 1012-6.032V2a8 8 0 11-8 0v5H2.5a5.5 5.5 0 110 11H7v-2H2.5a3.5 3.5 0 100-7H8v5h6a8 8 0 10-6-14zM8 10V6H6v4h2zm4 0V6h-2v4h2z" />
                </svg>
              </div>
            </div>
            <input type="text" placeholder="Search..." className="border bg-[#e2ebf7] border-gray-300 p-2 rounded" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-[1500px] bg-white border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 text-left">S/N</th>
                <th className="border-b py-2 text-left">Reference ID</th>
                <th className="border-b py-2 text-left">Amount</th>
                <th className="border-b py-2 text-left">Type</th>
                <th className="border-b py-2 text-left">Payment Account</th>
                <th className="border-b py-2 text-left">Status</th>
                <th className="border-b py-2 text-left">Date</th>
                <th className="border-b py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.transactions?.map((transaction: any, index: any) => (
                <tr key={transaction.id}>
                  <td className="border-b py-2">{index + 1}</td>
                  <td className="border-b py-2">{transaction.id}</td>
                  <td className={`border-b py-2 text-green-500 ${containsTransfer(transaction.fields.type) ? 'text-red-500' : ''}`}>{containsTransfer(transaction.fields.type) ? '-$' + formatNumber(transaction.fields.amount) : '+$' + formatNumber(transaction.fields.amount)}</td>
                  <td className="border-b py-2">{transaction.fields.type}</td>
                  <td className="border-b py-2">
                    <span className="bg-purple-100 text-purple-700 py-1 px-2 rounded-full text-sm">{transaction.fields.payment_account}</span>
                  </td>
                  <td className="border-b py-2">
                    <span className={`py-1 px-2 rounded-full text-sm ${transaction.fields.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {transaction.fields.status}
                    </span>
                  </td>
                  <td className="border-b py-2">{formatDate(transaction.fields.date)}</td>
                  <td className="border-b py-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => handleViewReceipt(transaction.id)}
                    >
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between md:items-center mt-4">
          <p className="text-gray-600">Showing page 1 of 1</p>
          <div className="flex space-x-2">
            <button className="bg-gray-200 text-gray-600 px-2 py-1 rounded">Previous</button>
            <button className="bg-blue-500 text-white px-2 py-1 rounded">1</button>
            <button className="bg-gray-200 text-gray-600 px-2 py-1 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankStatement;
