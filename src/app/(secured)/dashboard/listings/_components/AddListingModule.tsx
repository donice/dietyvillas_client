"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import clsx from "clsx"; // Optional for cleaner class toggling. Remove if not used.

const tabs = [
  { key: "title", label: "Title" },
  { key: "propertyType", label: "Property Type" },
  { key: "photoTour", label: "Photo Tour" },
  { key: "guests", label: "Number of Guests" },
  { key: "description", label: "Description" },
  { key: "amenities", label: "Amenities" },
  { key: "location", label: "Location" },
  { key: "houseRules", label: "House Rules" },
  { key: "guestSafety", label: "Guest Safety" },
];

const AddListingModule = () => {
  const router = useRouter();
  const [openedTab, setOpenedTab] = useState<string | null>("title");

  const renderTabContent = () => {
    switch (openedTab) {
      case "title":
        return <div className="p-4 border rounded-xl"> {/* Example content */}
          <h2 className="text-xl font-semibold mb-2">Add a Title</h2>
          <input type="text" placeholder="Beautiful beachfront apartment" className="w-full p-2 border rounded" />
        </div>;

      case "propertyType":
        return <div className="p-4 border rounded-xl">Choose a property type (House, Apartment, Guest House...)</div>;

      case "photoTour":
        return <div className="p-4 border rounded-xl">Upload Photos of Your Property</div>;

      case "guests":
        return <div className="p-4 border rounded-xl">Specify the number of guests allowed</div>;

      case "description":
        return <div className="p-4 border rounded-xl">Write a detailed description of your property</div>;

      case "amenities":
        return <div className="p-4 border rounded-xl">Select available amenities</div>;

      case "location":
        return <div className="p-4 border rounded-xl">Enter the property location</div>;

      case "houseRules":
        return <div className="p-4 border rounded-xl">Set house rules for guests</div>;

      case "guestSafety":
        return <div className="p-4 border rounded-xl">Add guest safety information</div>;

      default:
        return <div className="flex justify-center items-center h-full text-gray-400">Select a tab to modify</div>;
    }
  };

  return (
    <div className="grid grid-cols-3 gap-10">
      {/* Sidebar */}
      <aside className="grid gap-3 transition-all duration-200">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-4 text-gray-500 hover:text-black"
        >
          <BsArrowLeftCircleFill className="text-2xl" />
          <span className="font-semibold">Back</span>
        </button>

        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setOpenedTab(tab.key)}
            className={clsx(
              "border p-4 rounded-xl text-left",
              openedTab === tab.key
                ? "border-amber-400 shadow shadow-amber-100 bg-gray-50"
                : "border-gray-300 hover:border-black"
            )}
          >
            <h3 className="text-sm font-medium">{tab.label}</h3>
            <span>-</span>
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <section className="col-span-2">{renderTabContent()} </section>
    </div>
  );
};

export default AddListingModule;
