"use client";
// pages/signup.tsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { GiCancel } from "react-icons/gi";
import { GrStatusGood } from "react-icons/gr";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  pincode: string;
  dob: Date;
  password: string;
  confirmPassword: string;
  country: string;
  state: string;
  address: string;
  img: string;
}

const SignUp: React.FC = () => {
  const { register, handleSubmit, watch, setValue, reset } =
    useForm<FormData>();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [countries, setCountries] = useState<{ name: string; iso2: string }[]>(
    []
  );
  const [states, setStates] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

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

  const handleImageUpload = async (): Promise<string | null> => {
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(
      `https://cmtradingpro.vercel.app/api/upload-image?filename=${file.name}`,
      {
        method: "POST",
        body: file,
      }
    );

    const newBlob = await response.json();
    return newBlob?.url ?? null;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    if (data.pincode.length < 6) {
      setError("Pincode must be 6 digits or more");
      setLoading(false);
      const modal = document.getElementById(
        "signup-modal"
      ) as HTMLDialogElement | null;

      modal?.showModal();
      setTimeout(() => {
        modal?.close();
        setError("");
      }, 2500);
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      const modal = document.getElementById(
        "signup-modal"
      ) as HTMLDialogElement | null;
      modal?.showModal();
      setTimeout(() => {
        modal?.close();
        setError("");
      }, 2500);
      return;
    }

    try {
      const imgURL = await handleImageUpload();
      if (!imgURL) {
        setError("Image upload failed");
        setLoading(false);
        const modal = document.getElementById(
          "my_modal_1"
        ) as HTMLDialogElement | null;
        if (modal) {
          modal.showModal();
        }
        setTimeout(() => {
          modal?.close();
          setError("");
        }, 2500);
        return;
      }

      setValue("img", imgURL);
      data.img = imgURL;

      console.log(data);

      const { confirmPassword, ...newData } = data;

      const response = await axios.post(
        "https://.vercel.app/api/signup",
        newData
      );

      if (response.data.success) {
        reset();
        setLoading(false);
        setStep(2);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
    style={{ backgroundImage: "url(/bg4.jpg)" }}>
         {/* Background Overlay */}
         <div className="absolute inset-0 bg-[#181254] bg-opacity-60 z-0"></div>

      <div className="bg-[#161150] p-8 rounded shadow-md w-full lg:max-w-[650px] z-10">
        <dialog id="signup-modal" className="modal">
          <div className="modal-box bg-white">
            {error && (
              <div className="flex items-center justify-center gap-3">
                <GiCancel size={40} color="#ef4444" />
                <p className="text-red-500">{error}</p>
              </div>
            )}
            {success && (
              <div className="flex items-center justify-center gap-3">
                <GrStatusGood size={40} color="#22c55e" />
                <p className="text-green-500">{success}</p>
              </div>
            )}
          </div>
        </dialog>
        <dialog
          id="loading-modal"
          className={`modal bg-[#004080] ${loading ? "opacity-100" : ""}`}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="loading loading-ring loading-lg bg-white"></span>
          </div>
        </dialog>
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-white">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <label className="block mb-1 text-[#666666]">First Name</label>
                  <input
                    type="text"
                    {...register("first_name", { required: true })}
                    className="w-full bg-transparent p-2 border border-[#666666] rounded focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">Last Name</label>
                  <input
                    type="text"
                    {...register("last_name", { required: true })}
                    className="w-full bg-[#e2ebf7] p-2 border rounded"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <label className="block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    {...register("phone", { required: true })}
                    className="w-full bg-[#e2ebf7] p-2 border rounded"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full bg-[#e2ebf7] p-2 border rounded"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <label className="block mb-1">6-Digit Pincode</label>
                  <input
                    type="text"
                    {...register("pincode", { required: true, maxLength: 6 })}
                    className="w-full bg-[#e2ebf7] p-2 border rounded"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">Password</label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="w-full bg-[#e2ebf7] p-2 border rounded"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <label className="block mb-1">Confirm Password</label>
                  <input
                    type="password"
                    {...register("confirmPassword", { required: true })}
                    className="w-full bg-[#e2ebf7] p-2 border rounded"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">Address</label>
                  <input
                    type="text"
                    {...register("address", { required: true })}
                    className="w-full bg-[#e2ebf7] p-2 border rounded"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <label className="block mb-1">Date of Birth</label>
                  <input
                    type="date"
                    {...register("dob", { required: true })}
                    className="w-full bg-[#e2ebf7] p-2 border rounded"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">Country</label>
                  <select
                    {...register("country", { required: true })}
                    onChange={handleCountryChange}
                    className="w-full bg-[#e2ebf7] p-2 border rounded"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.iso2} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <label className="block mb-1">State</label>
                  <select
                    {...register("state", { required: true })}
                    className="w-full bg-[#e2ebf7] p-2 border rounded"
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
                  <label className="block mb-1">User Image</label>
                  <input
                    name="file"
                    ref={inputFileRef}
                    type="file"
                    required
                    className="w-full bg-[#e2ebf7] p-2 border rounded"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-5">
                  <div className="text-sm">
                    <p>
                      Already have an account?
                    </p>
                  </div>

                  <div className="text-sm">
                    <Link href="/login" className="">
                      Login
                    </Link>
                  </div>
                </div>
              <button
                type="submit"
                className="w-full bg-accent text-white p-2 rounded"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm bg-white"></span>
                ) : (
                  "Sign Up"
                )}
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit: SubmitHandler<{ pin: string }> = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/verify-pin", data);
      console.log(response.status);
      if (response.status === 200) {
        setLoading(false);
        setSuccess("Pin verified! Redirecting to login...");
        const modal = document.getElementById(
          "signup-verify-modal"
        ) as HTMLDialogElement | null;
        modal?.showModal();
        setTimeout(() => {
          modal?.close();
          router.push("/login");
        }, 2500);
      } else {
        setLoading(false);
        setError("Invalid pin. Please try again.");
        const modal = document.getElementById(
          "signup-verify-modal"
        ) as HTMLDialogElement | null;

        modal?.showModal();

        setTimeout(() => {
          modal?.close();
          setError("");
        }, 2500);
      }
    } catch (error) {
      console.error("Error verifying pin:", error);
      setError("An error occurred. Please try again.");
      const modal = document.getElementById(
        "signup-verify-modal"
      ) as HTMLDialogElement | null;

      modal?.showModal();

      setTimeout(() => {
        modal?.close();
        setError("");
      }, 2500);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Verify Pin</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Enter Pin</label>
          <input
            type="text"
            {...register("pin", { required: true })}
            className="w-full p-2 border bg-[#e2ebf7] rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm bg-white"></span>
          ) : (
            "Verify"
          )}
        </button>
      </form>
      <dialog id="signup-verify-modal" className="modal">
        <div className="modal-box">
          {error && (
            <div className="flex items-center justify-center gap-3">
              <GiCancel size={40} color="#ef4444" />
              <p className="text-red-500">{error}</p>
            </div>
          )}
          {success && (
            <div className="flex items-center justify-center gap-3">
              <GrStatusGood size={40} color="#22c55e" />
              <p className="text-green-500">{success}</p>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};
