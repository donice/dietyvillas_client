"use client";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

import PaystackLogo from "./assets/paystack.png";
import StripeLogo from "./assets/stripe.png";
import Image, { StaticImageData } from "next/image";
import { TbStarFilled } from "react-icons/tb";

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
  const [paymentGateway, setPaymentGateway] = useState("paystack");
  const searchParams = useSearchParams();

  const url = searchParams.get("url");

  const { data: dynamicPropertyInfo, isLoading } = useQuery({
    queryKey: ["dynamicPropertyInfo", url],
    queryFn: async () => {
      const res = await axiosInstance.get(`/properties/view?url=${url}`);
      return res.data?.data[0];
    },
  });

  console.log("dynamicPropertyInfo", dynamicPropertyInfo);

  return (
    <div className="space-y-6 px-4 py-10 mx-auto max-w-7xl text-gray-600">
      <section className="grid md:grid-cols-2 gap-20">
        <div className="border border-gray-300 rounded-3xl h-fit transition-all">
          {gateways.map((item, idx) => (
            <div
              key={idx}
              className={`flex justify-between p-5 ${
                idx == 0 ? "border-b border-gray-200" : null
              }`}
              onClick={() => {
                setPaymentGateway(item?.name)
              }}
            >
              <Image
                src={item.img}
                alt={item.name}
                width={item.name == "paystack" ? 100 : 50}
              />
              <div className={`w-4 h-4 rounded-full ${paymentGateway == item.name ? "border-5 border-gray-700" : "border border-gray-400"}`}></div>
            </div>
          ))}

        </div>
        <div className="w-full border border-gray-100 shadow p-4 rounded-xl  max-w-sm">
          <div className="flex gap-4 items-center">
            <div className="w-32 h-32 rounded-lg bg-gray-100">
              {dynamicPropertyInfo?.property_images[0].image_link ? (
                <Image
                  src={
                    dynamicPropertyInfo?.property_images[0].image_link || null
                  }
                  width={100}
                  height={100}
                  alt={dynamicPropertyInfo?.title}
                />
              ) : null}
            </div>
            <div>
              <h1 className="font-semibold">{dynamicPropertyInfo?.title}</h1>
              <span className="flex items-center gap-2">
                <TbStarFilled />{" "}
                {dynamicPropertyInfo?.reviews_and_rating.length} (
                {dynamicPropertyInfo?.reviews_and_rating.length}){" "}
              </span>
            </div>
          </div>

          <div className="my-3">
            <h3 className="text-gray-800 font-semibold">Free cancelation</h3>
            <p className="text-sm">Cancel within 24 hours for a full refund.</p>
          </div>

          <div className="border-y py-4 border-gray-200">
            <p className="text-gray-800 font-semibold">Free cancelation</p>
            <p className="text-sm">Cancel within 24 hours for a full refund.</p>
          </div>
          <div className="py-4">
            <p className="text-gray-800 font-semibold">Price details</p>
            <p className="text-sm flex justify-between">
              <span>N170,000 X 5 days</span>
              <span>N850,000</span>
            </p>
            <p className="text-sm flex justify-between">
              <span>Cleaning fees</span>
              <span>N40,000</span>
            </p>
            <p className="text-sm flex justify-between">
              <span>Deity fee (2%)</span>
              <span>N34,000</span>
            </p>
            <p className="text-sm flex justify-between mt-3 font-semibold text-gray-950">
              <span>Total</span>
              <span>N34,000</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DynamicBookingModule;
