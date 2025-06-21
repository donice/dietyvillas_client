"use client";
import React from "react";
import Image from "next/image";
import Logo from "@/../public/logo.svg";
import { useRouter } from "next/navigation";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import Link from "next/link";

const AuthLayoutHeader = () => {
  const router = useRouter();

  return (
    <div className="py-10 w-full max-w-6xl mx-auto px-4">
      <div className="flex justify-end">
        <button onClick={() => router.back()} className="curs">
          <BsFillArrowLeftSquareFill className="text-2xl" />
        </button>
      </div>

      <Link href={"/"}>
        <Image
          src={Logo}
          alt="Deity Villas Logo"
          className="h-14 w-auto mx-auto my-4"
        />
      </Link>
    </div>
  );
};

export default AuthLayoutHeader;
