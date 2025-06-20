import React from "react";
import { GrClose } from "react-icons/gr";

type PropsType = {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
};
const CustomDialog = (props: PropsType) => {
  return (
    <dialog
      id={props.id}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-2xl shadow-lg w-[500px]"
    >
      <div className="flex justify-end items-center">
        <span
          onClick={props.onClose}
          className="absolute right-3 text-gray-500 p-3 rounded-full cursor-pointer"
        >
          <GrClose />
        </span>
      </div>
      {props.children}
    </dialog>
  );
};

export default CustomDialog;
