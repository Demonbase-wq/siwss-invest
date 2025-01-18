"use client";

import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiUpload, FiFile } from "react-icons/fi";
import { toast } from "sonner";
import axios from "axios";
import { useTranslation } from "@/translations/provider";

interface KYCFormData {
  nin: string;
  idFront: string;
  idBack: string;
  passportPhoto: string;
  credentialsNotExpired: boolean;
  documentVisible: boolean;
}

interface FileState {
  idFront: File | null;
  idBack: File | null;
  passportPhoto: File | null;
}

const KYC: React.FC = () => {
  const { register, handleSubmit, setValue, reset, watch } =
    useForm<KYCFormData>();
  const { translations } = useTranslation();

  const [fileState, setFileState] = useState<FileState>({
    idFront: null,
    idBack: null,
    passportPhoto: null,
  });
  const inputFileRefs = {
    idFront: useRef<HTMLInputElement>(null),
    idBack: useRef<HTMLInputElement>(null),
    passportPhoto: useRef<HTMLInputElement>(null),
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    const response = await fetch(`/api/upload-image?filename=${file.name}`, {
      method: "POST",
      body: file,
    });
    const newBlob = await response.json();
    return newBlob?.url ?? null;
  };

  const onSubmit: SubmitHandler<KYCFormData> = async (data) => {
    const toastId = toast.loading("Submitting documents");
    try {
      const idFrontUrl = fileState.idFront
        ? await handleImageUpload(fileState.idFront)
        : null;
      const idBackUrl = fileState.idBack
        ? await handleImageUpload(fileState.idBack)
        : null;
      const passportPhotoUrl = fileState.passportPhoto
        ? await handleImageUpload(fileState.passportPhoto)
        : null;

      const kycData = {
        ...data,
        idFront: idFrontUrl,
        idBack: idBackUrl,
        passportPhoto: passportPhotoUrl,
      };

      // Send KYC data to the server
      const response = await axios.post("/api/kyc", kycData);
      const error = response?.data.error;
      const message = response?.data.message;

      if (message) {
        toast.dismiss(toastId);
        toast.success(message);
        reset();
        setFileState({ idFront: null, idBack: null, passportPhoto: null });
      }
      if (error) {
        toast.dismiss(toastId);
        toast.error(error);
        return;
      }
    } catch (error) {
      console.error("Error submitting KYC form:", error);
      toast.dismiss(toastId);
      toast.error("Something went wrong, please try again...");
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof FileState
  ) => {
    const file = event.target.files?.[0] || null;
    setFileState((prev) => ({ ...prev, [field]: file }));
    setValue(field, file ? file.name : ""); // Update form value
  };

  const watchFields = watch();
  const totalFields = 6; // Total number of fields in the form
  const filledFields =
    (watchFields.nin ? 1 : 0) +
    (fileState.idFront ? 1 : 0) +
    (fileState.idBack ? 1 : 0) +
    (fileState.passportPhoto ? 1 : 0) +
    (watchFields.credentialsNotExpired ? 1 : 0) +
    (watchFields.documentVisible ? 1 : 0);
  const progressPercentage = (filledFields / totalFields) * 100;

  const truncateFileName = (name: string, maxLength: number = 20) => {
    if (name.length <= maxLength) return name;
    const extension = name.split(".").pop();
    const nameWithoutExtension = name.substring(0, name.lastIndexOf("."));
    return `${nameWithoutExtension.substring(0, maxLength - 3)}...${extension}`;
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden mt-[47px] border-none">
        <div className="bg-primary text-white py-6 px-8 border-none">
          <h2 className="text-3xl font-bold">
            {translations?.dashboardKyc?.text1}
          </h2>
          <p className="mt-2 text-primary-100">
            {translations?.dashboardKyc?.text2}
          </p>
        </div>
        <div className="p-8">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                {translations?.dashboardKyc?.text3}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {translations?.dashboardKyc?.text4}
                </label>
                <input
                  {...register("nin", { required: true })}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {translations?.dashboardKyc?.text5}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {fileState.idFront ? (
                      <div className="flex flex-col items-center justify-center">
                        <FiFile className="h-12 w-12 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-600 truncate w-full">
                          {truncateFileName(fileState.idFront.name)}
                        </span>
                      </div>
                    ) : (
                      <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="idFront"
                        className="relative cursor-pointer m-5 bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                      >
                        <span className="border border-primary p-2 rounded-[12px]">
                          {fileState.idFront ? "Change file" : "Upload a file"}
                        </span>
                        <input
                          id="idFront"
                          type="file"
                          required
                          ref={inputFileRefs.idFront}
                          onChange={(e) => handleFileChange(e, "idFront")}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {translations?.dashboardKyc?.text6}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {fileState.idBack ? (
                      <div className="flex flex-col items-center justify-center">
                        <FiFile className="h-12 w-12 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-600 truncate w-full">
                          {truncateFileName(fileState.idBack.name)}
                        </span>
                      </div>
                    ) : (
                      <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="idBack"
                        className="relative cursor-pointer m-5 bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                      >
                        <span className="border border-primary p-2 rounded-[12px]">
                          {fileState.idBack ? "Change file" : "Upload a file"}
                        </span>
                        <input
                          id="idBack"
                          type="file"
                          required
                          ref={inputFileRefs.idBack}
                          onChange={(e) => handleFileChange(e, "idBack")}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {translations?.dashboardKyc?.text7}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {fileState.passportPhoto ? (
                      <div className="flex flex-col items-center justify-center">
                        <FiFile className="h-12 w-12 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-600 truncate w-full">
                          {truncateFileName(fileState.passportPhoto.name)}
                        </span>
                      </div>
                    ) : (
                      <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="passportPhoto"
                        className="relative cursor-pointer m-5 bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                      >
                        <span className="border border-primary p-2 rounded-[12px]">
                          {fileState.passportPhoto
                            ? "Change file"
                            : "Upload a file"}
                        </span>
                        <input
                          id="passportPhoto"
                          type="file"
                          required
                          ref={inputFileRefs.passportPhoto}
                          onChange={(e) => handleFileChange(e, "passportPhoto")}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("credentialsNotExpired")}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label
                  htmlFor="credentialsNotExpired"
                  className="ml-2 block text-sm text-gray-900"
                >
                  {translations?.dashboardKyc?.text8}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("documentVisible")}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label
                  htmlFor="documentVisible"
                  className="ml-2 block text-sm text-gray-900"
                >
                  {translations?.dashboardKyc?.text9}
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {translations?.dashboardKyc?.text10}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KYC;
