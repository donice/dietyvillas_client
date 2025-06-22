"use client";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import PaystackLogo from "./assets/paystack.png";
import StripeLogo from "./assets/stripe.png";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/common/button";
import toast from "react-hot-toast";
import Summary from "./Summary";

const gateways: {
  name: string;
  img: StaticImageData;
}[] = [
  {
    name: "paystack",
    img: PaystackLogo,
  },
  {
    name: "stripe",
    img: StripeLogo,
  },
];

const DynamicBookingModule = () => {
  const router = useRouter();
  const [paymentGateway, setPaymentGateway] = useState("paystack");
  const searchParams = useSearchParams();

  const url = searchParams.get("url");
  const booking_id = searchParams.get("booking_id");
  const amount = searchParams.get("amount");


  const mutatePaystackPayment = useMutation({
    mutationKey: ["mutatePaystackPayment"],
    mutationFn: async () => {
      const res = axiosInstance.post("/properties/payment/paystack", {
        amount: amount,
        booking_id: booking_id,
        description: "Paystack Payment for:" + booking_id,
      });
      return res;
    },
    onSuccess: (res) => {
      const { resp_code, data, resp_description } = res.data;
      if (resp_code == "00") {
        toast.success(resp_description || " ");
        (data?.url !== "" || null) && router.push(data?.url);
      } else {
        toast.error("Error making payment")
      }
      console.log(res?.data);
    },
  });

  const mutateStripePayment = useMutation({
    mutationKey: ["mutateStripePayment"],
    mutationFn: async () => {
      const res = axiosInstance.post("/properties/payment/stripe", {
        amount: amount,
        booking_id: booking_id,
        description: "Stack Payment for:" + booking_id,
      });
      return res;
    },
     onSuccess: (res) => {
      const { resp_code, data, resp_description } = res.data;
      if (resp_code == "00") {
        toast.success(resp_description || " ");
        (data?.url !== "" || null) && router.push(data?.url);
      } else {
        toast.error("Error making payment")
      }
      console.log(res?.data);
    },
  });

  return (
    <div className="space-y-6 px-4 py-10 mx-auto max-w-7xl text-gray-600">
      <section className="grid md:grid-cols-2 gap-20">
        <div className="grid gap-4 transition-all h-fit">
          <div className="border border-gray-300 rounded-3xl h-fit ">
            {gateways.map((item, idx) => (
              <div
                key={idx}
                className={`flex justify-between p-5 ${
                  idx == 0 ? "border-b border-gray-200" : null
                }`}
                onClick={() => {
                  setPaymentGateway(item?.name);
                }}
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  width={item.name == "paystack" ? 100 : 50}
                />
                <div
                  className={`w-4 h-4 rounded-full ${
                    paymentGateway == item.name
                      ? "border-5 border-gray-700"
                      : "border border-gray-400"
                  }`}
                ></div>
              </div>
            ))}
          </div>

          <Button
            text={"Next"}
            onClick={() =>
              paymentGateway == "paystack"
                ? mutatePaystackPayment.mutate()
                : mutateStripePayment.mutate()
            }
            className="py-4 rounded-3xl bg-gray-900 hover:bg-gray-700"
            loading={
              mutatePaystackPayment.isPending || mutateStripePayment.isPending
            }
          />
        </div>
       <Summary url={url} />
      </section>
    </div>
  );
};

export default DynamicBookingModule;
