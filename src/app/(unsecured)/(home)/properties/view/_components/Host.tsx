import React from "react";
import { IconType } from "react-icons";
import { TbBuilding, TbKey, TbBuildingSkyscraper } from "react-icons/tb";

const Host = ({ data }: any) => {
  const benefits: { title: string; desc: string; icon: IconType }[] = [
    {
      title: "Dedicated Workspace",
      desc: "A room conducive for working holding meetings",
      icon: TbBuilding,
    },
    {
      title: "Self Check in",
      desc: "Check yourself in with Passkey",
      icon: TbKey,
    },
    {
      title: "City view",
      desc: "Get an amazing view during your stay",
      icon: TbBuildingSkyscraper,
    },
  ];

  return (
    <div className="py-4">
      <div className="flex items-center gap-4 mb-4 border-b border-gray-200 pb-4">
        <div className="w-12 h-12 bg-amber-500 rounded-full"></div>
        <div>
          <h4>Hosted by Donice Ubaru</h4>
          <p>2 years hosting</p>
        </div>
      </div>
      <div>
        {benefits.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 border-b border-gray-200 py-5">
            <item.icon className="text-4xl text-gray-500" />
            <div className="flex flex-col mb-2">
              <h5 className="font-semibold">{item.title}</h5>{" "}
              <p className="text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Host;
