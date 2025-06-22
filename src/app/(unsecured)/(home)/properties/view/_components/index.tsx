"use client";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Amenities from "./Amenities";
import Description from "./Description";
import ImageGallery from "./ImageGallery";
import { useSearchParams } from "next/navigation";
import Host from "./Host";
import CheckinDate from "./CheckinDate";
import PriceCalculator from "./PriceCalculator";
import Location from "./Location";
// import Reviews from "./Reviews";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-300 rounded ${className}`} />
);

export const formatDate = (s: string | null) => s ? ((d => `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}`)(new Date(s))) : null;

const DynamicPropertyDetailsModule = () => {
  const searchParams = useSearchParams();

  const url = searchParams.get("url");
  const [dateRange, setDateRange] = useState<any>({});

  const { data: dynamicPropertyInfo, isLoading } = useQuery({
    queryKey: ["dynamicPropertyInfo", url],
    queryFn: async () => {
      const res = await axiosInstance.get(`/properties/view?url=${url}`);
      return res.data?.data[0];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6 px-4 py-10 mx-auto max-w-7xl">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="px-4 pt-10 pb-40 mx-auto max-w-7xl">
      <ImageGallery
        data={dynamicPropertyInfo}
        images={dynamicPropertyInfo?.property_images || []}
      />
      <div className="grid md:grid-cols-2 gap-20">
        <section className="max-w-2xl">
          {" "}
          <Host data={dynamicPropertyInfo} />
          <Description data={dynamicPropertyInfo} />
          <Amenities data={dynamicPropertyInfo} />{" "}
          <CheckinDate
            value={dateRange}
            onChange={setDateRange}
            minRangeDays={2}
            maxRangeDays={30}
            locale="en-US"
          />
        </section>

        <PriceCalculator />
      </div>
      <Location data={dynamicPropertyInfo}/>

      {/*<Reviews /> */}
    </div>
  );
};

export default DynamicPropertyDetailsModule;
