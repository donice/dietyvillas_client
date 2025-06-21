"use client";
import { Button } from "@/components/common/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthHeader from "../../_components/AuthHeader";
import axios from "axios";

const VerifyEmailModule = () => {
const searchParams = useSearchParams();
 const email = searchParams.get('email')

 console.log("Email from search params:", email);

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: { options: string; password: string }) => {
      const res = axios.post("/api/auth/login", data);
      return res;
    },
    onSuccess: (data) => {
     console.log("Login successful:", data);
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
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg p-8">
        <AuthHeader
          title="Confirm your email"
          desc={`Enter the  4 digit One time Passcode sent to
${email}`}
        />
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">

          <Button text={"Login"} loading={mutation.isPending} />
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailModule;
