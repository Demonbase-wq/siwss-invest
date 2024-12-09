'use client'
// pages/crypto-deposit.tsx
import React, { useRef, useState } from 'react';
import QRCode from 'qrcode.react';
import { FiCopy } from 'react-icons/fi';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { GiCancel } from 'react-icons/gi';
import { GrStatusGood } from 'react-icons/gr';

interface FormData {
    img: string;
    amount: string;
    wallet: string;
    id: string;
}

const cryptoAddresses = {
    BTC: {
        address: 'bc1q3en8smw070t8n5c6y9dvwnp4qdmpudypvssmj0',
        qr: 'bc1q3en8smw070t8n5c6y9dvwnp4qdmpudypvssmj0',
    },
    ETH: {
        address: '0xe31c7Fe38B9229452D0CF0776aea739cb495AFE9',
        qr: '0xe31c7Fe38B9229452D0CF0776aea739cb495AFE9',
    },
    USDT: {
        address: 'TK1jubrB23VP4NJSt5D2LB2ufMhNUTCadx',
        qr: 'TK1jubrB23VP4NJSt5D2LB2ufMhNUTCadx',
    },
    BNB: {
        address: '0xe31c7Fe38B9229452D0CF0776aea739cb495AFE9',
        qr: '0xe31c7Fe38B9229452D0CF0776aea739cb495AFE9',
    },
};

const CryptoDeposit = () => {
    const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'ETH' | 'USDT' | 'BNB'>('BTC');
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
            "crypto-modal"
        ) as HTMLDialogElement | null;

        try {
            const newData = {
                wallet: data.wallet,
                amount: data.amount,
            }
            const firstRes = await axios.post('/api/crypto-deposit', newData);
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
            } else {
                setLoading(false);
                setError('Failed to deposit crypto');
                modal?.showModal()
                setTimeout(() => {
                    modal?.close();
                    setError('');
                }, 2500);
                return;
            }

            console.log(data)

            const secondRes = await axios.post('/api/update-crypto', data);
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

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(cryptoAddresses[selectedCrypto].address);
        alert('Address copied to clipboard!');
    };


    return (
        <div className="min-h-screen flex items-center justify-center md:pt-6">
            <dialog id="crypto-modal" className="modal">
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
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">DEPOSIT FUND</h2>
                <p className="text-red-500 text-sm mb-4">*Please select one of the below listed cryptocurrency addresses:</p>
                <div className="flex gap-2 mb-4">
                    {Object.keys(cryptoAddresses).map((crypto) => (
                        <button
                            key={crypto}
                            className={`px-3 py-2 rounded ${selectedCrypto === crypto ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setSelectedCrypto(crypto as 'BTC' | 'ETH' | 'USDT' | 'BNB')}
                        >
                            {crypto}
                        </button>
                    ))}
                </div>
                <p>Please scan or copy the address below to deposit {selectedCrypto}.</p>
                <p className="font-bold mb-4">{selectedCrypto} Minimum deposit: 0.001 {selectedCrypto}</p>
                <div className="flex justify-center mb-4">
                    <QRCode value={cryptoAddresses[selectedCrypto].qr} />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <input
                        type="text"
                        value={cryptoAddresses[selectedCrypto].address}
                        readOnly
                        className="w-full bg-[#e2ebf7] flex-1 p-2 border rounded"
                    />
                    <button onClick={handleCopyAddress} className="ml-2 p-2 bg-primary text-white rounded">
                        <FiCopy size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-1">Amount</label>
                        <input type="number" {...register('amount', { required: true })} required className="w-full bg-[#e2ebf7] p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Wallet</label>
                        <input type="text" {...register('wallet', { required: true })} required className="w-full bg-[#e2ebf7] p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block mb-1">Deposit Proof</label>
                        <input type="file" ref={inputFileRef} required className="w-full bg-[#e2ebf7] p-2 border rounded" />
                    </div>
                    <button type="submit" className="w-full bg-primary text-white p-2 rounded">Confirm Deposit</button>
                </form>
                <p className="text-xs text-center text-gray-500 mt-4">*Once we confirm your payment and it's verified, your account will be funded.</p>
            </div>
        </div>
    );
};

export default CryptoDeposit;
