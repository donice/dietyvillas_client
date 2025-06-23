import React from "react";

export const SkeletonLoader = () => (
  <div className="flex items-center justify-center overflow-x-auto p-2 space-x-[0.95px]">
    {Array.from({ length: 3 }).map((_, index, arr) => {
      const isFirst = index === 0;
      const isLast = index === arr.length - 1;
      return (
        <div
          key={index}
          className={` ${isFirst ? "rounded-tl-3xl" : ""}
            ${isLast ? "rounded-tr-3xl" : ""}
            px-6 py-2 bg-gray-300 animate-pulse w-24 h-8

          `}
        ></div>
      );
    })}
  </div>
);
