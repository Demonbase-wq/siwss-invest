"use client";
import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyNewPassword] = useState("");
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [verifyNewPasswordVisible, setVerifyNewPasswordVisible] =
    useState(false);
  const [step, setStep] = useState(1);

  const handlePasswordChangeRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== verifyNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Your new password must be 8 or more characters");
      return
    }

    const toastId = toast.loading("Requesting password change...");

    try {
      const response = await axios.post("/api/request-password-change", {
        currentPassword,
        newPassword,
      });

      const message = response?.data.message;
      const error = response?.data.error;

      if (message) {
        toast.dismiss(toastId);
        toast.success(message);
        setStep(2);
      }

      if (error) {
        toast.dismiss(toastId);
        toast.error(error);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("An error occurred while updating the password");
      setCurrentPassword("");
      setNewPassword("");
      setVerifyNewPassword("");
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Verifying code and changing password...");
    try {
      const response = await axios.post("/api/verify-password-change", {
        verificationCode,
        newPassword,
      });

      const message = response?.data.message;
      const error = response?.data.error;

      if (message) {
        toast.dismiss(toastId);
        toast.success(message);
        setStep(1);
        setCurrentPassword("");
        setNewPassword("");
        setVerifyNewPassword("");
        setVerificationCode("");
      }

      if (error) {
        toast.dismiss(toastId);
        toast.error(error);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("An error occurred while updating the password");
      setCurrentPassword("");
      setNewPassword("");
      setVerifyNewPassword("");
      setVerificationCode("");
    }
  };

  return (
    <div className="md:pt-6 py-4">
      <div className="mycontainer">
        <div className="px-4">
          <div>
            <div className="flex flex-col gap-7 bg-texiary p-4 rounded-[8px]">
              <div>
                <h4 className="font-bold text-white tex-[14px]">
                  Change Password
                </h4>
                <p className="text-gray-400 text-[12px]">
                  change your account password
                </p>
              </div>

              <div className="p-4 text-[14px] rounded-[8px] bg-red-200 text-red-500">
                Configure your password to a strong one. you may need the
                passwords to carry out some transactions on the system
                suspicious actions with the password might inadvertently get you
                locked out of the system!
              </div>

              <div>
                {step === 1 && (
                  <form
                    onSubmit={handlePasswordChangeRequest}
                    className="flex flex-col gap-3"
                  >
                    <div className="relative flex flex-col gap-3">
                      <label className="text-gray-400 text-[14px]">
                        Current Password
                      </label>
                      <div>
                        <input
                          type={currentPasswordVisible ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                          className="w-full md:w-[60%] p-2 bg-[#e2ebf7] text-gray-800 focus:outline-none rounded-[5px] text-[14px]"
                        />
                      </div>

                      <span
                        className="absolute top-[45px] md:right-[415px] right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() =>
                          setCurrentPasswordVisible(!currentPasswordVisible)
                        }
                      >
                        <FontAwesomeIcon
                          className="text-gray-800"
                          icon={currentPasswordVisible ? faEyeSlash : faEye}
                        />
                      </span>
                    </div>
                    <div className="relative flex flex-col gap-3">
                      <label className="text-gray-400 text-[14px]">
                        New Password
                      </label>
                      <div>
                        <input
                          type={newPasswordVisible ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          className="w-full md:w-[60%] p-2 bg-[#e2ebf7] text-gray-800 focus:outline-none rounded-[5px] text-[14px]"
                        />
                      </div>
                      <span
                        className="absolute top-[45px]  md:right-[415px] right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() =>
                          setNewPasswordVisible(!newPasswordVisible)
                        }
                      >
                        <FontAwesomeIcon
                          className="text-gray-800"
                          icon={newPasswordVisible ? faEyeSlash : faEye}
                        />
                      </span>
                    </div>
                    <div className="relative flex flex-col gap-3">
                      <label className="text-gray-400 text-[14px]">
                        Verify New Password
                      </label>
                      <div>
                        <input
                          type={verifyNewPasswordVisible ? "text" : "password"}
                          value={verifyNewPassword}
                          onChange={(e) => setVerifyNewPassword(e.target.value)}
                          required
                          className="w-full md:w-[60%] p-2 text-gray-800 bg-[#e2ebf7] focus:outline-none rounded-[5px] text-[14px]"
                        />
                      </div>

                      <span
                        className="absolute  md:right-[415px] top-[45px] right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() =>
                          setVerifyNewPasswordVisible(!verifyNewPasswordVisible)
                        }
                      >
                        <FontAwesomeIcon
                          className="text-gray-800"
                          icon={verifyNewPasswordVisible ? faEyeSlash : faEye}
                        />
                      </span>
                    </div>

                    <div className="flex gap-4 mt-3">
                      <button
                        type="submit"
                        className="bg-secondary py-1 text-[14px] px-3 rounded-[5px] text-white flex items-center justify-center w-[90px] bottom-0 outline-none"
                      >
                        Update
                      </button>

                      <button className="bg-accent w-[90px] py-1 text-[14px] px-3 rounded-[5px] text-white  bottom-0 outline-none">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
                {step === 2 && (
                  <form
                    onSubmit={handleVerifyCode}
                    className="flex flex-col gap-3"
                  >
                    <div className="relative flex flex-col gap-3">
                      <label className="text-gray-400 text-[14px]">
                        Verification Code
                      </label>
                      <div>
                        <input
                          type="text"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          required
                          className="w-full md:w-[60%] p-2 text-gray-800 bg-[#e2ebf7] focus:outline-none rounded-[5px] text-[14px]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-3">
                      <button
                        type="submit"
                        className="bg-secondary py-1 text-[14px] px-3 rounded-[5px] text-white flex items-center justify-center w-[90px] bottom-0 outline-none"
                      >
                        Verify
                      </button>

                      <button className="bg-accent w-[90px] py-1 text-[14px] px-3 rounded-[5px] text-white  bottom-0 outline-none">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
