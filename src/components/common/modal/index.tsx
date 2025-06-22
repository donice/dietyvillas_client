import React from "react";
import { GrClose } from "react-icons/gr";

type PropsType = {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
  header?: string;
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
          className="absolute right-5 top-5 text-gray-500 p-3 rounded-full cursor-pointer bg-gray-50"
        >
          <GrClose className="text-xl"/>
        </span>
      </div>
      <header className="border-b border-gray-200">
        <h2 className="text-xl font-semibold mb-4">{props.header}</h2>
      </header>
      {props.children}
    </dialog>
  );
};

export default CustomDialog;


export const handleToggleDialog = (id: string, mode: boolean) => {
  const dialog = document.getElementById(String(id)) as HTMLDialogElement;
  if (dialog) {
    if (mode) {
      dialog.showModal();
      return;
    }
    dialog.close();
  }
};
