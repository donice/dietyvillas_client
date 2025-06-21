"use client";
import { Button } from "@/components/common/button";
import { SelectInput, TextInput } from "@/components/common/input";
import { PAGE_ROUTES } from "@/constants/routes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthHeader from "../../_components/AuthHeader";
import axiosInstance from "@/lib/axiosInstance";
import TermsAndConditions from "@/components/common/t&c";

const formatDateToDDMMYYYY = (d: string) =>
  d ? d.split("-").reverse().join("-") : "";

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
  const [country, setCountry] = React.useState<{
    flag: string;
    dialing_code: string;
  }>({
    flag: "",
    dialing_code: "",
  });

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

  const countryId = watch("country_id");
  const stateId = watch("state_id");

  const mutation = useMutation({
    mutationFn: (data: SignUpForm) =>
      axiosInstance.post("/account/create", {
        ...data,
        date_of_birth: formatDateToDDMMYYYY(data.date_of_birth),
      }),

    onSuccess: (data) => {
      console.log("Signup successful:", data);
      toast.success("Signup successful");
      router.push(PAGE_ROUTES.DASHBOARD.href);
    },
    onError: (error: any) => {
      console.error("Error signing up:", error?.response?.data?.errors?.code);
      toast.error(error?.response?.data?.resp_message || "Error signing up");
      if (error?.response?.data?.errors?.code === "10") {
        router.push("/verify-email?email=" + watch("email"));
      }
    },
  });

  const onSubmit = (data: SignUpForm) => {
    console.log("Form Data:", data);
    mutation.mutate(data);
  };

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      axiosInstance.get("/countries").then((res) => res?.data?.data),
  });

  const { data: states, isLoading: statesIsLoading } = useQuery({
    queryKey: ["states", countryId],
    queryFn: () =>
      axiosInstance
        .get(`/countries/state?country_id=${countryId}`)
        .then((res) => res?.data?.data),
    enabled: !!countryId,
  });

  const { data: cities, isLoading: citiesIsLoading } = useQuery({
    queryKey: ["cities", stateId],
    queryFn: () =>
      axiosInstance
        .get(`/countries/state/area?state_id=${stateId}`)
        .then((res) => res?.data?.data),
    enabled: !!stateId,
  });

  useEffect(() => {
    if (countries && countries.length > 0) {
      const defaultCountry = countries.find(
        (country: any) => country?.id == 211
      );
      setCountry({
        flag: defaultCountry.flag,
        dialing_code: defaultCountry.dialing_code,
      });
      watch("country_id", defaultCountry.id);
    }

    if (countryId > 0) {
      const selectedCountry = countries?.find(
        (country: any) => country.id === countryId
      );
      if (selectedCountry) {
        setCountry({
          flag: selectedCountry.flag,
          dialing_code: selectedCountry.dialing_code,
        });
      }
    }
  }, [countries, countryId]);

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
          <SelectInput
            label="Country"
            name="country_id"
            register={register}
            options={
              countries
                ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
                .map((country: any) => ({
                  value: country.id,
                  label: country.name,
                  fullObject: country,
                })) || []
            }
            placeholder="Select Country"
            error={errors.country_id}
            validation={{
              required: "Country is required",
              valueAsNumber: true,
            }}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const selectedId = Number(e.target.value);

              const selectedCountry = countries?.find(
                (country: any) => country.id === selectedId
              );
              if (selectedCountry) {
                setCountry(selectedCountry);
              }
            }}
          />

          {countryId > 0 && states?.length > 0 && (
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
          <div className="relative">
            <span className="absolute top-9 left-4 z-10 border-r-2 border-gray-300 pr-2">
              {country.flag} {country.dialing_code}
            </span>

            <TextInput
              label="Phone Number"
              name="phone"
              register={register}
              type="tel"
              placeholder=""
              error={errors.phone}
              validation={{ required: "Phone number is required" }}
              className="pl-24"
            />
          </div>

          <TextInput
            label="Date of Birth"
            name="date_of_birth"
            register={register}
            type="date"
            placeholder="YYYY-MM-DD"
            error={errors.date_of_birth}
            validation={{
              required: "Date of birth is required",
              validate: (v: string) =>
                new Date().getFullYear() - new Date(v).getFullYear() >= 18 ||
                "You must be at least 18 years old",
            }}
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
          <TermsAndConditions />
          <Button text="Sign Up" loading={mutation.isPending} />
        </form>
      </div>
    </div>
  );
};

export default SignupModule;
