"use client";
import { useState, useRef } from "react";
import Upcoming from "./Upcoming";
import { CustomHeader } from "@/components/common/header/Header";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

const tabs = ["upcoming", "completed", "cancelled", "all"];

const Reservations = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (index: number) => {
    setActiveTab(index);

    if (navRef.current) {
      const tabElement = navRef.current.children[index] as HTMLButtonElement;
      const navContainer = navRef.current;

      // Calculate scroll position to bring the selected tab into view
      const offsetLeft = tabElement.offsetLeft;
      const navWidth = navContainer.clientWidth;
      const tabWidth = tabElement.clientWidth;

      // Scroll to the center of the selected tab
      navContainer.scrollTo({
        left: offsetLeft - navWidth / 2 + tabWidth / 2,
        behavior: "smooth",
      });
    }
  };

  // const { data: userReservations } = useQuery({
  //   queryKey: ["userReservations"],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get("/messaging/conversation");
  //     return res?.data;
  //   },
  // });

  // console.log("userReservations", userReservations);

  return (
    <div>
      <div className="flex flex-col gap-3">
        {/* Dropdown Filter */}
        <div className="flex justify-between gap-2 py-6">
          <CustomHeader title="Reservations" />
        </div>

        <nav
          ref={navRef}
          className="flex gap-6 border-b border-[#00000080] overflow-x-auto no-scrollbar"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => handleTabClick(index)}
              className={`pb-2 whitespace-nowrap cursor-pointer transition-all ${
                activeTab === index
                  ? "border-b-2 border-[#EAB308] text-[#EAB308] font-semibold"
                  : "text-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        {/* Content Slider */}
        <div className="overflow-hidden relative w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeTab * 100}%)` }}
          >
            {tabs.map((tab) => {
              const renderContent = () => {
                switch (tab) {
                  case "upcoming":
                    return (
                      <>
                        <Upcoming />
                      </>
                    );
                  case "completed":
                    return <Upcoming />;
                  case "cancelled":
                    return <Upcoming />;
                  case "all":
                    return <Upcoming />;
                  default:
                    return null;
                }
              };

              return (
                <div key={tab} className="min-w-full text-center">
                  {renderContent()}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
