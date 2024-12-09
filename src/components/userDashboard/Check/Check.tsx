// components/CheckDepositForm.tsx
'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GiCancel } from 'react-icons/gi';
import { GrStatusGood } from 'react-icons/gr';

interface FormData {
  img: string;
  id: string;
}

const CheckDepositForm: React.FC = () => {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter()

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


  const onSubmit: SubmitHandler<FormData> = async data => {
    setLoading(true)
    const modal = document.getElementById(
      "check-modal"
    ) as HTMLDialogElement | null;

    try {
      const firstRes = await axios.post('/api/check-deposit');
      const id = await firstRes.data.id;
     
      if (id) {
        const imgURL = await handleImageUpload();
        if (!imgURL) {
          setLoading(false);
          setError('Image upload failed');
          modal?.showModal()
          setTimeout(() => {
            modal?.close();
            setError('');
          }, 2500);
          return;
        }
        setValue('img', imgURL);
        setValue('id', id);
        data.img = imgURL;
        data.id = id;
      }else{
        setLoading(false);
          setError('Failed to deposit check');
          modal?.showModal()
          setTimeout(() => {
            modal?.close();
            setError('');
          }, 2500);
        return;
      }

      console.log(data)

      const secondRes = await axios.post('/api/update-check', data);
      const secondmessage = await secondRes.data.message;
      const seconderr = await secondRes.data.error;

      if (secondmessage) {
        setLoading(false)
        setSuccess(secondmessage)
        modal?.showModal()
        setTimeout(() => {
          setSuccess('');
          reset();
          modal?.close();
          router.push('/dashboard/tickets')
        }, 2500);
      }
      if (seconderr) {
        setLoading(false);
        setError(seconderr);
        modal?.showModal();
        setTimeout(() => {
          modal?.close();
          setError('');
        }, 2500);
      }
    } catch (error) {
      setLoading(false);
      setError(`Couldn't process deposit`);
      modal?.showModal();
      setTimeout(() => {
        modal?.close();
        setError('');
      }, 2500);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen md:pt-6">
      <dialog id="check-modal" className="modal">
        <div className="modal-box">
          {error && <div className='flex items-center justify-center gap-3'>
            <GiCancel size={40} color='#ef4444' />
            <p className='text-red-500'>{error}</p>
          </div>}
          {success && <div className='flex items-center justify-center gap-3'>
            <GrStatusGood size={40} color='#22c55e' />
            <p className='text-green-500 flex items-center gap-2'>{success}           <span className="loading loading-dots loading-lg bg-green-500"></span>
            </p>
          </div>}
        </div>
      </dialog>

      <dialog id="loading-modal" className={`modal bg-[#004080] ${loading ? 'opacity-100' : ''}`}>
        <div className='flex items-center justify-center gap-3'>
          <span className="loading loading-ring loading-lg bg-white"></span>
        </div>
      </dialog>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-[14px] md:text-[15px] font-bold mb-4 text-center text-primary">Mobile Check Deposit</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="border border-gray-300 rounded p-4">
            <div className="flex justify-between items-center">
              <label className="text-primary text-[13px] md:text-[15px]">Please upload cheque deposit below</label>
            </div>
            <div className="flex items-center mt-4">
              <input type="file" ref={inputFileRef} className="w-full p-2 border rounded border-gray-300" />
            </div>
            <div className="flex justify-center mt-4">
              <img
                src="/bga.png"
                alt="Upload Placeholder"
                className="w-24 h-24"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded text-[13px] md:text-[15px]">Deposit Cheque</button>
          </div>
          <p className="text-gray-500 text-center mt-4 text-[13px] md:text-[15px]">Note: cheque deposit may be delayed for confirmation.</p>
        </form>
      </div>
    </div>
  );
};

export default CheckDepositForm;
