'use client'
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Profile = () => {
    const { data, error } = useSWR("/api/get-user", fetcher);
    const [updateError, setUpdateError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(true);
    const inputFileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (data) {
            setModal(false)
        }
    }, [data]);

    const [userDetails, setUserDetails] = useState({
        first_name: '',
        last_name: '',
        dob: '',
        img: '',
        phone: '',
        email: '',
        country: '',
        state: '',
        address: '',
        timestamp: Date.now(), // Add a timestamp field
    });

    useEffect(() => {
        if (data) {
            setUserDetails({
                first_name: data?.first_name || '',
                last_name: data?.last_name || '',
                dob: data?.dob || '',
                phone: data?.phone || '',
                email: data?.email || '',
                country: data?.country || '',
                state: data?.state || '',
                address: data?.address || '',
                img: data?.img || '',
                timestamp: Date.now(), // Update the timestamp
            });
        }
    }, [data]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleImageUpload = async (): Promise<string | null> => {
        if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
        }

        const file = inputFileRef.current.files[0];

        const response = await fetch(
            `/api/upload-image?filename=${file.name}`,
            {
                method: 'POST',
                body: file,
            }
        );

        const newBlob = await response.json();
        return newBlob?.url ?? null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            let newImageUrl: string | null = null;

            if (inputFileRef.current?.files?.length) {
                newImageUrl = await handleImageUpload();

                if (newImageUrl) {
                    const res = await fetch(`/api/delete-image?filename=${userDetails.img}`, {
                        method: 'DELETE',
                    });

                    if (!res.ok) {
                        setUpdateError('Failed to delete old image. Please try again.');
                        setLoading(false);
                        return;
                    }
                }
            }

            const updatedDetails = {
                ...userDetails,
                img: newImageUrl ?? userDetails.img,
                timestamp: Date.now(),
            };

            setUserDetails(updatedDetails);

            const response = await axios.post('/api/update-user', updatedDetails);
            if (response.data.error) {
                setUpdateError(response.data.error);
            } else {
                setSuccess('Account updated successfully');
                setLoading(false);
                setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    timestamp: Date.now(),
                }));
                mutate("/api/get-user");
            }
        } catch (error) {
            console.log(error);
            setUpdateError('An error occurred while updating the profile.');
            setLoading(false);
        }
    };

    return (
        <div className='md:pt-6 py-4'>
            <div className="mycontainer md:hidden">
                <div className="px-4">
                    <div>
                        <dialog id="loading-modal" className={`modal bg-[#004080] ${modal ? 'opacity-100' : ''}`}>
                            <div className='flex items-center justify-center gap-3'>
                                <span className="loading loading-ring loading-lg bg-white"></span>
                            </div>
                        </dialog>
                        <div className='bg-white rounded-[8px] p-4 flex flex-col gap-5'>
                            <div>
                                <h4 className='text-primary font-bold text-[14px]'>Account Information</h4>
                                <p className='text-gray-400 font-medium text-[12px]'>Change your account setting</p>
                            </div>

                            <div>
                                <h4 className='font-bold text-[14px]'>Customer Info:</h4>
                            </div>

                            <div className='flex flex-col gap-4'>
                                <div className='w-[120px] h-[120px] rounded-full'>
                                    <img src={`${userDetails.img}?timestamp=${userDetails.timestamp}`} alt="img" className='w-full h-full object-cover rounded-full' />
                                </div>

                                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>First Name</label>
                                        <div>
                                            <input type="text" name='first_name' className='bg-[#e2ebf7] w-full p-1 rounded-[4px] pl-3 text-[14px] focus:outline-none' value={userDetails.first_name} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>Last Name</label>
                                        <div>
                                            <input type="text" name='last_name' value={userDetails.last_name} onChange={handleInputChange} className='bg-[#e2ebf7] w-full p-1 rounded-[4px] pl-3 text-[14px] focus:outline-none' />
                                        </div>
                                    </div >

                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>Profile Picture</label>
                                        <div>
                                            <input type="file" ref={inputFileRef} className='bg-[#e2ebf7] w-full p-1 rounded-[4px] pl-3 text-[14px] focus:outline-none' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>Date of Birth</label>
                                        <div>
                                            <input type="date" name='dob' value={userDetails.dob} onChange={handleInputChange} className='bg-[#e2ebf7] w-full p-1 rounded-[4px] px-2 text-[14px] focus:outline-none' />
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className='font-bold text-[14px]'>Contact Info:</h4>
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>Contact Phone</label>
                                        <div>
                                            <input type="text" name='phone' value={userDetails.phone} onChange={handleInputChange} className='bg-[#e2ebf7] w-full p-1 rounded-[4px] pl-3 text-[14px] focus:outline-none' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>Email Address</label>
                                        <div>
                                            <input type="email" name='email' value={userDetails.email} onChange={handleInputChange} className='bg-[#e2ebf7] w-full p-1 rounded-[4px] pl-3 text-[14px] focus:outline-none' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>Country</label>
                                        <div>
                                            <input type="text" name='country' value={userDetails.country} onChange={handleInputChange} className='bg-[#e2ebf7] w-full p-1 rounded-[4px] pl-3 text-[14px] focus:outline-none' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>State</label>
                                        <div>
                                            <input type="text" name='state' value={userDetails.state} onChange={handleInputChange} className='bg-[#e2ebf7] w-full p-1 rounded-[4px] pl-3 text-[14px] focus:outline-none' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>Address</label>
                                        <div>
                                            <input type="text" name='address' value={userDetails.address} onChange={handleInputChange} className='bg-[#e2ebf7] w-full p-1 rounded-[4px] text-[14px] focus:outline-none' />
                                        </div>
                                    </div>

                                    <div className='flex gap-4 mt-3'>
                                        <button type='submit' className='bg-secondary py-1 text-[14px] px-3 rounded-[5px] text-white bottom-0 outline-none flex items-center justify-center w-[90px]'>
                                            {loading ? <span className="loading loading-spinner loading-sm bg-white"></span>
                                                : "Update"}
                                        </button>

                                        <button className='bg-accent w-[90px] py-1 text-[14px] px-3 rounded-[5px] text-white  bottom-0 outline-none'>
                                            Cancel
                                        </button>
                                    </div>

                                    <div>
                                        {updateError && <p className="text-red-500">{updateError}</p>}
                                        {success && <p className="text-green-500">{success}</p>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden md:block">
                <div className="px-4">
                    <div>
                        <dialog id="loading-modal" className={`modal bg-[#004080] ${modal ? 'opacity-100' : ''}`}>
                            <div className='flex items-center justify-center gap-3'>
                                <span className="loading loading-ring loading-lg bg-white"></span>
                            </div>
                        </dialog>
                        <div className='bg-white rounded-[8px] p-4 flex flex-col gap-5'>
                            <div>
                                <h4 className='text-primary font-bold text-[14px]'>Account Information</h4>
                                <p className='text-gray-400 font-medium text-[12px]'>Change your account setting</p>
                            </div>

                            <div>
                                <h4 className='font-bold text-[14px]'>Customer Info:</h4>
                            </div>

                            <div className='flex flex-col gap-4'>
                                <div className='w-[120px] h-[120px] rounded-full'>
                                    <img src={`${userDetails.img}?timestamp=${userDetails.timestamp}`} alt="" className='w-full h-full object-cover rounded-full' />
                                </div>

                                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>First Name</label>
                                        <div>
                                            <input type="text" name='first_name' className='bg-[#e2ebf7] p-1 rounded-[4px] pl-3 w-[60%] text-[14px] focus:outline-none' value={userDetails.first_name} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>Last Name</label>
                                        <div>
                                            <input type="text" name='last_name' value={userDetails.last_name} onChange={handleInputChange} className='bg-[#e2ebf7]  p-1 w-[60%] rounded-[4px] pl-3 text-[14px] focus:outline-none' />
                                        </div>
                                    </div >
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>Profile Picture</label>
                                        <div>
                                            <input type="file" ref={inputFileRef} className='bg-[#e2ebf7] w-[60%] p-1 rounded-[4px] pl-3 text-[14px] focus:outline-none' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>Date of Birth</label>
                                        <div>
                                            <input type="date" name='dob' value={userDetails.dob} onChange={handleInputChange} className='bg-[#e2ebf7] w-[60%] p-1 rounded-[4px] px-2 text-[14px] focus:outline-none' />
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className='font-bold text-[14px]'>Contact Info:</h4>
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>Contact Phone</label>
                                        <div>
                                            <input type="text" name='phone' value={userDetails.phone} onChange={handleInputChange} className='bg-[#e2ebf7] w-[60%] p-1 rounded-[4px] pl-3 text-[14px] focus:outline-none' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>Email Address</label>
                                        <div>
                                            <input type="email" name='email' value={userDetails.email} onChange={handleInputChange} className='bg-[#e2ebf7] w-[60%] p-1 rounded-[4px] pl-3 text-[14px] focus:outline-none' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>Country</label>
                                        <div>
                                            <input type="text" name='country' value={userDetails.country} onChange={handleInputChange} className='bg-[#e2ebf7] w-[60%] p-1 rounded-[4px] pl-3 text-[14px] focus:outline-none' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>State</label>
                                        <div>
                                            <input type="text" name='state' value={userDetails.state} onChange={handleInputChange} className='bg-[#e2ebf7] w-[60%] p-1 rounded-[4px] pl-3 text-[14px] focus:outline-none' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[13px] font-medium'>Address</label>
                                        <div>
                                            <input type="text" name='address' value={userDetails.address} onChange={handleInputChange} className='bg-[#e2ebf7] w-[70%] p-1 rounded-[4px] text-[14px] focus:outline-none' />
                                        </div>
                                    </div>

                                    <div className='flex gap-4 mt-3'>
                                        <button type='submit' className='bg-secondary py-1 text-[14px] px-3 rounded-[5px] text-white bottom-0 outline-none w-[90px] flex items-center justify-center'>
                                            {loading ? <span className="loading loading-spinner loading-sm bg-white"></span>
                                                : "Update"}
                                        </button>

                                        <button className='bg-accent py-1 w-[90px] text-[14px] px-3 rounded-[5px] text-white  bottom-0 outline-none'>
                                            Cancel
                                        </button>
                                    </div>

                                    <div>
                                        {updateError && <p className="text-red-500">{updateError}</p>}
                                        {success && <p className="text-green-500">{success}</p>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
