import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HeaderSkeleton } from "./skeleton/ListingSkeleton";
import Image from "next/image";

interface ListingProps {
  data: any;
  loading: boolean;
}

const Listing = ({ data, loading }: ListingProps) => {
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) {
        setColumns(6);
      } else if (window.innerWidth >= 768) {
        setColumns(4);
      } else {
        setColumns(2);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  if (loading) {
    return <HeaderSkeleton />;
  }

  const listings = data?.data?.data || [];

  return (
    <section className="py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 h-full">
        {listings.map((property: any, index: number) => {
          const isFirstInRow = index % columns === 0;
          const isLastInRow = (index + 1) % columns === 0;

          return (
            <Link
              key={property.id}
              href={"/properties/view?url=" + property.url}
              rel="noopener noreferrer"
              className={`flex flex-col overflow-hidden transition ${
                isFirstInRow ? "rounded-l-2xl" : ""
              } ${isLastInRow ? "rounded-r-2xl" : ""}`}
            >
              <Image
                src={property.property_images[0]?.image_link}
                alt={property.title}
                width={100}
                height={100}
                className="w-full h-48 object-cover bg-gray-100"
              />

              <div className="flex flex-col justify-between my-4 flex-1">
                <div className="mb-2">
                  <h3 className="font-semibold text-base leading-tight line-clamp-2">
                    {property.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {property.area}, {property.state}, {property.country}
                  </p>
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  ₦{property.amount}
                  <span className="text-xs text-gray-500">/Night</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Listing;
