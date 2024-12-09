"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { loginAction } from "./loginAction";
import { GiCancel } from "react-icons/gi";
import { GrStatusGood } from "react-icons/gr";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    const modal = document.getElementById(
      "login-modal"
    ) as HTMLDialogElement | null;
    setLoading(true);
    e.preventDefault();
    try {
      await loginAction(email, code);
      setSuccess(
        "Login succesfull!! you will be redirected to the dashboard page shortly"
      );
      setLoading(false);
      modal?.showModal();
      setTimeout(() => {
        modal?.close();
        setSuccess("");
      }, 2500);
      router.push("/dashboard");
    } catch (error) {
      setError("Error logging in");
      setLoading(false);
      modal?.showModal();
      setTimeout(() => {
        modal?.close();
        setError("");
      }, 2500);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    const modal = document.getElementById(
      "login-modal"
    ) as HTMLDialogElement | null;
    setLoading(true);
    e.preventDefault();
    try {
      if (email === "dylanchoijune@gmail.com") {
        setError(
          "Your account has been blocked due to security reasons please contact customer support"
        );
        setLoading(false);
        modal?.showModal();
        setTimeout(() => {
          modal?.close();
          setError("");
        }, 2500);
        return;
      }
      const response = await axios.post("/api/login", { email, password });
      if (response?.data?.error) {
        setError(response?.data?.error);
        setLoading(false);
        modal?.showModal();
        setTimeout(() => {
          modal?.close();
          setError("");
        }, 2500);
      }
      setLoading(false);
      setStep(2);
    } catch (error) {
      setError("Error logging in");
      setLoading(false);
      modal?.showModal();
      setTimeout(() => {
        modal?.close();
        setError("");
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen relative bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url(/bg4.jpg)" }}>
                 <div className="absolute inset-0 bg-[#181254] bg-opacity-60 z-0"></div>

      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl z-10">
        <dialog
          id="loading-modal"
          className={`modal bg-[#004080] ${loading ? "opacity-100" : ""}`}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="loading loading-ring loading-lg bg-white"></span>
          </div>
        </dialog>
        <dialog id="login-modal" className="modal">
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
        <div className="bg-[#161150] text-white p-8 md:w-1/2 flex flex-col justify-center">
          <div className="">
            <a href="/">
              <img
                src="/nav-logo.png"
                alt="logo"
                className="h-full w-full object-cover"
              />
            </a>
          </div>
          <h1 className="text-3xl font-bold mt-4">Welcome to CmTradingPro!</h1>
          <p className="mt-2 font-light">The world&apos;s #1 broker!!</p>
        </div>
        <div className="md:w-1/2">
          {step === 1 ? (
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-3xl font-semibold text-center text-primary">
                Sign In
              </h2>
              <p className="text-[#b5b5c3] text-center">
                Enter your Email and password
              </p>
              <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-white placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-white placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a href="#" className="text-[#7e8299] text-[12px]">
                      Forgot your password?
                    </a>
                  </div>

                  <div>
                    <a href="/signup" className="text-primary text-[12px]">
                      Create new account
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary  focus:outline-none"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-center">Enter the code sent to your email</h2>
              <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
                <div className="flex flex-col gap-3">
                  <div>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Verification Code"
                      required
                      className="appearance-none rounded-[8px] relative block w-full px-3 py-2 border border-gray-300 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary  focus:outline-none"
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
