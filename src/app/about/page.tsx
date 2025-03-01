
import AboutFour from '@/components/Landing/About/AboutFour'
import AboutHero from '@/components/Landing/About/AboutHero'
import AboutOne from '@/components/Landing/About/AboutOne'
import AboutTwo from '@/components/Landing/About/AboutTwo'
import FooterB from '@/components/Landing/Footer/FooterB'
import FooterTop from '@/components/Landing/Footer/FooterTop'
import Navbar from '@/components/Landing/Navbar/Navbar'
import Link from 'next/link'
import React from 'react'


const page = () => {
  return (
    <div className='bg-[#e2ebf7]'>
      <div id='home' className="bg-wave-pattern bg-cover bg-center">
        <Navbar />
        <AboutHero />
      </div>

      <AboutOne />
      <AboutTwo />
      <AboutFour />
      <FooterTop />
      <FooterB />
      
      <Link href='#home'>
        <button className="bg-primary fixed bottom-4 right-4 h-[30px] w-[30px] flex items-center justify-center rounded-[5px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path></svg>
        </button>
      </Link>
    </div>
  )
}

export default page