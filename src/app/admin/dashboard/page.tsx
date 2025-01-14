import React from 'react'
import AdminDeposits from '@/components/adminDashboard/Deposits/AdminDeposit'
import AdminWithdrawals from '@/components/adminDashboard/Withdrawals/AdminWithdrawals'
import KycApprovals from '@/components/adminDashboard/KYC/KycApproval'

const page = async () => {

  return (
    <div>
      <div className='md:pt-0'>
        <AdminDeposits />
        <AdminWithdrawals />
        <KycApprovals />
      </div>

    </div>
  )
}

export default page