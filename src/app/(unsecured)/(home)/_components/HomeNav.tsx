import React, { useState, useEffect } from "react";

interface Category {
  id: string;
  title: string;
}

interface HomeNavProps {
  data: any;
  loading: boolean;
  onItemChange?: (categoryId: string | null) => void;
}

const HomeNav = ({ data, loading, onItemChange }: HomeNavProps) => {
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

  const SkeletonLoader = () => (
    <div className="flex items-center justify-center overflow-x-auto p-2 space-x-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="px-6 py-2 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse w-24 h-8"
        ></div>
      ))}
    </div>
  );

  if (loading) return <SkeletonLoader />;

  if (data?.resp_code !== "00") {
    return (
      <div className="flex items-center justify-center p-4">
        <p>{data?.resp_description || "Error loading categories."}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center overflow-x-auto p-2 ">
      {data?.data.map((category: Category, index: number) => {
        const isActive = activeCategory === category.id;
        const isFirst = index === 0;
        const isLast = index === data.data.length - 1;

        return (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-6 py-2 text-sm font-medium transition
              ${isFirst ? "rounded-tl-3xl" : ""}
              ${isLast ? "rounded-tr-3xl" : ""}
              ${isActive ? "bg-amber-400 text-white border border-amber-400" : " text-gray-700 border border-gray-300"}
              hover:bg-amber-400 hover:border-amber-400 hover:text-white
            `}
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
};

export default HomeNav;
