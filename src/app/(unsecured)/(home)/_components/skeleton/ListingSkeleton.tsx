import React from "react";
import { Skeleton } from "./Skeleton";

export const HeaderSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 py-6">
    {Array.from({ length: 12 }).map((_, index) => (
      <div key={index}>
        <Skeleton className="w-full h-[190px] rounded bg-gray-200" />
        <div className="grid gap-1 my-2">
          <Skeleton className="w-3/4 h-4 bg-gray-200 rounded" />
          <Skeleton className="w-2/3 h-3 bg-gray-200 rounded" />
          <Skeleton className="w-1/3 h-4 bg-gray-200 rounded" />
        </div>
      </div>
    ))}
  </div>
);
