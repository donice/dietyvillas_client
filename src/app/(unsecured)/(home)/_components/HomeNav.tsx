"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import Logo from "@/../public/logo.svg";
import Link from "next/link";
import { TbMenu2 } from "react-icons/tb";
import { GrFormClose } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

const HomeNav = () => {
    const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openMenu = () => {
    dialogRef.current?.showModal();
  };

  const closeMenu = () => {
    dialogRef.current?.close();
  };

  const { data: accountData, isLoading } = useQuery({
    queryKey: ["accountData"],
    queryFn: async () => {
      const res = await axiosInstance.get("/user/account");
      return res?.data;
    },
  });

  const userAccount = accountData?.data[0] || {};

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white text-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-8 w-full max-w-7xl mx-auto">
        <Link href={"/"}>
          <Image src={Logo} alt="Deity Villas Logo" className="h-8 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href={"/"}
            className="px-4 py-2 font-medium hover:text-amber-500 transition"
          >
            Switch to Hosting
          </Link>

          {userAccount?.firstname ? (
            <div className="flex items-center gap-2">
              <TbMenu2 size={24} className="relative cursor-pointer" onClick={() => setOpen((prev) => !prev)}/>
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                {isLoading ? (
                  <div className="animate-pulse w-6 h-6 rounded-full bg-gray-400" />
                ) : userAccount.profile_image ? (
                  <img
                    src={userAccount.profile_image}
                    alt="Profile"
                    className="w-8 h-8 object-cover"
                  />
                ) : null}
              </div>{" "}
              <p>{userAccount?.firstname + " " + userAccount?.lastname}</p>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                href={"/signin"}
                className="px-6 py-2 rounded-full bg-white border-2 border-amber-400 text-amber-400 font-semibold hover:bg-amber-100 transition"
              >
                Login
              </Link>
              <Link
                href={"/signup"}
                className="px-6 py-2 rounded-full text-white bg-amber-400 font-semibold border border-amber-400 hover:bg-amber-600 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={openMenu}
          className=" md:hidden p-2 rounded hover:bg-gray-100 transition"
          aria-label="Open menu"
        >
          <TbMenu2 size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <dialog
        ref={dialogRef}
        className="fixed top-0 right-0 z-50 w-screen p-0 bg-white border-none open:animate-slide-in"
      >
        <div className="flex justify-between items-center px-4 py-2.5 border-b border-gray-200">
          <Image src={Logo} alt="Deity Villas Logo" className="h-8 w-auto" />
          <button
            onClick={closeMenu}
            className="p-2 rounded hover:bg-gray-100 transition"
            aria-label="Close menu"
          >
            <GrFormClose size={28} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-4 py-6 text-lg">
          <Link
            href={"/"}
            onClick={closeMenu}
            className="hover:text-amber-500 transition"
          >
            Switch to Hosting
          </Link>
          <Link
            href={"/signin"}
            onClick={closeMenu}
            className="px-4 py-2 rounded-full bg-white border-2 border-amber-400 text-amber-400 font-semibold hover:bg-amber-100 transition"
          >
            Login
          </Link>
          <Link
            href={"/signup"}
            onClick={closeMenu}
            className="px-4 py-2 rounded-full text-white bg-amber-400 font-semibold border border-amber-400 hover:bg-amber-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </dialog>

      <style jsx global>{`
        dialog[open] {
          animation: slide-in 0.3s forwards;
        }
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>

       {open && (
        <div className="absolute right-24 mt-2 w-40 bg-white rounded-lg shadow-lg transition z-50">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-400 hover:text-white rounded-t-lg"
          >
            View Profile
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-400 hover:text-white rounded-b-lg"
          >
            Dashboard
          </Link>
          <Link
            href="/signin"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-400 hover:text-white rounded-b-lg"
          >
            Sign out
          </Link>
        </div>
      )}
    </nav>
  );
};

export default HomeNav;
