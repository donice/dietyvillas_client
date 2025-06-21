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
import AuthHeader from "../../_components/AuthHeader";

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
      options: "test@gmail.com",
      password: "Smilesme@2024",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: { options: string; password: string }) =>
      login(dispatch, data),
    onSuccess: () => {
      // toast.success("Login successful");
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
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg p-8">
        <AuthHeader
          title="Welcome Back"
          desc="Kindly confirm your login details"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <TextInput
            label={"Email"}
            name={"options"}
            register={register}
            type={"email"}
            placeholder={"example@test.com"}
            error={errors.options}
            validation={{ required: true }}
          />
          <TextInput
            label={"Password"}
            name={"password"}
            register={register}
            type={"password"}
            placeholder={"**********"}
            error={errors.password}
            validation={{
              required: "Password is required",
            }}
          />
          <div className="flex justify-end -mt-3 font-medium text-primary">
            <span
              className="cursor-pointer hover:underline ease-in"
              onClick={() => router.push(PAGE_ROUTES.AUTH.FORGOT_PASSWORD.href)}
            >
              Forgot Password?
            </span>
          </div>
          <Button text={"Login"} loading={mutation.isPending} />
        </form>
      </div>
    </div>
  );
};

export default SigninModule;
