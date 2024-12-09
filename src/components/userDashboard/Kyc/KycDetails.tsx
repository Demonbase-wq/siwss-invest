'use client'
// pages/dashboard/kyc.tsx
import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { GiCancel } from 'react-icons/gi';
import { GrStatusGood } from 'react-icons/gr';

interface KYCFormData {
  employmentType: string;
  annualIncome: string;
  ssn: string;
  idNumber: string;
  idFront: string;
  idBack: string;
  passportPhoto: string;
  credentialsNotExpired: boolean;
  documentVisible: boolean;
}

const KYC: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm<KYCFormData>();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const inputFileRefs = {
    idFront: useRef<HTMLInputElement>(null),
    idBack: useRef<HTMLInputElement>(null),
    passportPhoto: useRef<HTMLInputElement>(null),
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
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

  const onSubmit: SubmitHandler<KYCFormData> = async data => {
    setLoading(true)
    try {
      const idFrontUrl = inputFileRefs.idFront.current?.files ? await handleImageUpload(inputFileRefs.idFront.current.files[0]) : null;
      const idBackUrl = inputFileRefs.idBack.current?.files ? await handleImageUpload(inputFileRefs.idBack.current.files[0]) : null;
      const passportPhotoUrl = inputFileRefs.passportPhoto.current?.files ? await handleImageUpload(inputFileRefs.passportPhoto.current.files[0]) : null;

      const kycData = {
        ...data,
        idNumber: parseFloat(data.idNumber),
        idFront: idFrontUrl,
        idBack: idBackUrl,
        passportPhoto: passportPhotoUrl,
      };

      // Send KYC data to the server
      const response = await fetch('/api/kyc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(kycData),
      });

      if (!response.ok) {
        setError('Failed to save KYC data')
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

      setSuccess('KYC data saved successfully');
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
      reset()
    } catch (error) {
      console.error('Error submitting KYC form:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
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
        <h2 className="text-2xl font-bold mb-6 text-primary">KYC Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Type of Employment</label>
            <select {...register('employmentType', { required: true })} className="w-full bg-[#e2ebf7] p-2 border rounded">
              <option value="select-type-of-employement">Select Type Of Employement</option>
              <option value="self-employed">Self Employed</option>
              <option value="employee">Employee</option>
              <option value="worker">Worker</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Annual Income</label>
            <select {...register('annualIncome', { required: true })} className="w-full bg-[#e2ebf7] p-2 border rounded">
              <option value="select-salary-range">Select Salary Range</option>
              <option value="5000-10000">5000-10000</option>
              <option value="10000-15000">10000-15000</option>
              <option value="15000-25000">15000-25000</option>
              <option value="25000-50000">25000-50000</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">State Security Number (SSN, NI, SIN, etc)</label>
            <input {...register('ssn', { required: true })} className="w-full bg-[#e2ebf7] p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1">ID Number</label>
            <input {...register('idNumber', { required: true })} type='number' className="w-full bg-[#e2ebf7] p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1">ID Front</label>
            <input type="file" required ref={inputFileRefs.idFront} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1">ID Back</label>
            <input type="file" required ref={inputFileRefs.idBack} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1">Passport Photograph</label>
            <input type="file" required ref={inputFileRefs.passportPhoto} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" {...register('credentialsNotExpired')} className="mr-2 bg-[#e2ebf7]" />
              Credentials Not Expired
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" {...register('documentVisible')} className="mr-2 bg-[#e2ebf7]" />
              Document is Visible
            </label>
          </div>
          <button type="submit" className="w-full bg-primary text-white p-2 rounded">{loading ? <span className="loading loading-spinner loading-sm bg-white"></span>
            : "Submit"}</button>
        </form>
      </div>
    </div>
  );
};

export default KYC;
