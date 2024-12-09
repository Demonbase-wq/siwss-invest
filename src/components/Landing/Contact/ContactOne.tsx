import React from 'react'

const ContactOne = () => {
    return (
        <div className='py-8'>
            <div className="mycontainer">
                <div className="px-4">
                    <div className='flex lg:flex-row flex-col gap-8 items-center'>
                        {/* Form */}
                        <div className='lg:flex-1 flex items-center justify-center lg:justify-start'>

                            <form  className="bg-primary p-6 rounded-lg shadow-md w-full max-w-[492px]">
                                <h2 className="text-2xl font-bold mb-4 text-center text-white">Get in Touch</h2>
                                <div className="mb-4 flex flex-col gap-1">
                                    <label htmlFor="name" className="block text-sm font-medium">Your Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none bg-[#f6f6fa]"
                                        placeholder="Enter Your Full Name"
                                    />
                                </div>
                                <div className="mb-4 flex flex-col gap-1">
                                    <label htmlFor="email" className="block text-sm font-medium">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none bg-[#f6f6fa]"
                                        placeholder="Enter Your Email"
                                    />
                                </div>
                                <div className="mb-4 flex flex-col gap-1">
                                    <label htmlFor="subject" className="block text-sm font-medium">Your Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none bg-[#f6f6fa]"
                                        placeholder="Enter Your Subject"
                                    />
                                </div>
                                <div className="mb-4 flex flex-col gap-1">
                                    <label htmlFor="message" className="block text-sm font-medium">Your Message</label>
                                    <textarea
                                        id="message"
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none bg-[#f6f6fa]"
                                        placeholder="Enter Your Message"
                                        rows={4}
                                    ></textarea>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <input
                                        type="checkbox"
                                        id="subscribe"
                                        className="h-4 w-4 bg-[#e2ebf7]  border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor="subscribe" className="ml-2 block text-[10px] font-medium lg:text-[13px]">
                                        I agree to receive emails, newsletters and promotional messages.
                                    </label>
                                </div>
                                <div
                                    className="w-full text-center cursor-pointer py-2 px-4  text-white font-semibold rounded-md shadow-sm bg-accent focus:outline-none "
                                >
                                    SEND MESSAGE
                                </div>
                            </form>
                        </div>
                        {/* form */}

                        {/* right */}
                        <div className='lg:flex-1'>
                            <div className='hidden lg:block'>
                                <img src="/free.png" alt="man" />

                            </div>

                            {/* lg:flex lg:flex-col lg:gap-7 lg:items-end */}
                            
                        </div>
                        {/* right */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactOne