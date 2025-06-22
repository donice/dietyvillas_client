"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/../public/logo.svg";
import {
  TbBellFilled,
  TbHome,
  TbMail,
  TbList,
  TbCalendar,
  TbMenu2,
  TbX,
} from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/routes";

const navLinks = [
  { name: "Overview", href: "/dashboard", icon: TbHome },
  { name: "Inbox", href: "/dashboard/inbox", icon: TbMail },
  { name: "Listings", href: "/dashboard/listings", icon: TbList },
  { name: "Reservations", href: "/dashboard/reservations", icon: TbCalendar },
  { name: "Menu", href: "/dashboard/menu", icon: TbMenu2 },
];

const DashboardNav: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white text-gray-900 z-50 border-b border-gray-200">
      <div className="px-4 py-4 w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Image
                src={Logo}
                alt="logo"
                width={80}
                height={36}
                className="cursor-pointer"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ name, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 text-sm font-medium hover:text-amber-500 transition ${
                  pathname.startsWith(href) ? "text-amber-500" : "text-gray-500"
                }`}
              >
                <Icon className="text-xl" />
                {name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4 md:space-x-6">
            <button className="relative cursor-pointer">
              <TbBellFilled className="text-2xl text-gray-400 hover:text-amber-500 transition" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <ProfileMenu />

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? (
                <TbX className="text-2xl text-gray-500" />
              ) : (
                <TbMenu2 className="text-2xl text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-5">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 text-sm font-medium hover:text-amber-500 transition ${
                pathname.startsWith(href) ? "text-amber-500" : "text-gray-500"
              }`}
            >
              <Icon className="text-lg" />
              {name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default DashboardNav;

const ProfileMenu = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_ROUTES.PROFILE.GET_PROFILE);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const [open, setOpen] = useState(false);
  const profileImage = data?.data[0]?.profile_image;

  return (
    <div className="relative">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer flex items-center gap-2"
      >
        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
          {isLoading ? (
            <div className="animate-pulse w-6 h-6 rounded-full bg-gray-400" />
          ) : profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-8 h-8 object-cover"
            />
          ) : null}
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg transition z-50">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-400 hover:text-white rounded-t-lg"
          >
            View Profile
          </Link>
          <Link
            href="/dashboard/listings"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-400 hover:text-white rounded-b-lg"
          >
            Listings
          </Link>
        </div>
      )}
    </div>
  );
};
