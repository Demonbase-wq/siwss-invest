import React from 'react'
import { IoMdLogOut } from 'react-icons/io';


const LogoutDesktop = () => {

    const logFunc = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
            });

            const modal = document.getElementById(
                "my_modal_1"
            ) as HTMLDialogElement | null;
            if (modal) {
                modal.showModal()
            }

            if (response.ok) {
                window.location.href = '/login';
                modal?.close()
            } else {
                console.error('Failed to sign out');
            }
        } catch (error) {
            console.error('An error occurred while signing out', error);
        }
    };
    return (
        <div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <span className="loading loading-spinner loading-lg bg-white"></span>
                    <p>Signing you out</p>
                </div>
            </dialog>
            <button onClick={logFunc} className='flex items-center gap-3 p-2 rounded-[5px] w-full bg-[#00000074] text-white'>
                <IoMdLogOut className='cursor-pointer' color='white' />

                <p>Logout</p>
            </button>
        </div>
    )
}

export default LogoutDesktop