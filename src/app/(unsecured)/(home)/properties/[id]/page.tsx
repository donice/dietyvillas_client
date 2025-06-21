import React from "react";
import DynamicPropertyDetailsModule from "./_components";

const DynamicPropertyDetails = ({ params }: { params: { id: string } }) => {
  return <DynamicPropertyDetailsModule id={params.id} />;
};

export default DynamicPropertyDetails;
