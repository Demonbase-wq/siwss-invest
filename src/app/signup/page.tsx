"use client";
// pages/signup.tsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useTranslation } from "@/translations/provider";

interface FormData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  dob: Date;
  password: string;
  confirmPassword: string;
  country: string;
  state: string;
  address: string;
  // img: string;
  referralCode: string;
  timezone: string; // Add timezone field
}

const SignUp: React.FC = () => {
  // const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [countries, setCountries] = useState<{ name: string; iso2: string }[]>(
    []
  );
  const [states, setStates] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [referralCode, setReferralCode] = useState<string>("");
  // Extract referral code from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get("ref");
    if (ref) setReferralCode(ref);
  }, []);

  const { register, handleSubmit, watch, setValue, reset } = useForm<FormData>({
    defaultValues: {
      referralCode: "", // Set referral code from URL as the default
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Capture timezone during form initialization
    },
  });

  // Set referral code in form on load
  useEffect(() => {
    setValue("referralCode", referralCode);
  }, [referralCode, setValue]);

  useEffect(() => {
    // Fetch countries with ISO2 codes
    axios
      .get("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY":
            "aWIxUjJ0bUgwZDk4ckRVQkRQcmJyS3RwNjB3TlFQY01UbVVaTEZLTw==",
        },
      })
      .then((response) => {
        const countryData = response.data.map((country: any) => ({
          name: country.name,
          iso2: country.iso2,
        }));
        setCountries(
          countryData.sort((a: any, b: any) => a.name.localeCompare(b.name))
        );
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setValue("country", selectedCountry);

    // Find the ISO2 code for the selected country
    const selectedCountryIso2 = countries.find(
      (country) => country.name === selectedCountry
    )?.iso2;

    // Fetch states based on selected country ISO2 code
    if (selectedCountryIso2) {
      axios
        .get(
          `https://api.countrystatecity.in/v1/countries/${selectedCountryIso2}/states`,
          {
            headers: {
              "X-CSCAPI-KEY":
                "aWIxUjJ0bUgwZDk4ckRVQkRQcmJyS3RwNjB3TlFQY01UbVVaTEZLTw==",
            },
          }
        )
        .then((response) =>
          setStates(response.data.map((state: any) => state.name))
        )
        .catch((error) => console.error("Error fetching states:", error));
    }
  };

  // const handleImageUpload = async (): Promise<string | null> => {
  //   if (!inputFileRef.current?.files) {
  //     throw new Error("No file selected");
  //   }

  //   const file = inputFileRef.current.files[0];

  //   const response = await fetch(`/api/upload-image?filename=${file.name}`, {
  //     method: "POST",
  //     body: file,
  //   });

  //   const newBlob = await response.json();
  //   return newBlob?.url ?? null;
  // };

  const { translations } = useTranslation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.password.length < 8) {
      toast.error("Your password must be 8 or more characters");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const toastId = toast.loading("Signing you up, please wait...");
    try {
      // const imgURL = await handleImageUpload();
      // if (!imgURL) {
      //   toast.dismiss(toastId);
      //   toast.error("Image upload failed");
      //   return;
      // }

      // setValue("img", imgURL);
      // data.img = imgURL;

      console.log(data);

      const { confirmPassword, ...newData } = data;

      const response = await axios.post(`/api/signup`, newData);

      if (response.data.success) {
        toast.dismiss(toastId);
        toast.success("Sign up successful, redirecting you to login.....");
        reset();
        router.push("/login");
      }
      if (response?.data.catchError) {
        toast.dismiss(toastId);
        toast.error("Error signing up");
        return;
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error Signing Up");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: "url(/bg4.jpg)" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#181254] bg-opacity-60 z-0"></div>

      <div className="bg-[#161150] p-8 rounded shadow-md w-full lg:max-w-[650px] z-10 text-gray-400">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-white">
              {translations?.signup?.text1}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <label className="block mb-1">
                    {translations?.signup?.text2}
                  </label>
                  <input
                    type="text"
                    {...register("first_name", { required: true })}
                    className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">
                    {translations?.signup?.text3}
                  </label>
                  <input
                    type="text"
                    {...register("last_name", { required: true })}
                    className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <label className="block mb-1">
                    {translations?.signup?.text4}
                  </label>
                  <input
                    type="tel"
                    {...register("phone", { required: true })}
                    className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">
                    {translations?.signup?.text5}
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <label className="block mb-1">
                    {translations?.signup?.text7}
                  </label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">
                    {translations?.signup?.text8}
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword", { required: true })}
                    className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <label className="block mb-1">
                    {translations?.signup?.text10}
                  </label>
                  <input
                    type="date"
                    {...register("dob", { required: true })}
                    className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">
                    {translations?.signup?.text9}
                  </label>
                  <input
                    type="text"
                    {...register("address", { required: true })}
                    className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* <div className="flex-1">
                  <label className="block mb-1">
                    {translations?.signup?.text10}
                  </label>
                  <input
                    type="date"
                    {...register("dob", { required: true })}
                    className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
                  />
                </div> */}
                <div className="flex-1">
                  <label className="block mb-1">
                    {translations?.signup?.text11}
                  </label>
                  <select
                    {...register("country", { required: true })}
                    onChange={handleCountryChange}
                    className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.iso2} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block mb-1">
                    {translations?.signup?.text12}
                  </label>
                  <select
                    {...register("state", { required: true })}
                    className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <label className="block mb-1">
                    {translations?.signup?.text12}
                  </label>
                  <select
                    {...register("state", { required: true })}
                    className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block mb-1">
                    {translations?.signup?.text13}
                  </label>
                  <input
                    name="file"
                    ref={inputFileRef}
                    type="file"
                    required
                    className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
                  />
                </div>
              </div> */}
              <div>
                <label className="block mb-1">
                  {translations?.signup?.text14}
                </label>
                <input
                  type="text"
                  {...register("referralCode")} // Automatically tracks the value
                  placeholder="Enter referral code (if any)"
                  className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-end gap-5">
                <div className="text-sm">
                  <p>{translations?.signup?.text15}</p>
                </div>

                <div className="text-sm">
                  <Link href="/login" className="">
                    {translations?.signup?.text16}
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-white p-2 rounded"
              >
                {translations?.signup?.text1}
              </button>
            </form>
          </>
        )}
        {step === 2 && <VerifyPin />}
      </div>
    </div>
  );
};

export default SignUp;

const VerifyPin: React.FC = () => {
  const { register, handleSubmit } = useForm<{ pin: string }>();
  const router = useRouter();
  const { translations } = useTranslation();

  const onSubmit: SubmitHandler<{ pin: string }> = async (data) => {
    const toastId = toast.loading("Verifying");
    try {
      const response = await axios.post(`/api/verify-pin`, data);
      console.log(response.status);
      if (response.status === 200) {
        toast.dismiss(toastId);
        toast.success("Pin verified! Redirecting to login...");

        router.push("/login");
      } else {
        toast.dismiss(toastId);
        toast.error("Invalid pin. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying pin:", error);
      toast.dismiss(toastId);
      toast.error("Something went wrong, Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        {translations?.signup?.text17}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">{translations?.signup?.text18}</label>
          <input
            type="text"
            {...register("pin", { required: true })}
            className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-accent text-white p-2 rounded"
        >
          {translations?.signup?.text19}
        </button>
      </form>
    </div>
  );
};
