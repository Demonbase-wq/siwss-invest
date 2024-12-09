import React from 'react'
import KycPending from '@/components/userDashboard/Dashboard/KycPending'
import KYC from '@/components/Kyc/KycDetails'
import { auth } from '../../../../auth'

const page = async () => {
  const session = await auth()

  return (
    <div>
      {session?.user.kyc_pending === 'YES' ? <div className=' pt-16 md:pt-0 '><KycPending /></div> : <div className=' pt-16 md:pt-0'>
        <KYC />
      </div>}

    </div>
  )
}

export default page