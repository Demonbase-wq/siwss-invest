'use client'
import React, { useState, useEffect } from 'react'
import useSWR from "swr";
import { FaPlus } from "react-icons/fa6";
import { formatNumber, formatDate, containsTransfer } from '../../../lib/util';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";



interface Transaction {
    id: string;
    fields: {
        payment_account: string,
        date: string,
        user_id: string,
        type: string,
        amount: number,
        status: string,
    };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());


const Main = () => {
    const { data } = useSWR("/api/transactions", fetcher);
    const { data: user } = useSWR("/api/get-user", fetcher);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (data && user) {
            setLoading(false)
        }
    }, [data, user]);

    // let inflow = 0;
    // if (data) {
    //     inflow = data.transactions.reduce((acc: any, transaction: Transaction) => {
    //         return acc + transaction.fields.amount;
    //     }, 0)
    // }



    return (
        <div className='md:pt-6 pt-6 pb-6 md:pb-24'>
            <div className="mycontainer md:hidden">
                <dialog id="loading-modal" className={`modal bg-[#004080] ${loading ? 'opacity-100' : ''}`}>
                    <div className='flex items-center justify-center gap-3'>
                        <span className="loading loading-ring loading-lg bg-white"></span>
                    </div>
                </dialog>
                <div className="px-4">
                    <div>
                        <div className='flex flex-col gap-6'>
                            {/* top */}
                            <div className='flex flex-col md:flex-row gap-6'>
                                {/* top left */}
                                <div className='flex md:flex-[1.6] justify-center md:justify-start items-center'>
                                    <div className='bg-white w-full sm:max-w-sm pb-3 rounded-[13px] flex flex-col'>
                                        <div className='bg-primary relative flex flex-col gap-6 rounded-[13px] px-4 pt-3 pb-[80px]'>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex gap-2 items-center bg-[#00000074] py-1 rounded-[30px] px-2'>
                                                    <div className='w-[40px] h-[40px] rounded-full border-[1px] border-primary'>
                                                        <img src={user?.img} alt="" className='object-cover h-full w-full rounded-full' />
                                                    </div>

                                                    <p className='text-[11px] md:text-[14px] font-medium text-white'>{user?.first_name + " " + user?.last_name}</p>
                                                </div>

                                                <div className='flex items-center justify-center p-3 rounded-[15px] bg-[#00000074]'>
                                                    <FaPlus size={18} color='white' />
                                                </div>
                                            </div>

                                            <div className='flex justify-between items-center'>
                                                <p className='text-white text-[14px]'>Balance:</p>

                                                <p className='text-white text-[14px]'>${formatNumber(user?.balance_current)}</p>
                                            </div>

                                            <div className='flex justify-between absolute bottom-[-20px] left-0 right-0 px-4'>
                                                <div className='bg-white flex flex-col gap-1 w-[40%] shadow-xl p-3 rounded-[8px]'>
                                                    <div className='flex justify-between items-center'>
                                                        <p className='text-[12px] md:text-[14px]'>inflow</p>

                                                        <FaChevronDown size={12} color='green' />

                                                    </div>

                                                    <p className='text-green-500 md:text-[14px] sm:text-[12px] text-[70%]'>${formatNumber(user?.inflow)}</p>
                                                </div>
                                                <div className='bg-white shadow-xl flex flex-col gap-1 w-[40%] p-3 rounded-[8px]'>
                                                    <div className='flex justify-between items-center'>
                                                        <p className='text-[12px] md:text-[14px]'>outflow</p>

                                                        <FaChevronUp size={12} color='red' />

                                                    </div>

                                                    <p className='text-red-500 md:text-[14px] sm:text-[12px] text-[70%]'>${formatNumber(user?.outflow)}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* middle top */}
                                        <div className='mt-10 px-4 flex flex-col gap-2'>
                                            <div className='flex justify-between items-center'>
                                                <p className='text-gray-500 text-[13px] md:text-[14px]'>Loan Balance:</p>

                                                <p className='text-[14px] text-[#805dca]'>${user ? formatNumber(user?.loan_balance) : formatNumber(0)}</p>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <p className='text-gray-500 text-[13px] md:text-[14px]'>Savings Balance:</p>

                                                <p className='text-[#2196f3] text-[14px]'>${user ? formatNumber(user?.balance_savings) : formatNumber(0)}</p>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <p className='text-gray-500 text-[13px] md:text-[14px]'>Account Balance:</p>

                                                <p className='text-[#2196f3] text-[14px]'>${formatNumber(user?.balance_current)}</p>
                                            </div>
                                        </div>
                                        {/* middle top */}

                                        <div className='mt-5 px-7 justify-between flex'>
                                            <button className='text-[13px] py-[6px] px-[11px] rounded-[8px] text-[#805dca] bg-[#5c1ac32b] md:text-[14px]'>View Details</button>

                                            <a href='/dashboard/profile' className='text-[13px] py-[6px] px-[11px] rounded-[8px] text-[#009688] bg-[#00968830] md:text-[14px]'>Account Details</a>
                                        </div>
                                    </div>
                                    {/* top left */}
                                </div>



                                {/* top right */}
                                <div className='md:flex-[3]'>
                                    <div className='bg-white rounded-[10px] p-3 flex flex-col gap-4'>
                                        <div className='flex justify-between items-center'>
                                            <p>Transactions</p>

                                            <div className='flex gap-[2px] items-center'>
                                                <div className='h-[4px] w-[4px] bg-gray-500 rounded-full'></div>
                                                <div className='h-[4px] w-[4px] bg-gray-500 rounded-full'></div>
                                                <div className='h-[4px] w-[4px] bg-gray-500 rounded-full'></div>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-6'>
                                            {data?.transactions?.map((data: Transaction, index: any) => (
                                                <div key={data.id} className='flex items-center justify-between'>
                                                    <div className='flex items-center gap-2'>
                                                        <div className='flex items-center justify-center p-3 rounded-[15px] bg-[#BAE7FF]'>
                                                            <FaPlus size={15} color='#2196f3' />
                                                        </div>

                                                        <div className='flex flex-col gap-1'>
                                                            <p className='font-bold text-primary text-[13px]'>{data.fields.type}</p>

                                                            <p className='text-gray-500 text-[13px]'>{formatDate(data.fields.date)}</p>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className={`text-green-500 text-[13px] ${containsTransfer(data.fields.type) ? 'text-red-500' : ''}`}>{containsTransfer(data.fields.type) ? '-$' + formatNumber(data.fields.amount) : '+$' + formatNumber(data.fields.amount)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* top right */}
                            </div>
                            {/* top */}

                            {/* bottom */}
                            <div className=' flex flex-col md:flex-row md:items-center gap-4'>
                                <div className='p-3 bg-white rounded-md md:flex-1 flex flex-col gap-9'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-[17px]'>Statistics</p>

                                        <div className='flex gap-[2px] items-center'>
                                            <div className='h-[4px] w-[4px] bg-gray-500 rounded-full'></div>
                                            <div className='h-[4px] w-[4px] bg-gray-500 rounded-full'></div>
                                            <div className='h-[4px] w-[4px] bg-gray-500 rounded-full'></div>
                                        </div>
                                    </div>

                                    <div className='px-3 md:px-6 flex justify-between items-center'>
                                        <div>
                                            <p className='text-[13px] text-gray-500 font-semibold'>Total Visits</p>

                                            <p className='text-[#f8538d] text-[13px] font-medium md:text-[18px]'>423,964</p>
                                        </div>
                                        <div>
                                            <p className='text-[13px] text-gray-500 font-semibold'>Paid Visits</p>

                                            <p className='text-[#f8538d] text-[13px] font-medium md:text-[18px]'>7,929</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='p-3 bg-white rounded-md md:flex-1 flex flex-col gap-8'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-[14px] md:text-[23px] font-semibold'>Current Account</p>
                                    </div>

                                    <div className='flex items-center'>
                                        <p className='text-[#2196f3] text-[14px] md:text-[30px] font-medium'>({user ? user?.current_account : 0})</p>
                                    </div>
                                </div>
                                <div className='p-3 bg-white rounded-md md:flex-1 flex flex-col gap-8'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-[14px] md:text-[23px] font-semibold'>Savings Account</p>
                                    </div>

                                    <div className='flex items-center'>
                                        <p className='text-[#2196f3] text-[14px] md:text-[30px] font-medium'>({user ? user?.savings_account : 0})</p>
                                    </div>
                                </div>
                            </div>
                            {/* bottom */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:block">
                <dialog id="loading-modal" className={`modal bg-[#004080] ${loading ? 'opacity-100' : ''}`}>
                    <div className='flex items-center justify-center gap-3'>
                        <span className="loading loading-ring loading-lg bg-white"></span>
                    </div>
                </dialog>
                <div className="px-4">
                    <div>
                        <div className='flex flex-col gap-6'>
                            {/* top */}
                            <div className='flex flex-col md:flex-row gap-6'>
                                {/* top left */}
                                <div className='flex md:flex-[1.6] justify-center md:justify-start items-center'>
                                    <div className='bg-white w-full sm:max-w-sm pb-3 rounded-[13px] flex flex-col'>
                                        <div className='bg-primary relative flex flex-col gap-6 rounded-[13px] px-4 pt-3 pb-[80px]'>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex gap-2 items-center bg-[#00000074] py-1 rounded-[30px] px-2'>
                                                    <div className='w-[40px] h-[40px] rounded-full border-[1px] border-primary'>
                                                        <img src={user?.img} alt="" className='object-cover h-full w-full rounded-full' />
                                                    </div>

                                                    <p className='text-[11px] md:text-[14px] font-medium text-white'>{user?.first_name + " " + user?.last_name}</p>
                                                </div>

                                                <div className='flex items-center justify-center p-3 rounded-[15px] bg-[#00000074]'>
                                                    <FaPlus size={18} color='white' />
                                                </div>
                                            </div>

                                            <div className='flex justify-between items-center'>
                                                <p className='text-white text-[14px]'>Balance:</p>

                                                <p className='text-white text-[14px]'>${formatNumber(user?.balance_current)}</p>
                                            </div>

                                            <div className='flex justify-between absolute bottom-[-20px] left-0 right-0 px-4'>
                                                <div className='bg-white flex flex-col gap-1 w-[40%] shadow-xl p-3 rounded-[8px]'>
                                                    <div className='flex justify-between items-center'>
                                                        <p className='text-[12px] md:text-[14px]'>inflow</p>

                                                        <FaChevronDown size={12} color='green' />

                                                    </div>

                                                    <p className='text-green-500 md:text-[14px] sm:text-[12px] text-[70%]'>${formatNumber(user?.inflow)}</p>
                                                </div>
                                                <div className='bg-white shadow-xl flex flex-col gap-1 w-[40%] p-3 rounded-[8px]'>
                                                    <div className='flex justify-between items-center'>
                                                        <p className='text-[12px] md:text-[14px]'>outflow</p>

                                                        <FaChevronUp size={12} color='red' />

                                                    </div>

                                                    <p className='text-red-500 md:text-[14px] sm:text-[12px] text-[70%]'>${formatNumber(user?.outflow)}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* middle top */}
                                        <div className='mt-10 px-4 flex flex-col gap-2'>
                                            <div className='flex justify-between items-center'>
                                                <p className='text-gray-500 text-[13px] md:text-[14px]'>Loan Balance:</p>

                                                <p className='text-[14px] text-[#805dca]'>${user ? formatNumber(user?.loan_balance) : formatNumber(0)}</p>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <p className='text-gray-500 text-[13px] md:text-[14px]'>Saving Balance:</p>

                                                <p className='text-[#2196f3] text-[14px]'>${user ? formatNumber(user?.balance_savings) : formatNumber(0)}</p>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <p className='text-gray-500 text-[13px] md:text-[14px]'>Current Balance</p>

                                                <p className='text-[#2196f3] text-[14px]'>${user ? formatNumber(user?.balance_current) : formatNumber(0)}</p>
                                            </div>
                                        </div>
                                        {/* middle top */}

                                        <div className='mt-5 px-7 justify-between flex'>
                                            <button className='text-[13px] py-[6px] px-[11px] rounded-[8px] text-[#805dca] bg-[#5c1ac32b] md:text-[14px]'>View Details</button>

                                            <a href='/dashboard/profile' className='text-[13px] py-[6px] px-[11px] rounded-[8px] text-[#009688] bg-[#00968830] md:text-[14px]'>Account Details</a>
                                        </div>
                                    </div>
                                    {/* top left */}
                                </div>



                                {/* top right */}
                                <div className='md:flex-[3]'>
                                    <div className='bg-white rounded-[10px] p-3 flex flex-col gap-4'>
                                        <div className='flex justify-between items-center'>
                                            <p>Transactions</p>

                                            <div className='flex gap-[2px] items-center'>
                                                <div className='h-[4px] w-[4px] bg-gray-500 rounded-full'></div>
                                                <div className='h-[4px] w-[4px] bg-gray-500 rounded-full'></div>
                                                <div className='h-[4px] w-[4px] bg-gray-500 rounded-full'></div>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-6'>
                                            {data?.transactions?.map((data: Transaction, index: any) => (
                                                <div key={data.id} className='flex items-center justify-between'>
                                                    <div className='flex items-center gap-2'>
                                                        <div className='flex items-center justify-center p-3 rounded-[15px] bg-[#BAE7FF]'>
                                                            <FaPlus size={15} color='#2196f3' />
                                                        </div>

                                                        <div className='flex flex-col gap-1'>
                                                            <p className='font-bold text-primary text-[13px]'>{data.fields.type}</p>

                                                            <p className='text-gray-500 text-[13px]'>{formatDate(data.fields.date)}</p>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className={`text-green-500 text-[13px] ${containsTransfer(data.fields.type) ? 'text-red-500' : ''}`}>{containsTransfer(data.fields.type) ? '-$' + formatNumber(data.fields.amount) : '+$' + formatNumber(data.fields.amount)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* top right */}
                            </div>
                            {/* top */}

                            {/* bottom */}
                            <div className=' flex flex-col md:flex-row md:items-center gap-4'>
                                <div className='p-3 bg-white rounded-md md:flex-1 flex flex-col gap-9'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-[17px]'>Statistics</p>

                                        <div className='flex gap-[2px] items-center'>
                                            <div className='h-[4px] w-[4px] bg-gray-500 rounded-full'></div>
                                            <div className='h-[4px] w-[4px] bg-gray-500 rounded-full'></div>
                                            <div className='h-[4px] w-[4px] bg-gray-500 rounded-full'></div>
                                        </div>
                                    </div>

                                    <div className='px-3 md:px-6 flex justify-between items-center'>
                                        <div>
                                            <p className='text-[13px] text-gray-500 font-semibold'>Total Visits</p>

                                            <p className='text-[#f8538d] text-[13px] font-medium md:text-[18px]'>423,964</p>
                                        </div>
                                        <div>
                                            <p className='text-[13px] text-gray-500 font-semibold'>Paid Visits</p>

                                            <p className='text-[#f8538d] text-[13px] font-medium md:text-[18px]'>7,929</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='p-3 bg-white rounded-md md:flex-1 flex flex-col gap-8'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-[14px] md:text-[23px] font-semibold'>Current Account</p>
                                    </div>

                                    <div className='flex items-center'>
                                        <p className='text-[#2196f3] text-[14px] md:text-[30px] font-medium'>({user ? user?.current_account : 0})</p>
                                    </div>
                                </div>
                                <div className='p-3 bg-white rounded-md md:flex-1 flex flex-col gap-8'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-[14px] md:text-[23px] font-semibold'>Savings Account</p>
                                    </div>

                                    <div className='flex items-center'>
                                        <p className='text-[#2196f3] text-[14px] md:text-[30px] font-medium'>({user ? user?.savings_account : 0})</p>
                                    </div>
                                </div>
                            </div>
                            {/* bottom */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Main