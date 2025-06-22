"use client"
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Image from "next/image";
import { TbStarFilled } from "react-icons/tb";

const Summary = ({ url }: any) => {
  const { data: dynamicPropertyInfo, isLoading } = useQuery({
    queryKey: ["dynamicPropertyInfo", url],
    queryFn: async () => {
      const res = await axiosInstance.get(`/properties/view?url=${url}`);
      return res.data?.data[0];
    },
  });

  if (isLoading) {
    return (
      <div className="w-full border border-gray-100 shadow p-4 rounded-xl max-w-sm animate-pulse space-y-4">
        <div className="flex gap-4 items-center">
          <div className="w-32 h-32 rounded-lg bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-200 rounded w-full" />
        </div>
        <div className="space-y-2 border-y py-4 border-gray-100">
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-full" />
        </div>
        <div className="space-y-2 py-4">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border border-gray-100 shadow p-4 rounded-xl max-w-sm">
      <div className="flex gap-4 items-center">
        <div className="w-32 h-32 rounded-lg bg-gray-100 relative overflow-hidden">
          {dynamicPropertyInfo?.property_images[0]?.image_link && (
            <Image
              src={dynamicPropertyInfo?.property_images[0]?.image_link}
              alt={dynamicPropertyInfo?.title}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="max-w-1/2">
          <h1 className="font-semibold">{dynamicPropertyInfo?.title}</h1>
          <span className="flex items-center gap-2 text-sm text-gray-600">
            <TbStarFilled className="text-amber-500" />
            {dynamicPropertyInfo?.reviews_and_rating.length} (
            {dynamicPropertyInfo?.reviews_and_rating.length})
          </span>
        </div>
      </div>

      <div className="my-3">
        <h3 className="text-gray-800 font-semibold">Free cancelation</h3>
        <p className="text-sm text-gray-500">
          Cancel within 24 hours for a full refund.
        </p>
      </div>

      <div className="border-y py-4 border-gray-200">
        <p className="text-gray-800 font-semibold">Free cancelation</p>
        <p className="text-sm text-gray-500">
          Cancel within 24 hours for a full refund.
        </p>
      </div>

      <div className="py-4">
        <p className="text-gray-800 font-semibold">Price details</p>
        <p className="text-sm flex justify-between text-gray-700">
          <span>N170,000 X 5 days</span>
          <span>N850,000</span>
        </p>
        <p className="text-sm flex justify-between text-gray-700">
          <span>Cleaning fees</span>
          <span>N40,000</span>
        </p>
        <p className="text-sm flex justify-between text-gray-700">
          <span>Deity fee (2%)</span>
          <span>N34,000</span>
        </p>
        <p className="text-sm flex justify-between mt-3 font-semibold text-gray-900">
          <span>Total</span>
          <span>N34,000</span>
        </p>
      </div>
    </div>
  );
};

export default Summary;
