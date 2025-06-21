"use client";
import { Button } from "@/components/common/button";
import { SelectInput, TextInput } from "@/components/common/input";
import { PAGE_ROUTES } from "@/constants/routes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthHeader from "../../_components/AuthHeader";
import axiosInstance from "@/lib/axiosInstance";

type SignUpForm = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
  date_of_birth: string;
  country_id: number;
  state_id: number;
  city_id: number;
  is_social: boolean;
};

const SignupModule = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phone: "",
      date_of_birth: "",
      country_id: 0,
      state_id: 0,
      city_id: 0,
      is_social: false,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: SignUpForm) => axiosInstance.post("/auth/signup", data),
    onSuccess: () => {
      toast.success("Signup successful");
      router.push(PAGE_ROUTES.DASHBOARD.href);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.resp_message || "Error signing up");
    },
  });

  const onSubmit = (data: SignUpForm) => {
    mutation.mutate(data);
  };

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: () => axiosInstance.get(`/countries`).then((res) => res?.data?.data),
  });

  const countryId = watch("country_id");
  const stateId = watch("state_id");

  const { data: states } = useQuery({
    queryKey: ["states", countryId],
    queryFn: () =>
      axiosInstance.get(`/countries/states/${countryId}`).then((res) => res?.data?.data),
    enabled: !!countryId,
  });

  const { data: cities } = useQuery({
    queryKey: ["cities", stateId],
    queryFn: () =>
      axiosInstance.get(`/countries/cities/${stateId}`).then((res) => res?.data?.data),
    enabled: !!stateId,
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg p-8">
        <AuthHeader
          title="Join our Platform"
          desc="Tell us a little about you!"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <TextInput
            label="First Name"
            name="firstname"
            register={register}
            type="text"
            placeholder="John"
            error={errors.firstname}
            validation={{ required: "First name is required" }}
          />
          <TextInput
            label="Last Name"
            name="lastname"
            register={register}
            type="text"
            placeholder="Doe"
            error={errors.lastname}
            validation={{ required: "Last name is required" }}
          />
          <TextInput
            label="Email"
            name="email"
            register={register}
            type="email"
            placeholder="example@test.com"
            error={errors.email}
            validation={{ required: "Email is required" }}
          />
          <TextInput
            label="Password"
            name="password"
            register={register}
            type="password"
            placeholder="**********"
            error={errors.password}
            validation={{ required: "Password is required" }}
          />
          <SelectInput
            label="Country"
            name="country_id"
            register={register}
            options={
              countries?.map((country: any) => ({
                value: country.id,
                label: country.name,
              })) || []
            }
            placeholder="Select Country"
            error={errors.country_id}
            validation={{
              required: "Country is required",
              valueAsNumber: true,
            }}
          />
          {countryId > 0 && (
            <SelectInput
              label="State"
              name="state_id"
              register={register}
              options={
                states?.map((state: any) => ({
                  value: state.id,
                  label: state.name,
                })) || []
              }
              placeholder="Select State"
              error={errors.state_id}
              validation={{
                required: "State is required",
                valueAsNumber: true,
              }}
            />
          )}
          {stateId > 0 && (
            <SelectInput
              label="City"
              name="city_id"
              register={register}
              options={
                cities?.map((city: any) => ({
                  value: city.id,
                  label: city.name,
                })) || []
              }
              placeholder="Select City"
              error={errors.city_id}
              validation={{
                required: "City is required",
                valueAsNumber: true,
              }}
            />
          )}
          <TextInput
            label="Phone Number"
            name="phone"
            register={register}
            type="tel"
            placeholder="+234..."
            error={errors.phone}
            validation={{ required: "Phone number is required" }}
          />
          <TextInput
            label="Date of Birth"
            name="date_of_birth"
            register={register}
            type="date"
            placeholder="YYYY-MM-DD"
            error={errors.date_of_birth}
            validation={{ required: "Date of birth is required" }}
          />
          <div className="flex justify-end -mt-2 font-medium text-primary text-sm">
            <span
              className="cursor-pointer hover:underline"
              onClick={() => router.push(PAGE_ROUTES.AUTH.FORGOT_PASSWORD.href)}
            >
              Forgot Password?
            </span>
          </div>
          <Button text="Sign Up" loading={mutation.isPending} />
        </form>
      </div>
    </div>
  );
};

export default SignupModule;
