import React from "react";
import { GoDotFill } from "react-icons/go";
import { LuImageOff } from "react-icons/lu";
import { MdOutlineShare } from "react-icons/md";
import { TbHeart, TbStarFilled } from "react-icons/tb";

interface ImageGalleryProps {
  data: any;
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const paddedImages = [...images].concat(
    Array(Math.max(0, 5 - images.length)).fill("")
  );

  return (
    <div className="w-full">
      <header className="md:flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Middow well houses</h1>
        <div className="flex items-center justify-between gap-8 mt-2">
          <div className="flex items-center gap-2 text-gray-500">
            <MdOutlineShare />
            <span>Share</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <TbHeart />
            <span>Add to favorite</span>
          </div>
        </div>
      </header>
      <div className="flex flex-col md:flex-row gap-4 h-[500px]">
        <div className="w-full md:w-1/2 h-full rounded-lg overflow-hidden">
          {paddedImages[0] ? (
            <img
              src={paddedImages[0]}
              alt="Main gallery"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">
                <LuImageOff />
              </span>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 h-full grid grid-cols-2 gap-4">
          {paddedImages.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="w-full h-full rounded-lg overflow-hidden"
            >
              {image ? (
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">
                    <LuImageOff />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="py-4 flex-col flex md:flex-row justify-between md:items-center border-b border-gray-200 mb-4">
        <div>
          <h2 className="text-xl font-medium">
            Suite at 123 Victoria Island, Ikoyi. Lagos State.
          </h2>
          <div className="flex-col flex md:flex-row md:items-center gap-4 md:gap-2 mt-2 text-gray-500">
            <div className="flex items-center">
              <span className="">
                <GoDotFill />
              </span>
              <span className="text-gray-500">4 guests</span>
            </div>
            <div className="flex items-center">
              <span className="">
                <GoDotFill />
              </span>
              <span className="text-gray-500">2 bedrooms</span>
            </div>
            <div className="flex items-center">
              <span className="">
                <GoDotFill />
              </span>
              <span className="text-gray-500">2 beds</span>
            </div>
            <div className="flex items-center">
              <span className="">
                <GoDotFill />
              </span>
              <span className="text-gray-500">2 baths</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 text-gray-800 text-xl">
          <TbStarFilled />
          <span>4.83</span>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
