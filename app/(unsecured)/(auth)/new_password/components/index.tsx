"use client";
import { Button } from "@/components/common/button";
import { TextInput } from "@/components/common/input";
import { API_ROUTES, PAGE_ROUTES } from "@/constants/routes";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const NewPasswordModule = () => {
  const param = useSearchParams();
  const ref = param.get("ref");

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      ref: ref,
      verify_code: "",
      password: "",
      confirm_password: "",
    },
  });

  useEffect(() => {
    setValue("ref", ref);
  }, []);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post(
        API_ROUTES.AUTH.FORGOT_PASSWORD_VERIFICATION as string,
        {
          ref: data.ref,
          verify_code: data.verify_code,
          password: data.password,
        }
      );
      return response?.data;
    },
    onSuccess: (data) => {
      console.log(data);
      const { resp_code, resp_description } = data;
      if (resp_code == "00") {
        toast.success(resp_description);
        router.push(PAGE_ROUTES.AUTH.SIGN_IN.href);
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
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-lg p-8">
          <header className="text-center mb-8 grid gap-3">
            <h1 className="font-bold uppercase text-xl">Ticketing System</h1>
            <p>Kindly enter email to reset your password</p>
          </header>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <TextInput
              label={"OTP Code"}
              name={"verify_code"}
              register={register}
              placeholder={"Enter OTP Code"}
              error={errors.verify_code}
              validation={{ required: true }}
            />
            <TextInput
              label={"New Password"}
              name={"password"}
              register={register}
              type={"password"}
              placeholder={"Enter New Password"}
              error={errors.password}
              validation={{
                required: "Password is required",
              }}
            />
            <TextInput
              label={"Confirm Password"}
              name={"confirm_password"}
              register={register}
              type={"password"}
              placeholder={"Confirm Password"}
              error={errors.confirm_password}
              validation={{
                required: "Confirm password is required",
                validate: (value: string) =>
                  value === watch("password") || "Passwords do not match",
              }}
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
    </Suspense>
  );
};

export default NewPasswordModule;
