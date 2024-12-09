'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { GiCancel } from 'react-icons/gi';
import { GrStatusGood } from 'react-icons/gr';

const Settings = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyNewPassword, setVerifyNewPassword] = useState('');
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [verifyNewPasswordVisible, setVerifyNewPasswordVisible] = useState(false);
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');


    const handlePasswordChangeRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (newPassword !== verifyNewPassword) {
            setError('New passwords do not match');
            setLoading(false)
            const modal = document.getElementById(
                "my_modal_1"
            ) as HTMLDialogElement | null;
            if (modal) {
                modal.showModal()
            }
            setTimeout(() => {
                modal?.close();
            }, 2500);
            return;
        }

        try {
            const response = await axios.post('/api/request-password-change', {
                currentPassword,
                newPassword,
            });

            if (response.data.error) {
                setError(response.data.error);
                setLoading(false)
                const modal = document.getElementById(
                    "my_modal_1"
                ) as HTMLDialogElement | null;
                if (modal) {
                    modal.showModal()
                }
                setTimeout(() => {
                    modal?.close();
                }, 2500);
            } else {
                setSuccess('Verification code sent to your email');
                setLoading(false)
                const modal = document.getElementById(
                    "my_modal_1"
                ) as HTMLDialogElement | null;
                if (modal) {
                    modal.showModal()
                }
                setTimeout(() => {
                    modal?.close();
                    setStep(2);
                }, 2500);
            }
        } catch (error) {
            setError('An error occurred while updating the password');
            setLoading(false)
            const modal = document.getElementById(
                "my_modal_1"
            ) as HTMLDialogElement | null;
            if (modal) {
                modal.showModal()
            }
            setTimeout(() => {
                modal?.close();
                setCurrentPassword('')
                setNewPassword('')
                setVerifyNewPassword('')
            }, 2500);
        }
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/api/verify-password-change', {
                verificationCode,
                newPassword,
            });

            if (response.data.error) {
                setError(response.data.error);
                setLoading(false)
                const modal = document.getElementById(
                    "my_modal_1"
                ) as HTMLDialogElement | null;
                if (modal) {
                    modal.showModal()
                }
                setTimeout(() => {
                    modal?.close();
                }, 2500);
            } else {
                setSuccess('Password updated successfully');
                setStep(1);
                setCurrentPassword('');
                setNewPassword('');
                setVerifyNewPassword('');
                setVerificationCode('');
                setLoading(false)
                const modal = document.getElementById(
                    "my_modal_1"
                ) as HTMLDialogElement | null;
                if (modal) {
                    modal.showModal()
                }
                setTimeout(() => {
                    modal?.close();
                }, 2500);
            }
        } catch (error) {
            setError('An error occurred while verifying the code');
            setLoading(false);
            const modal = document.getElementById(
                "my_modal_1"
            ) as HTMLDialogElement | null;
            if (modal) {
                modal.showModal()
            }
            setTimeout(() => {
                modal?.close();
            }, 2500);
            setCurrentPassword('');
            setNewPassword('');
            setVerifyNewPassword('');
            setVerificationCode('');
        }
    };



    return (
        <div className='md:pt-6 py-4'>
            <div className="mycontainer">
                <div className="px-4">
                    <div>
                        <div className='flex flex-col gap-7 bg-white p-4 rounded-[8px]'>
                            <div>
                                <h4 className='font-bold text-primary tex-[14px]'>Change Password</h4>
                                <p className='text-gray-400 text-[12px]'>change your account password</p>
                            </div>

                            <div className='p-4 text-[14px] rounded-[8px] bg-red-200 text-red-500'>
                                Configure your password to a strong one. you may need the passwords to carry out some transactions on the system suspicious actions with the password might inadvertently get you locked out of the system!
                            </div>

                            <dialog id="my_modal_1" className="modal">
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


                            <div>
                                {step === 1 && (
                                    <form onSubmit={handlePasswordChangeRequest} className='flex flex-col gap-3' >
                                        <div className='relative flex flex-col gap-3'>
                                            <label className='text-gray-400 text-[14px]'>Current Password</label>
                                            <div>
                                                <input
                                                    type={currentPasswordVisible ? 'text' : 'password'}
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    required
                                                    className='w-full md:w-[60%] p-2 bg-[#e2ebf7] focus:outline-none rounded-[5px] text-[14px]'
                                                />
                                            </div>

                                            <span
                                                className="absolute top-[45px] md:right-[415px] right-0 pr-3 flex items-center cursor-pointer"
                                                onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
                                            >
                                                <FontAwesomeIcon icon={currentPasswordVisible ? faEyeSlash : faEye} />
                                            </span>


                                        </div>
                                        <div className='relative flex flex-col gap-3'>
                                            <label className='text-gray-400 text-[14px]'>New Password</label>
                                            <div>
                                                <input
                                                    type={newPasswordVisible ? 'text' : 'password'}
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
                                                    className='w-full md:w-[60%] p-2 bg-[#e2ebf7] focus:outline-none rounded-[5px] text-[14px]'
                                                />
                                            </div>
                                            <span
                                                className="absolute top-[45px]  md:right-[415px] right-0 pr-3 flex items-center cursor-pointer"
                                                onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                                            >
                                                <FontAwesomeIcon icon={newPasswordVisible ? faEyeSlash : faEye} />
                                            </span>
                                        </div>
                                        <div className='relative flex flex-col gap-3'>
                                            <label className='text-gray-400 text-[14px]'>Verify New Password</label>
                                            <div>
                                                <input
                                                    type={verifyNewPasswordVisible ? 'text' : 'password'}
                                                    value={verifyNewPassword}
                                                    onChange={(e) => setVerifyNewPassword(e.target.value)}
                                                    required
                                                    className='w-full md:w-[60%] p-2 bg-[#e2ebf7] focus:outline-none rounded-[5px] text-[14px]'
                                                />
                                            </div>

                                            <span
                                                className="absolute  md:right-[415px] top-[45px] right-0 pr-3 flex items-center cursor-pointer"
                                                onClick={() => setVerifyNewPasswordVisible(!verifyNewPasswordVisible)}
                                            >
                                                <FontAwesomeIcon icon={verifyNewPasswordVisible ? faEyeSlash : faEye} />
                                            </span>
                                        </div>

                                        <div className='flex gap-4 mt-3'>
                                            <button type='submit' className='bg-secondary py-1 text-[14px] px-3 rounded-[5px] text-white flex items-center justify-center w-[90px] bottom-0 outline-none'>
                                                {loading ? <span className="loading loading-spinner loading-sm bg-white"></span>
                                                    : "Update"}
                                            </button>

                                            <button className='bg-accent w-[90px] py-1 text-[14px] px-3 rounded-[5px] text-white  bottom-0 outline-none'>
                                                Cancel
                                            </button>
                                        </div>

                                        <dialog id="my_modal_1" className="modal">
                                            <div className="modal-box">
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
                                    </form>
                                )}
                                {step === 2 && (
                                    <form onSubmit={handleVerifyCode} className='flex flex-col gap-3' >
                                        <div className='relative flex flex-col gap-3'>
                                            <label className='text-gray-400 text-[14px]'>Verification Code</label>
                                            <div>
                                                <input
                                                    type='text'
                                                    value={verificationCode}
                                                    onChange={(e) => setVerificationCode(e.target.value)}
                                                    required
                                                    className='w-full md:w-[60%] p-2 bg-[#e2ebf7] focus:outline-none rounded-[5px] text-[14px]'
                                                />
                                            </div>
                                        </div>

                                        <div className='flex gap-4 mt-3'>
                                            <button type='submit' className='bg-secondary py-1 text-[14px] px-3 rounded-[5px] text-white flex items-center justify-center w-[90px] bottom-0 outline-none'>
                                                {loading ? <span className="loading loading-spinner loading-sm bg-white"></span>
                                                    : "Verify"}
                                            </button>

                                            <button className='bg-accent w-[90px] py-1 text-[14px] px-3 rounded-[5px] text-white  bottom-0 outline-none'>
                                                Cancel
                                            </button>
                                        </div>

                                        <dialog id="my_modal_1" className="modal">
                                            <div className="modal-box">
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
                                    </form>
                                )}

                            </div>


                            <div className='flex md:hidden flex-col gap-4'>
                                <div>
                                    <h4 className='text-primary font-bold text-[14px]'>Security:</h4>
                                </div>

                                <div className='flex flex-col gap-3 md:flex-row md:items-center'>
                                    <div>
                                        <p>2FA Login verification: </p>
                                    </div>

                                    <div className='flex flex-col gap-3'>
                                        <button className='bg-[#6faae5] font-medium text-[14px] rounded-[5px] p-2 text-primary'>
                                            Activate Login Verification
                                        </button>
                                        <p className='text-gray-400 text-[13px]'>After you log in you will be asked for additional information to confirm your identity and protect your account from being compromised.</p>
                                    </div>
                                </div>
                            </div>

                            <div className='md:flex hidden flex-col gap-4'>
                                <div>
                                    <h4 className='text-primary font-bold text-[14px]'>Security:</h4>
                                </div>

                                <div className='flex flex-col gap-3'>
                                    <div className='flex gap-4 items-center'>
                                        <p>2FA Login verification: </p>
                                        <button className='bg-[#a1cefb] w-[21%] font-medium text-[14px] rounded-[5px] p-2 text-primary'>
                                            Activate Login Verification
                                        </button>
                                    </div>

                                    <div className='flex flex-col gap-3'>

                                        <p className='text-gray-400 text-[13px]'>After you log in you will be asked for additional information to confirm your identity and protect your account from being compromised.</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>


            <div className="hidden ">
                <div className="px-4">
                    <div>
                        <div className='flex flex-col gap-7 bg-white p-4 rounded-[8px]'>
                            <div>
                                <h4 className='font-bold text-primary tex-[14px]'>Change Password</h4>
                                <p className='text-gray-400 text-[12px]'>change your account password</p>
                            </div>

                            <div className='p-4 text-[14px] rounded-[8px] bg-red-200 text-red-500'>
                                Configure your password to a strong one. you may need the passwords to carry out some transactions on the system suspicious actions with the password might inadvertently get you locked out of the system!
                            </div>

                            <dialog id="my_modal_1" className="modal">
                                <div className="modal-box">
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


                            <div>
                                {step === 1 && (
                                    <form onSubmit={handlePasswordChangeRequest} className='flex flex-col gap-3' >
                                        <div className='relative flex flex-col gap-3'>
                                            <label className='text-gray-400 text-[14px]'>Current Password</label>
                                            <div>
                                                <input
                                                    type={currentPasswordVisible ? 'text' : 'password'}
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    required
                                                    className='w-[60%] p-2 bg-[#e2ebf7] focus:outline-none rounded-[5px] text-[14px]'
                                                />
                                            </div>
                                            <span
                                                className="absolute top-[45px] right-[415px] pr-3 flex items-center cursor-pointer"
                                                onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
                                            >
                                                <FontAwesomeIcon icon={currentPasswordVisible ? faEyeSlash : faEye} />
                                            </span>
                                        </div>
                                        <div className='relative flex flex-col gap-3'>
                                            <label className='text-gray-400 text-[14px]'>New Password</label>
                                            <div>
                                                <input
                                                    type={newPasswordVisible ? 'text' : 'password'}
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
                                                    className='w-[60%] p-2 bg-[#e2ebf7] focus:outline-none rounded-[5px] text-[14px]'
                                                />
                                            </div>

                                            <span
                                                className="absolute top-[45px] right-[415px] pr-3 flex items-center cursor-pointer"
                                                onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                                            >
                                                <FontAwesomeIcon icon={newPasswordVisible ? faEyeSlash : faEye} />
                                            </span>
                                        </div>
                                        <div className='relative flex flex-col gap-3'>
                                            <label className='text-gray-400 text-[14px]'>Verify New Password</label>
                                            <div>
                                                <input
                                                    type={verifyNewPasswordVisible ? 'text' : 'password'}
                                                    value={verifyNewPassword}
                                                    onChange={(e) => setVerifyNewPassword(e.target.value)}
                                                    required
                                                    className='w-[60%] p-2 bg-[#e2ebf7] focus:outline-none rounded-[5px] text-[14px]'
                                                />
                                            </div>

                                            <span
                                                className="absolute top-[45px] right-[415px] pr-3 flex items-center cursor-pointer"
                                                onClick={() => setVerifyNewPasswordVisible(!verifyNewPasswordVisible)}
                                            >
                                                <FontAwesomeIcon icon={verifyNewPasswordVisible ? faEyeSlash : faEye} />
                                            </span>
                                        </div>

                                        <div className='flex gap-4 mt-3'>
                                            <button type='submit' className='bg-secondary  py-1 text-[14px] px-3 rounded-[5px] flex items-center justify-center w-[90px] text-white bottom-0 outline-none'>
                                                {loading ? <span className="loading loading-spinner loading-sm bg-white"></span>
                                                    : "Update"}
                                            </button>

                                            <button className='bg-accent  py-1 w-[90px] text-[14px] px-3 rounded-[5px] text-white  bottom-0 outline-none'>
                                                Cancel
                                            </button>
                                        </div>

                                        <dialog id="my_modal_1" className="modal">
                                            <div className="modal-box">
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
                                    </form>
                                )}
                            </div>

                            {step === 2 && (
                                <form onSubmit={handleVerifyCode} className='flex flex-col gap-3' >
                                    <div className='relative flex flex-col gap-3'>
                                        <label className='text-gray-400 text-[14px]'>Verification Code</label>
                                        <div>
                                            <input
                                                type='text'
                                                value={verificationCode}
                                                onChange={(e) => setVerificationCode(e.target.value)}
                                                required
                                                className='w-[60%] p-2 bg-[#e2ebf7] focus:outline-none rounded-[5px] text-[14px]'
                                            />
                                        </div>
                                    </div>


                                    <div className='flex gap-4 mt-3'>
                                        <button type='submit' className='bg-secondary  py-1 text-[14px] px-3 rounded-[5px] flex items-center justify-center w-[90px] text-white bottom-0 outline-none'>
                                            {loading ? <span className="loading loading-spinner loading-sm bg-white"></span>
                                                : "Verify"}
                                        </button>

                                        <button className='bg-accent  py-1 w-[90px] text-[14px] px-3 rounded-[5px] text-white  bottom-0 outline-none'>
                                            Cancel
                                        </button>
                                    </div>

                                    <dialog id="my_modal_1" className="modal">
                                        <div className="modal-box">
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
                                </form>
                            )}


                            <div className='flex flex-col gap-4'>
                                <div>
                                    <h4 className='text-primary font-bold text-[14px]'>Security:</h4>
                                </div>

                                <div className='flex flex-col gap-3'>
                                    <div className='flex gap-4 items-center'>
                                        <p>2FA Login verification: </p>
                                        <button className='bg-[#a1cefb] w-[21%] font-medium text-[14px] rounded-[5px] p-2 text-primary'>
                                            Activate Login Verification
                                        </button>
                                    </div>

                                    <div className='flex flex-col gap-3'>

                                        <p className='text-gray-400 text-[13px]'>After you log in you will be asked for additional information to confirm your identity and protect your account from being compromised.</p>
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

export default Settings