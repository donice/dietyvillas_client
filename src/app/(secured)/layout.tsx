import TopNav from "@/components/nav/TopNav";
import AuthGuard from "@/constants/AuthGuard";
import { appConfig } from "@/utils/constants";
import { Metadata } from "next";
import React from "react";

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
    <AuthGuard>
      <TopNav />
        <section className="mt-24 p-4 max-w-7xl mx-auto">{children}</section>
    </AuthGuard>
  );
};

export default MainLayout;
