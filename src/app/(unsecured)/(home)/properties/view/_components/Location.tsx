import CustomDialog, { handleToggleDialog } from "@/components/common/modal";
import React from "react";

const Location = ({ data }: any) => {
  return (
    <div className="py-10 border-b border-gray-200">
      <header>
        <h3 className="text-xl font-medium">Where you&rsquo;ll stay</h3>
        <p>
          {data?.street_address || ""}, {data?.state || ""},{" "}
          {data?.country || ""}
        </p>
      </header>
      <div className="h-56 w-full bg-gray-300 rounded-lg mt-4"></div>
      <p className="text-gray-700 mb-4 pt-5">{data?.special_desc || ""}</p>
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
        <p className="text-gray-700 mb-4 pt-5">{data?.special_desc || " "}</p>
      </CustomDialog>
    </div>
  );
};

export default Location;
