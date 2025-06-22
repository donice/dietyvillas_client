import CustomDialog, { handleToggleDialog } from "@/components/common/modal";
import React from "react";

const Location = () => {
  return (
    <div className="py-10 border-b border-gray-200">
      <header>
        <h3 className="text-xl font-medium">Where you&rsquo;ll stay</h3>
        <p>123 Victoria Island, Ikoyi, Lagos State.</p>
      </header>
      <div className="h-56 w-full bg-gray-300 rounded-lg mt-4"></div>
 <p className="text-gray-700 mb-4 pt-5">
        We are a secure neighborhood with security fencing around the perimeter.
        The properties are all large and very private. Being so high on the
        mountain we are afforded the luxury of peace and quiet with only
        birdsong interrupting.
      </p>
      <button
        onClick={() => handleToggleDialog("viewLocation", true)}
        className="underline"
      >
        Show more
      </button>

      <CustomDialog
        onClose={() => handleToggleDialog("viewLocation", false)}
        id={"viewLocation"}
        header="About this place"
      >
        <p className="text-gray-700 mb-4 pt-5">
          We are a secure neighborhood with security fencing around the
          perimeter. The properties are all large and very private. Being so
          high on the mountain we are afforded the luxury of peace and quiet
          with only birdsong interrupting.

          We are a secure neighborhood with security fencing around the
          perimeter. The properties are all large and very private. Being so
          high on the mountain we are afforded the luxury of peace and quiet
          with only birdsong interrupting.
        </p>
      </CustomDialog>
    </div>
  );
};

export default Location;
