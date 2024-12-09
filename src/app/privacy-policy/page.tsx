import FooterB from '@/components/Landing/Footer/FooterB'
import FooterTop from '@/components/Landing/Footer/FooterTop'
import Navbar from '@/components/Landing/Navbar/Navbar'
import PrivacyHero from '@/components/Landing/Privacy/PrivacyHero'
import PrivacyOne from '@/components/Landing/Privacy/PrivacyOne'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
        <div id='home' className="bg-wave-pattern bg-cover bg-center">
            <Navbar />
            <PrivacyHero />
        </div>

        <PrivacyOne />
        <FooterTop />
        <FooterB />

        <Link href='#home'>
        <button className="bg-secondary fixed bottom-4 right-4 h-[30px] w-[30px] flex items-center justify-center rounded-[5px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path></svg>
        </button>
      </Link>
    </div >
  )
}

export default page