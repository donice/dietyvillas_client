"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";

const AddListingModule = () => {
  const router = useRouter();
  const [openedTab, setopenedTab] = useState("title")
  return (
    <div className="grid grid-cols-3 gap-10">
      <section className="grid gap-3">
        <div className="flex items-center gap-2 mb-4">
          <BsArrowLeftCircleFill className="text-2xl text-gray-300" />
          <span className="font-semibold"> Add Listing</span>
        </div>

        <div className="border border-gray-300 p-4 rounded-xl">
          <h3 className="text-sm">Title</h3>
          <div>-</div>
        </div>
        <div className="border border-gray-300 p-4 rounded-xl">
          <h3 className="text-sm">Property Type</h3>
          <div>-</div>
        </div>
        <div className="border border-gray-300 p-4 rounded-xl">
          <h3 className="text-sm">Photo tour</h3>
          <div>-</div>
        </div>
        <div className="border border-gray-300 p-4 rounded-xl">
          <h3 className="text-sm">Number of guests</h3>
          <div>-</div>
        </div>
        <div className="border border-gray-300 p-4 rounded-xl">
          <h3 className="text-sm">Description</h3>
          <div>-</div>
        </div>
        <div className="border border-gray-300 p-4 rounded-xl">
          <h3 className="text-sm">Amenities</h3>
          <div>-</div>
        </div>
        <div className="border border-gray-300 p-4 rounded-xl">
          <h3 className="text-sm">Location</h3>
          <div>-</div>
        </div>
        <div className="border border-gray-300 p-4 rounded-xl">
          <h3 className="text-sm">House Rules</h3>
          <div>-</div>
        </div>
        <div className="border border-gray-300 p-4 rounded-xl">
          <h3 className="text-sm">Guest Safety</h3>
          <div>-</div>
        </div>
      </section>

      <section className="col-span-2">
{
  openedTab == null ? <div className="flex justify-center items-center h-full">Select a Tab to modify</div> : null
}
      </section>
    </div>
  );
};

export default AddListingModule;
