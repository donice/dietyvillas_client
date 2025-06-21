import { appConfig } from "@/utils/constants";
import { Metadata } from "next";
import React from "react";
import AuthLayoutHeader from "./_components/AuthLayoutHeader";

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
      <AuthLayoutHeader />

      {children}
    </div>
  );
};

export default MainLayout;
