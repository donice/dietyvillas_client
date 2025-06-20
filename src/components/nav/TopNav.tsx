"use client";
import React from "react";
import { LuBell } from "react-icons/lu";
import Link from "next/link";
import { API_ROUTES } from "@/constants/routes";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Logo from "@/../public/logo.svg"

const TopNav: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_ROUTES.PROFILE.GET_PROFILE);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  console.log("User Data", data);

  return (
    <nav className="fixed top-0 w-full bg-secondary-lighter text-gray-900 z-50">
      <div className="px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center ml-6 md:ml-0">
           <Image src={Logo} alt="logo" width={80} height={36} className="mr-4" />
          </div>

          <div className="flex items-center space-x-8">
            <button
              className="text-gray-900 hover:text-white hidden"
              aria-label="Notifications"
            >
              <LuBell className="text-2xl" />
            </button>

            <div className="relative group">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="bg-gray-300 w-fit rounded-full">
                  {data?.data[0].profile_image ? (
                  <img
                    src={data?.data[0].profile_image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-amber-600 overflow-hidden"></div>
                )}
                </div>

                {isLoading ? (
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <span>
                    {data?.data[0].firstname + " " + data?.data[0].lastname}
                  </span>
                )}
              </div>

              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white rounded-b-lg"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
