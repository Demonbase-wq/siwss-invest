import Main from '@/components/userDashboard/Dashboard/Main'
import React from 'react'
import { auth } from '../../../auth'
import Pending from '@/components/userDashboard/Dashboard/Pending'

const page = async () => {
  const session = await auth()

  return (
    <div>
      {session?.user.isApproved === 'NO' ? <div className=' pt-16 md:pt-0 '><Pending /></div> : <div className=' pt-16 md:pt-0'>
        <Main />
      </div>}

    </div>
  )
}

export default page