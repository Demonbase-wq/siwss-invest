'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { GiCancel } from 'react-icons/gi';
import { GrStatusGood } from 'react-icons/gr';
import useSWR from 'swr';

interface FormData {
    details: string;
    type: string;
    pincode: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Ticketform: React.FC = () => {
    const { data: user } = useSWR("/api/get-user", fetcher);
    const { register, handleSubmit, reset } = useForm<FormData>();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const onSubmit: SubmitHandler<FormData> = async data => {
        const modal = document.getElementById("ticket-modal") as HTMLDialogElement | null;
        const loadingModal = document.getElementById("loading-modal") as HTMLDialogElement | null;

        loadingModal?.showModal();
        setLoading(true);

        if (data.pincode.length < 6) {
            setError('Pincode must be 6 digits or more');
            loadingModal?.close();
            modal?.showModal();
            setTimeout(() => {
                modal?.close();
                setError('');
            }, 2500);
            setLoading(false);
            return;
        }

        if (data.pincode !== user?.pincode) {
            setError('Incorrect Pincode');
            loadingModal?.close();
            modal?.showModal();
            setTimeout(() => {
                modal?.close();
                setError('');
            }, 2500);
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post('https://crest-bank.vercel.app/api/new-ticket', data);

            if (res.status === 200) {
                setSuccess('Your request is currently being reviewed');
                loadingModal?.close();
                modal?.showModal();
                setTimeout(() => {
                    modal?.close();
                    setSuccess('');
                    reset();
                }, 2500);
                setLoading(false);
            }
        } catch (error) {
            setError(`Couldn't add new ticket`);
            loadingModal?.close();
            modal?.showModal();
            setTimeout(() => {
                modal?.close();
                setError('');
            }, 2500);
            setLoading(false);
        }
    }

    return (
        <div className='py-4'>
            <div className="mycontainer">
                <div className="px-4">
                    <div>
                        <dialog id="ticket-modal" className="modal">
                            <div className="modal-box bg-white">
                                {error && <div className='flex items-center justify-center gap-3'>
                                    <GiCancel size={40} color='#ef4444' />
                                    <p className='text-red-500'>{error}</p>
                                </div>}
                                {success && <div className='flex items-center justify-center gap-3'>
                                    <GrStatusGood size={40} color='#22c55e' />
                                    <p className='text-green-500'>{success}</p>
                                </div>}
                            </div>
                        </dialog>

                        <dialog id="loading-modal" className="modal bg-[#004080]">
                            <div className='flex items-center justify-center gap-3'>
                                <span className="loading loading-ring loading-lg bg-white"></span>
                            </div>
                        </dialog>

                        <div className=' flex flex-col gap-4  md:max-w-md md:my-0 md:mx-auto bg-white p-8 rounded shadow-md w-full max-w-md'>
                            <div>
                                <p className='text-2xl font-bold mb-6 text-primary'>New Ticket</p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <p className=''>Ticket Type</p>
                                    <select {...register('type', { required: true })} className='w-full p-2 border rounded bg-[#e2ebf7]'>
                                        <option value="" defaultChecked>Select Ticket Type</option>
                                        <option value="Account">My Account</option>
                                        <option value="Transfer">Transfer</option>
                                        <option value="Security">Security</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className=''>More information</p>
                                    <textarea {...register('details', { required: true })} rows={8} placeholder='Well detailed' className='w-full p-2 border rounded bg-[#e2ebf7]'></textarea>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className=''>Account Pincode</p>
                                    <input type="text" {...register('pincode', { required: true })} placeholder='*****' className='w-full p-2 border rounded bg-[#e2ebf7]' />
                                </div>
                                <div>
                                    <button type="submit" className='text-[13px] text-white bg-primary p-[10px] rounded-md'>
                                        {loading ? <span className="loading loading-spinner loading-sm bg-white"></span>
                                            : "Create new ticket"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ticketform
