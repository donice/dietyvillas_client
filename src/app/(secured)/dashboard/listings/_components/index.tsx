"use client";
import { GoDotFill } from "react-icons/go";
import { TbMenu2, TbPlus } from "react-icons/tb";
import { useState } from "react";
import { CustomHeader } from "@/components/common/header/Header";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { HeaderSkeleton } from "@/app/(unsecured)/(home)/_components/skeleton/ListingSkeleton";
import { useRouter } from "next/navigation";

const Listings: React.FC = () => {
  const router = useRouter()
  const [view, setView] = useState("grid");

  const { data: userProperties, isLoading: userPropertiesIsLoading } = useQuery(
    {
      queryKey: ["userProperties"],
      queryFn: async () => {
        const response = await axiosInstance.get(`/properties`);
        return response.data;
      },
    }
  );

    if (userPropertiesIsLoading) {
      return <HeaderSkeleton row_number={4} />;
    }

  return (
    <div>
      <section className="w-full max-w-7xl mx-auto px-5 mt-5">
        <div className="pb-10 flex justify-between items-center">
          <CustomHeader title={"Your listings"} />

          <input
            type="text"
            className="px-5 py-1.5 text-xs border w-full max-w-md rounded-lg bg-gray-100"
            placeholder="Search listings by name or location"
          />

          <div className="flex gap-4 transition-all">
            <div className="bg-gray-200 rounded-full p-2">
              <TbMenu2 />
            </div>
            <div onClick={() => router.push("/dashboard/listings/add")} className="cursor-pointer bg-gray-200 rounded-full p-2 hover:scale-90">
              <TbPlus />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
          {/* {[2].map((property:any, index:number) => ( */}
          {userProperties?.data?.data.map((property: any, index: number) => (
            <div className="bg-white rounded-xl " key={index}>
              <div className="relative">
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-white rounded-md px-3 py-2">
                  <GoDotFill className="text-green-400" />
                  <span className="text-stone-400 text-xs">Listed</span>
                </div>
                <img
                  className="w-full h-64 object-cover rounded-xl"
                  // src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGxpdmluZyUyMHJvb218ZW58MHx8MHx8fDA%3D"
                 src={property?.property_images[0].image_link}
                  alt="Living room"
                />
                <div className="py-4 text-stone-500">
                  <p className="font-semibold text-md">{property?.title}</p>
                  <p className="text-gray-400 text-xs mt-1">
                     {property.area}, {property.state}, {property.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Listings;
