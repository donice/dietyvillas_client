import CustomDialog, { handleToggleDialog } from "@/components/common/modal";
import React from "react";

const Description = ({ data }: any) => {
  return (
    <div className="py-6 border-b border-gray-200">
      <p className="text-gray-700 mb-3">
       {data?.special_desc}
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
          {data?.special_desc}
        </p>
      </CustomDialog>
    </div>
  );
};

export default Description;
