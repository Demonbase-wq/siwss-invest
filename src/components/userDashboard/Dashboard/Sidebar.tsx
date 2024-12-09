'use client'
import { IoIosHome } from "react-icons/io";
import { BiMoneyWithdraw } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { PiHandDepositFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import Image from "./Image";
import Accordion from "../Random/AccordionItem";
import LogoutDesktop from "./LogoutDesktop";
import { useState } from "react";



const Sidebar = () => {
    const [active, setActive] = useState(false)

    const menuItems = [
        { name: 'Home', path: '/dashboard', icon: <IoIosHome size={30} color='white' /> },
        { name: 'Transfer', path: '/dashboard/transfer', icon: <FaMoneyBillTransfer size={30} color='white' /> },
        { name: 'Withdraw', path: '/dashboard/withdraw', icon: <BiMoneyWithdraw size={30} color='white' /> },
        { name: 'Deposit', path: '/dashboard/deposit', icon: <PiHandDepositFill size={30} color='white' /> },
        { name: 'Profile', path: '/dashboard/profile', icon: <CgProfile size={30} color='white' /> },
        { name: 'Settings', path: '/dashboard/settings', icon: <IoSettings size={30} color='white' /> },
    ];


    return (
        <div className=''>
            <div
                className={`transition-all bg-[#0c2243] md:hidden duration-300 fixed top-0 z-30 w-full`}
            >
                <div className="mycontainer">
                    <div
                        className={`navbar`}
                    >
                        <div className="navbar-start z-50">
                            <div className="lg:h-[50px] lg:w-[65px] h-[45px] w-[55px]">
                                <a href="/">
                                    <img
                                        src="/crest.png"
                                        alt="logo"
                                        className="h-full w-full object-cover"
                                    />
                                </a>
                            </div>
                        </div>



                        <div className="navbar-end flex items-center gap-2 md:hidden">
                            <div className="dropdown">
                                <div className="avatar online cursor-pointer" 
                                    onClick={() => setActive(!active)}
                                >
                                    <Image />
                                </div>


                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`z-50 md:sticky md:top-0 hidden md:block md:h-screen bg-primary overflow-y-scroll`}>
                <div className="flex relative flex-col h-full">
                    <div className="flex items-center justify-center py-4 bg-primary text-white">
                        <img src="/crest.png" alt="" className='w-[60px]' />
                    </div>
                    


                    <div className="flex flex-col gap-3">
                        <div className="px-5">
                            <Accordion />
                        </div>

                        <div className="px-5">
                            <LogoutDesktop />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`flex md:hidden pb-4 flex-col gap-3 w-[80%] transition-all ease-in-out duration-[0.3s]  fixed top-0 left-0 h-screen z-40 bg-primary overflow-scroll ${active ? 'translate-x-0' : "-translate-x-[800px]" }`}>
                <button  onClick={() => setActive(!active)} className="cursor-pointer flex items-center justify-end px-5 pt-3 text-white font-bold">
                    X
                </button>

                <div className="px-5">
                    <Accordion />
                </div>

                <div className="px-5">
                    <LogoutDesktop />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
