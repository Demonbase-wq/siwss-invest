import React from 'react'
import { FiHelpCircle } from "react-icons/fi";


const HelpDesk = () => {
    return (
        <div className='py-4'>
            <div className="mycontainer">
                <div className="px-4">
                    <div>
                        <div className='flex flex-col gap-6'>
                            <div className='bg-primary text-center py-[67px]'>
                                <h3 className='text-[25px] text-white md:text-[30px] lg:text-[46px]'>Helpdesk</h3>
                                <p className='text-[15px] md:text-[17px] text-white'>What can we help you with today?</p>
                            </div>

                            <div className='flex flex-col gap-5'>
                                <div className="collapse bg-white">
                                    <input type="radio" name="my-accordion-1" defaultChecked />
                                    <div className="collapse-title text-xl font-medium flex gap-3 items-center">
                                        <FiHelpCircle color='#004080' />
                                        <p className='text-primary text-[13px] lg:text-[18px]'>Get started</p></div>
                                    <div className="collapse-content">
                                        <p className='text-primary text-[13px]'>How to register an account</p>
                                    </div>
                                </div>
                                <div className="collapse bg-white">
                                    <input type="radio" name="my-accordion-1" />
                                    <div className="collapse-title text-xl font-medium flex gap-3 items-center">
                                        <FiHelpCircle color='#004080' />
                                        <p className='text-primary text-[13px] lg:text-[18px]'>How to send wire transfer</p></div>
                                    <div className="collapse-content">
                                        <p className='text-primary text-[13px]'>

                                            When sending wire transfer, u need to ....... soooooooo
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HelpDesk