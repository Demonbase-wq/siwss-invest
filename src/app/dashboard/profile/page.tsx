'use client'
import Profile from '@/components/userDashboard/Profile/Profile'
import { useTranslation } from '@/translations/provider';
import React from 'react'

const page = () => {
  const { translations } = useTranslation();
  return (
    <div className="container mx-auto md:pl-12 lg:pl-0 px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">{translations?.dashboardAccount?.text1}</h1>
    <Profile />
  </div>
  )
}

export default page