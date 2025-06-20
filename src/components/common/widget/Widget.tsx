"use client";
import CustomDateDropdown from "@/components/common/dropdown/CustomDateDropdown";
import React from "react";
import HeaderTitle from "../../../app/(secured)/dashboard/_components/HeaderTitle";

const Widget = ({
  children,
  className,
  headerTitle,
  onHeaderSelect,
  loading = false,
}: {
  children: React.ReactNode;
  className?: string;
  headerTitle?: string;
  onHeaderSelect?: (item: string) => void;
  loading?: boolean;
}) => {

  return (
    <section
      className={`shadow-lg shadow-gray-50 bg-white rounded-2xl p-5 border-2 border-gray-100 ${
        className || ""
      }`}
    >
      <div className="pb-2 flex items-center justify-between border-b-2 border-gray-100 ">
        {headerTitle && <HeaderTitle title={headerTitle as string} />}
        <CustomDateDropdown
          onDateSelect={(date) => onHeaderSelect && onHeaderSelect(date)}
        />
      </div>

      {loading ? (
        <section
          className={`shadow-lg shadow-gray-50 bg-white rounded-2xl p-5 border-2 border-gray-100 animate-pulse ${
            className || ""
          }`}
        >
          <div className="pb-2 flex items-center justify-between border-b-2 border-gray-100">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </section>
      ) : (
        children
      )}
    </section>
  );
};

export default Widget;
