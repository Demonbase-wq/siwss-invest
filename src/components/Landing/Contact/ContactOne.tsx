"use client";

import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

const ContactOne = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    subscribe: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastId = toast.loading("Sending your message...");
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact-support`, formData);
      const message = response?.data.message;
      const error = response?.data.error;
      if (message) {
        toast.dismiss(toastId);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          subscribe: false,
        });
        toast.success(message);
      }
      if(error){
        toast.dismiss(toastId)
        toast.error(error)
      }
    } catch (error) {
        console.log(error)
        toast.dismiss(toastId)
        toast.error("Something went wrong, please try again")
    }
  };

  return (
    <div className="py-8">
      <div className="mycontainer">
        <div className="px-4">
          <div className="flex lg:flex-row flex-col gap-8 items-center">
            {/* Form */}
            <div className="lg:flex-1 flex items-center justify-center lg:justify-start">
              <form
                onSubmit={handleSubmit}
                className="bg-primary p-6 rounded-lg shadow-md w-full max-w-[492px]"
              >
                <h2 className="text-2xl font-bold mb-4 text-center text-white">
                  Get in Touch
                </h2>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none bg-[#f6f6fa]"
                    placeholder="Enter Your Full Name"
                    required
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none bg-[#f6f6fa]"
                    placeholder="Enter Your Email"
                    required
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium"
                  >
                    Your Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none bg-[#f6f6fa]"
                    placeholder="Enter Your Subject"
                    required
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none bg-[#f6f6fa]"
                    placeholder="Enter Your Message"
                    rows={4}
                    required
                  ></textarea>
                </div>
                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    id="subscribe"
                    name="subscribe"
                    checked={formData.subscribe}
                    onChange={handleChange}
                    className="h-4 w-4 bg-[#e2ebf7] border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="subscribe"
                    className="ml-2 block text-[10px] font-medium lg:text-[13px]"
                  >
                    I agree to receive emails, newsletters and promotional
                    messages.
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-center cursor-pointer py-2 px-4 text-white font-semibold rounded-md shadow-sm bg-accent focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            </div>
            {/* form */}

            {/* right */}
            <div className="lg:flex-1">
              <div className="hidden lg:block">
                <img src="/free.png" alt="man" />
              </div>
            </div>
            {/* right */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactOne;
