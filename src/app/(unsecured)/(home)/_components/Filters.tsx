import React from "react";
import { useForm } from "react-hook-form";
import { GrLocation } from "react-icons/gr";

const Filters = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="border rounded-full p-3 border-gray-300 max-w-5xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between">
        <div className=" flex justify-center items-center px-4">
          <label htmlFor="email">
            <GrLocation className="text-xl text-gray-400" />{" "}
            <span className="sr-only">Location</span>
          </label>
          <input
            type="text"
            className="outline-0 px-2 text-lg"
            placeholder="Search Location"
            {...register("location", {
              required: "Required",
            })}
          />
        </div>

        <button type="submit" className="bg-amber-400 rounded-full px-8 py-2.5 text-white">
          Search
        </button>
      </form>
    </div>
  );
};

export default Filters;
