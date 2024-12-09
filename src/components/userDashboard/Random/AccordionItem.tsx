"use client"
import { useState, useRef } from 'react';
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";
import { SiDepositphotos } from "react-icons/si";
import { IoMdTime } from "react-icons/io";
import { FaCreditCard } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbFileReport } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import { IoHome } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";
import { useSession } from 'next-auth/react';
interface AccordionItemProps {
    icon: React.ReactNode,
    title: string,
    content: React.ReactNode,
}

const AccordionItem: React.FC<AccordionItemProps> = ({ icon, title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="">
            <button
                className="w-full text-left flex justify-between items-center focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className='flex items-center p-2 w-full justify-between rounded-[5px] gap-4 bg-[#00000074]'>
                    <div className='flex items-center gap-3'>
                        {icon}
                        <span className="text-white">{title}</span>
                    </div>

                    <span className='text-white'>{isOpen ? <FaChevronUp color='white' /> : <FaChevronDown color='white' />}</span>
                </div>
            </button>
            <div
                ref={contentRef}
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{
                    maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
                }}
            >
                <div className="p-2">{content}</div>
            </div>
        </div>
    );
};

const Accordion: React.FC = () => {
    const user = useSession().data?.user;

    const deposit = { icon: <SiDepositphotos color='white' />, title: 'Deposit Money', content: (<ul className='list-disc pl-10 flex flex-col gap-2'><li className='hover:text-accent transition-all ease-in-out duration-[0.2s] text-white'><a href="/dashboard/check-deposit">Check Deposit</a></li> <li className='hover:text-accent transition-all ease-in-out duration-[0.2s] text-white'><a href="/dashboard/crypto-deposit">Mobile Deposit</a></li></ul>) }

    const loans = { icon: <IoMdTime color='white' />, title: 'Loans/Mortgages', content: (<ul className='list-disc pl-10 flex flex-col gap-2'><li className='hover:text-accent transition-all ease-in-out duration-[0.2s] text-white'><a href="/dashboard/add-loan">New Loans</a></li> <li className='hover:text-accent transition-all ease-in-out duration-[0.2s] text-white'><a href="/dashboard/loans">My Loans</a></li></ul>) }

    const savings = { icon: <FaCreditCard color='white' />, title: 'Savings', content: (<ul className='list-disc pl-10 flex flex-col gap-2'><li className='hover:text-accent transition-all ease-in-out duration-[0.2s] text-white'><a href="/dashboard/add-savings">New Savings</a></li> <li className='hover:text-accent transition-all ease-in-out duration-[0.2s] text-white'><a href="/dashboard/savings">My Savings</a></li></ul>) }
    const profile = { icon: <VscAccount color='white' />, title: 'My Account', content: (<ul className='list-disc pl-10 flex flex-col gap-2'><li className='hover:text-accent transition-all ease-in-out duration-[0.2s] text-white'><a href="/dashboard/profile">Profile</a></li><li className={`hover:text-accent transition-all ease-in-out duration-[0.2s] text-white ${user?.isApproved === 'YES' ? 'hidden' : ''}`}><a href="/dashboard/kyc-details">Kyc</a></li><li className='hover:text-accent transition-all ease-in-out duration-[0.2s] text-white'><a href="/dashboard/settings">Settings</a></li></ul>) }

    const transfer = { icon: <FaMoneyBillTransfer color='white' />, title: 'Transfer Money', content: (<ul className='list-disc pl-10 flex flex-col gap-2'><li className='hover:text-accent transition-all ease-in-out duration-[0.2s] text-white'><a href="/dashboard/transfer/local">Domestic Transfer</a></li> <li className='hover:text-accent transition-all ease-in-out duration-[0.2s] text-white'><a href="/dashboard/transfer/international">Wire Transfer</a></li> <li className='hover:text-accent transition-all ease-in-out duration-[0.2s] text-white'><a href="/dashboard/transfer/other">Other Transfer</a></li></ul>) }

    const help = { icon: <FiHelpCircle color='white' />, title: 'Need Help?', content: (<ul className='list-disc pl-10 flex flex-col gap-2'><li className='hover:text-accent transition-all ease-in-out duration-[0.2s] text-white'><a href="/dashboard/add-ticket">New ticket</a></li> <li className='hover:text-accent transition-all ease-in-out duration-[0.2s] text-white'><a href="/dashboard/tickets">View tickets</a></li> <li className='hover:text-accent transition-all ease-in-out duration-[0.2s] text-white'><a href="/dashboard/help">help desk</a></li></ul>) }



    return (
        <div className="flex flex-col gap-3 mt-10">
            <div className='p-2 rounded-[5px] bg-[#00000074]'>
                <a href="/dashboard">
                    <div className='flex items-center gap-3'>
                        <IoHome color='white' />

                        <p className='text-white'>Dashboard</p>
                    </div>
                </a>
            </div>
            <AccordionItem icon={deposit.icon} title={deposit.title} content={deposit.content} />
            <AccordionItem icon={transfer.icon} title={transfer.title} content={transfer.content} />
            <div className='p-2 rounded-[5px] gap-4 bg-[#00000074]'>
                <a href="/dashboard/card">
                    <div className='flex items-center gap-3'>
                        <FaCreditCard color='white' />

                        <p className='text-white'>Credit Cards</p>
                    </div>
                </a>
            </div>
            <AccordionItem icon={loans.icon} title={loans.title} content={loans.content} />
            <AccordionItem icon={savings.icon} title={savings.title} content={savings.content} />
            <div className='p-2 rounded-[5px] gap-4 bg-[#00000074]'>
                <a href="/dashboard/statements">
                    <div className='flex items-center gap-3'>
                        <TbFileReport color='white' />

                        <p className='text-white'>Bank Statement</p>
                    </div>
                </a>
            </div>
            <AccordionItem icon={profile.icon} title={profile.title} content={profile.content} />
            <AccordionItem icon={help.icon} title={help.title} content={help.content} />

        </div>
    );
};

export default Accordion;
