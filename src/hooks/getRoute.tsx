"use client";
import { usePathname } from "next/navigation";

const GetRoute = () => {
  const currentPage = usePathname();
  function removeLeadingSlash(input: string): string {
    if (input.startsWith("/")) {
      return input.substring(1);
    }
    return input;
  }

  return removeLeadingSlash(currentPage);
};

export default GetRoute;
