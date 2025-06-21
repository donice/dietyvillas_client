"use client";
import { Button } from "@/components/common/button";
import { TextInput } from "@/components/common/input";
import { API_ROUTES, PAGE_ROUTES } from "@/constants/routes";
import { useAuthDispatch, logout, login } from "@/context/authContext";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ForgotPasswordModule = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await axiosInstance.post(
        API_ROUTES.AUTH.FORGOT_PASSWORD as string,
        data
      );
      return response?.data;
    },
    onSuccess: (data) => {
      console.log(data);
      const { resp_code, resp_description } = data;
      if (resp_code == "00") {
        toast.success(resp_description);
      } else {
        toast.error(resp_description);
      }
    },
    onError: (error: any) => {
      toast.error("Error Loging in");
      console.error("Login failed:", error);
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8">
        <header className="text-center mb-8 grid gap-3">
          <h1 className="font-bold uppercase text-xl">Ticketing System</h1>
          <p>Kindly enter email to reset your password</p>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <TextInput
            label={"Email"}
            name={"email"}
            register={register}
            type={"email"}
            placeholder={"Enter Email"}
            error={errors.email}
            validation={{ required: true }}
          />

          <Button text={"Verify"} loading={mutation.isPending} />
        </form>
        <div className="flex justify-end mt-3 font-medium text-primary">
          <span
            className="cursor-pointer hover:underline ease-in"
            onClick={() => router.push(PAGE_ROUTES.AUTH.SIGN_IN.href)}
          >
            Have an account? Sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModule;
