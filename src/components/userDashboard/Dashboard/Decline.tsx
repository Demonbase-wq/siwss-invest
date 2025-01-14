'use client'

import Link from "next/link"

const Decline = () => {
    return (
        <div className='md:pt-6 pt-6 pb-[600px] md:pb-0'>
            <div className="mycontainer md:hidden">
                <div className="px-4">
                    <div>
                        <div className='text-red-800 text-[14px] lg:text-[16px] bg-red-100 p-3 rounded-lg border-[1px] border-red-800'>
                            Alert! Your KYC has been declined, Please upload new KYC documents to proceed. <Link href='/dashboard/kyc-details'>go to kyc page</Link> </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:block">
                <div className="px-4">
                    <div>
                        <div className='text-red-800 text-[14px] lg:text-[16px] bg-red-100 p-3 rounded-lg border-[1px] border-red-800'>
                        Alert! Your KYC has been declined, Please upload new KYC documents to proceed. <Link href='/dashboard/kyc-details' className="underline">go to kyc page</Link></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Decline