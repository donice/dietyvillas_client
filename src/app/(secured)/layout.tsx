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
      <div>
        <section className="md:ml-64 mt-16 p-4 md:p-10 max-w-7xl">{children}</section>
      </div>
    </AuthGuard>
  );
};

export default MainLayout;
