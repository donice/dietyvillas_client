import { appConfig } from "@/utils/constants";
import { Metadata } from "next";
import React from "react";
import HomeNav from "./(home)/_components/HomeNav";

export const metadata: Metadata = {
  title: appConfig.name,
  description: appConfig.description,
};

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <HomeNav />
      {children}
    </div>
  );
};

export default MainLayout;
