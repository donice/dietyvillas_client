"use client";
import CustomDateDropdown from "@/components/common/dropdown/CustomDateDropdown";
import HeaderDropdown from "@/components/common/dropdown/HeaderDropdown";
import React from "react";

const HeaderSelectWidget = ({
  children,
  className,
  headerList,
  headerLabel,
  onHeaderSelect,
  onFilterSelect,
}: {
  children: React.ReactNode;
  className?: string;
  headerList?: string[];
  headerLabel?: string;
  onHeaderSelect?: (item: string) => void;
  onFilterSelect?: (item: string) => void;
}) => {
  return (
    <section
      className={`shadow-lg shadow-gray-50 bg-white rounded-2xl p-5 border-2 border-gray-100 ${
        className || ""
      }`}
    >
      <div className="pb-2 flex items-center justify-between border-b-2 border-gray-100 ">
        <HeaderDropdown
          onHeaderSelect={(item) => onHeaderSelect?.(item)}
          label={headerLabel}
          list={headerList || []}
        />
        <CustomDateDropdown
          onDateSelect={(date) => onFilterSelect && onFilterSelect(date)}
        />
      </div>
      {children}
    </section>
  );
};

export default HeaderSelectWidget;
