import React from 'react'

const AboutHero = () => {
    return (
        <div className='pt-32 lg:pt-[170px] lg:pb-[100px] pb-[128px] flex items-center' id='home'>
            <div className="mycontainer">
                <div className='px-4 flex-col flex items-center justify-center'>
                    <div className='flex flex-col gap-5 items-center'>
                        <h2 className='text-white text-[30px] hero-text font-bold lg:text-[60px] lg:leading-[4.2rem]'>About</h2>

                        <div className='flex items-center gap-2'>
                            <a href="home" className='flex gap-3 items-center text-white'>Home <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className='h-[20px] w-[20px]'><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path></svg></a>

                            <p className='text-white'>About Us</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutHero