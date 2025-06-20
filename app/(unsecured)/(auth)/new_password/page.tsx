import React, { Suspense } from "react";
import NewPasswordModule from "./components";

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <NewPasswordModule />
    </Suspense>
  );
};

export default NewPasswordPage;
