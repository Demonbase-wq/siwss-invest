import React from 'react'

const WIth = () => {
  return (
    <div className='md:pt-6 py-4 h-screen' >
    <div className="mycontainer md:hidden">
        <div className="px-4">
            <div>
                <div className='bg-white rounded-[8px] p-5 flex flex-col gap-14'>
                    <div className=''>
                        <div>
                            <h4 className='font-bold text-[14px] text-primary'>Withdrawal Log</h4>
                            <p className='text-gray-400 text-[12px] font-medium '>You have a total of USD0 Withdrawal</p>
                        </div>

                    </div>

                    <div className='flex items-center justify-center'>
                        <div className='flex items-center justify-center flex-col'>
                            <span className="loading loading-spinner loading-sm bg-primary"></span>
                            <p className='text-gray-500 text-[14px] font-medium'>
                                No Withdrawal Made Yet
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 md:flex-row md:justify-between'>
                        <p className='uppercase text-[12px] text-gray-400 font-medium'>Order Id</p>
                        <p className='uppercase text-[12px] text-gray-400 font-medium'>Amount</p>
                        <p className='uppercase text-primary font-medium text-[12px]'>date</p>
                        <p className='uppercase text-[12px] text-gray-400 font-medium'>Payment Gateway</p>
                        <p className='uppercase text-[12px] text-gray-400 font-medium'>Status</p>
                        <p className='uppercase text-[12px] text-gray-400 font-medium'>Print Invoice</p>
                    </div>

                    <div>
                        <button className='text-[12px] py-2 px-4 font-bold rounded-[8px] text-primary border-[1px] border-primary'>
                        New Withdrawal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="hidden md:block">
        <div className="px-4">
            <div>
                <div className='bg-white rounded-[8px] p-5 flex flex-col gap-14'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h4 className='font-bold text-[14px] text-primary'>Withdrawal Log</h4>
                            <p className='text-gray-400 text-[12px] font-medium '>You have a total of USD0 Withdrawal</p>
                        </div>

                        <div>
                            <button className='text-[12px] py-2 px-4 font-bold rounded-[8px] text-primary border-[2px] border-primary'>
                                New Withdrawal
                            </button>
                        </div>
                    </div>

                    <div className='flex items-center justify-center'>
                        <div className='flex items-center justify-center flex-col'>
                            <span className="loading loading-spinner loading-sm bg-primary"></span>
                            <p className='text-gray-500 text-[14px] font-medium'>
                                No Withdrawal Made Yet
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 md:flex-row md:justify-between border-b-2  pb-2'>
                        <p className='uppercase text-[12px] text-gray-400 font-medium'>Order Id</p>
                        <p className='uppercase text-[12px] text-gray-400 font-medium'>Amount</p>
                        <p className='uppercase text-primary font-medium text-[12px]'>date</p>
                        <p className='uppercase text-[12px] text-gray-400 font-medium'>Payment Gateway</p>
                        <p className='uppercase text-[12px] text-gray-400 font-medium'>Status</p>
                        <p className='uppercase text-[12px] text-gray-400 font-medium'>Print Invoice</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default WIth