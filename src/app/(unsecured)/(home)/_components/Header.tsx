import React, { useState, useEffect } from "react";
import { SkeletonLoader } from "./skeleton/HeaderSkeleton";
import Filters from "./Filters";

interface Category {
  id: string;
  title: string;
}

interface HeaderProps {
  data: any;
  loading: boolean;
  onItemChange?: (categoryId: string | null) => void;
}

const Header = ({ data, loading, onItemChange }: HeaderProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    onItemChange?.(id);
  };

  useEffect(() => {
    if (data?.resp_code === "00" && data?.data?.length && !activeCategory) {
      const firstId = data.data[0]?.id;
      setActiveCategory(firstId);
      onItemChange?.(firstId);
    }
  }, [data]);


  if (loading) return <SkeletonLoader />;

  if (data?.resp_code !== "00") {
    return (
      <div className="flex items-center justify-center p-4">
        <p>{data?.resp_description || "Error loading categories."}</p>
      </div>
    );
  }

  return (
    <div>
       <div className="flex items-center justify-center overflow-x-auto">
      {data?.data.map((category: Category, index: number) => {
        const isActive = activeCategory === category.id;
        const isFirst = index === 0;
        const isLast = index === data.data.length - 1;

        return (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-10 py-2 text-xs md:text-sm font-medium transition
              ${isFirst ? "rounded-tl-3xl" : ""}
              ${isLast ? "rounded-tr-3xl" : ""}
              ${isActive ? "bg-amber-400 text-white border border-amber-400" : " text-gray-700 border border-gray-200"}
              hover:bg-amber-400 hover:border-amber-400 hover:text-white border-b-0
            `}
          >
            {category.title}
          </button>
        );
      })}
    </div>
    <Filters />
    </div>

  );
};

export default Header;
