"use client";
import { Button } from "@/components/common/button";
import { TextInput } from "@/components/common/input";
import { PAGE_ROUTES } from "@/constants/routes";
import { useAuthDispatch, logout, login } from "@/context/authContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SigninModule = () => {
  const dispatch = useAuthDispatch();
  useEffect(() => {
    handleLogout();
    sessionStorage.clear();
  }, []);

  const handleLogout = () => {
    logout(dispatch);
  };

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
    mutationFn: (data: { email: string; password: string }) =>
      login(dispatch, data),
    onSuccess: () => {
      router.push(PAGE_ROUTES.DASHBOARD.href);
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg p-8">
        <header className="text-center mb-8 grid gap-3">
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
          <TextInput
            label={"Password"}
            name={"password"}
            register={register}
            type={"password"}
            placeholder={"Enter Password"}
            error={errors.password}
            validation={{
              required: "Password is required",
            }}
          />

          <Button text={"Login"} loading={mutation.isPending} />
        </form>
        <div className="flex justify-end mt-3 font-medium text-primary">
          <span
            className="cursor-pointer hover:underline ease-in"
            onClick={() => router.push(PAGE_ROUTES.AUTH.FORGOT_PASSWORD.href)}
          >
            Forgot Password?
          </span>
        </div>
      </div>
    </div>
  );
};

export default SigninModule;
