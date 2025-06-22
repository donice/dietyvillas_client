import CustomDialog, { handleToggleDialog } from "@/components/common/modal";
import React from "react";

const Description = ({ data }: any) => {
  return (
    <div className="py-6 border-b border-gray-200">
      <p className="text-gray-700 mb-3">
        Your room has been carefully prepared with attention to detail, ensuring
        you have everything you need for a relaxed and memorable stay. From the
        soft linens to the cozy touches and handpicked amenities, we aim to make
        you...
      </p>
      <button
        onClick={() => handleToggleDialog("addCategory", true)}
        className="underline"
      >
        Show more
      </button>

      <CustomDialog
        onClose={() => handleToggleDialog("addCategory", false)}
        id={"addCategory"}
        header="Description"
      >
        <p className="text-gray-700 mb-4 pt-5">
          Your room has been carefully prepared with attention to detail,
          ensuring you have everything you need for a relaxed and memorable
          stay. From the soft linens to the cozy touches and handpicked
          amenities, we aim to make you...
        </p>
      </CustomDialog>
    </div>
  );
};

export default Description;
