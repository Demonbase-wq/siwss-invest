// app/bank-statement/statement/page.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import html2canvas from 'html2canvas-pro';
import useSWR from 'swr';
import { formatDate, formatNumber } from '@/lib/util';


const fetcher = (url: string) => fetch(url).then((res) => res.json());


const Statement: React.FC = () => {
    const { data } = useSWR("/api/transactions", fetcher);
    const [loading, setLoading] = useState(true)
    const [transaction, setTransaction] = useState<any>(null);
    const [id, setId] = useState<string | null>(null);

    // Extract token from URL on the client
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const idFromUrl = urlParams.get("id");
      if(idFromUrl) setId(idFromUrl);
    }, [id]);

    useEffect(() => {
        if (id && data) {
            const foundTransaction = data?.transactions?.find((transaction: any) => transaction.id === id);
            setTransaction(foundTransaction);
            setLoading(false)
        }
    }, [id, data]);


    const generateImg = () => {
        const input = document.getElementById('print-section');
        html2canvas(input as HTMLElement)
            .then(function (canvas) {
                const anchorTag = document.createElement("a");
                anchorTag.download = `invoice-${id}.png`;
                anchorTag.href = canvas.toDataURL();
                anchorTag.click();
            });
    }

    // if(transaction !== null){
    //    setLoading(false)
    // }


    return (
        <div className='md:pt-6 pt-6  md:pb-24 pb-[200px]'>
            <div className='mycontainer'>
                <div className='px-4'>
                    <div>
                        <dialog id="loading-modal" className={`modal bg-primary ${loading ? 'opacity-100' : ''}`}>
                            <div className='flex items-center justify-center gap-3'>
                                <span className="loading loading-dots loading-lg bg-white"></span>
                            </div>
                        </dialog>
                        <div className='flex gap-5 flex-col md:flex-row'>
                            {/* left */}
                            <div id='print-section' className='bg-card rounded-lg md:flex-[3]'>
                                {/* top */}
                                <div className='flex flex-col gap-5 border-b-[1px] border-gray-300 p-4'>
                                    {/* top t */}
                                    <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
                                        <div className='flex items-center gap-2'>
                                            {/* logo div */}
                                            <div>
                                                <img src="/logo.png" alt="" className='w-[300px]' />
                                            </div>
                                            
                                        </div>

                                        <div>
                                            <h3>Invoice: <span className='text-[#4361ee]'>#{transaction?.id}</span></h3>
                                            <h3 className='text-[#4361ee]'>Transaction {transaction?.fields.status}</h3>
                                        </div>
                                    </div>
                                    {/* top t */}

                                    {/* top b */}
                                    <div>
                                        <p className='text-[14px]'>Garden City, NY</p>
                                        <p className='text-[14px]'>support@swisspipsai.com</p>
                                        <p className='text-[14px]'>+1(516)252-6667</p>
                                    </div>
                                    {/* top b */}
                                </div>
                                {/* top */}

                                {/* middle */}
                                <div className='p-4 flex flex-col gap-4 border-b-[1px] border-gray-300'>
                                    <div>
                                        <h3 className="text-lg font-bold text-primary">Transaction Details</h3>
                                    </div>

                                    <div className='flex flex-col gap-3'>
                                        <div className='flex items-center gap-3'>
                                            <p className='text-[12px] flex-1 md:text-[15px]'>Transaction Amount:</p>
                                            <p className='text-[12px] flex-1 md:text-[15px]'>{transaction && formatNumber(transaction?.fields.amount)}</p>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <p className='text-[12px] flex-1 md:text-[15px]'>Transaction Type:</p>
                                            <p className='text-[12px] flex-1 md:text-[15px]'>{transaction?.fields.type}</p>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <p className='text-[12px] flex-1 md:text-[15px]'>Wallet Address:</p>
                                            <p className='text-[12px] flex-1 md:text-[15px]'>{transaction?.fields.wallet_address}</p>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <p className='text-[12px] flex-1 md:text-[15px]'>Transaction Status:</p>
                                            <p className='text-[12px] flex-1 md:text-[15px]'>{transaction?.fields.status}</p>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <p className='text-[12px] flex-1 md:text-[15px]'>Transaction Date:</p>
                                            <p className='text-[12px] flex-1 md:text-[15px]'>{transaction && formatDate(transaction?.fields.date)}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* middle */}

                                {/* bottom */}
                                <div className='p-4'>
                                    <p className='text-[12px] md:text-[13px] text-[#888ea8] font-medium'><strong>NOTE: </strong> If you have any questions or would like more information, please call our 24-hour Contact Centre on +1(516)252-6667 or send an email to support@swisspipsai.com</p>
                                </div>
                                {/* bottom */}
                            </div>
                            {/* left */}

                            {/* right */}
                            <div className='md:flex-[1] bg-white rounded-xl h-[40%] p-[25px] flex flex-col gap-3'>
                                {/* top button */}
                                <div>
                                    <button onClick={generateImg} className='bg-primary w-full p-2 rounded-md text-white'>Print Invoice</button>
                                </div>
                                {/* top button */}

                                {/* bottom button */}
                                <div>
                                    <button className='bg-red-500 w-full p-2 rounded-md text-white'>Report Transaction</button>
                                </div>
                                {/* bottom button */}
                            </div>
                            {/* right */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

const StatementPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Statement />
        </Suspense>
    );
};

export default StatementPage;
