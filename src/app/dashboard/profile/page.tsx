import Profile from '@/components/userDashboard/Profile/Profile'
import React from 'react'

const page = () => {
  return (
    <div className="container mx-auto md:pl-12 lg:pl-0 px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Account Information</h1>
    <Profile />
  </div>
  )
}

export default page