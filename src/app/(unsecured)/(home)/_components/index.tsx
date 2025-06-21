"use client";
import React from "react";
import HomeNav from "./HomeNav";
import Header from "./Header";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import Listing from "./Listing";

const HomePageModule = () => {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null
  );
  const { data: categories, isLoading: categoriesIsLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories");
      return response.data;
    },
  });
  const { data: properties, isLoading: propertiesIsLoading } = useQuery({
    queryKey: ["properties", activeCategory],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/properties${activeCategory ? "/category" : ""}`,
        {
          params: {
            property_categories_id: activeCategory,
          },
        }
      );
      return response.data;
    },
  });

  return (
    <div className="p-4">
      <HomeNav data={[]} loading={false} />
      <Header
        data={categories}
        loading={categoriesIsLoading}
        onItemChange={(item) => {
          console.log(item);
          setActiveCategory(item);
        }}
      />
      <Listing data={properties} loading={propertiesIsLoading} />
    </div>
  );
};

export default HomePageModule;
