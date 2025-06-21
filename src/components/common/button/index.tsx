"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { LoaderIcon } from "react-hot-toast";

interface ButtonProps {
  text: React.ReactNode;
  onClick?: () => void;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  href,
  loading = false,
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-white font-medium transition-all ease-in-out";
  const enabledStyles = "bg-amber-400 hover:bg-amber-400 hover:rounded-lg";
  const disabledStyles = "bg-gray-400 cursor-not-allowed";
  const loadingSpinner = (
   <LoaderIcon />
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          baseStyles,
          disabled || loading ? disabledStyles : enabledStyles,
          className
        )}
      >
        {loading && loadingSpinner}
        {text}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        disabled || loading ? disabledStyles : enabledStyles,
        className
      )}
    >
      {loading && loadingSpinner}
      {text}
    </button>
  );
};

export const FormButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  href,
  loading = false,
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "fw-full p-2.5 font-bold bg-stone-100 text-stone-800 rounded-lg hover:bg-stone-400 transition-all ease-in-out";
  const enabledStyles = "bg-gray-600 hover:bg-gray-700 hover:rounded-lg";
  const disabledStyles = "bg-gray-400 cursor-not-allowed";
  const loadingSpinner = (
   <span className="flex justify-center items-center"><LoaderIcon /></span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          baseStyles,
          disabled || loading ? disabledStyles : enabledStyles,
          className
        )}
      >
        {loading ? loadingSpinner : text}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        disabled || loading ? disabledStyles : enabledStyles,
        className
      )}
    >
      {loading ? loadingSpinner : text}
    </button>
  );
};
