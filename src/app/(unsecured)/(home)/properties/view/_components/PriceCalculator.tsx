import React, { useState } from "react";
import DateRangePicker from "../../../_components/filters/DateRangePicker";
import { Button } from "@/components/common/button";

const PriceCalculator = () => {
  const [range, setRange] = useState<{ startDate?: Date; endDate?: Date }>({});

  return (
    <div className="flex flex-col gap-4">
      <div className="max-w-2xl w-full mx-auto grid gap-4 shadow-md p-10 rounded-3xl">
        <h3 className="text-xl font-medium mb-5">Add dates for prices</h3>
        <div className="border border-gray-400 rounded-2xl">
          <div className="grid grid-cols-2 border-b border-gray-400">
            <div className="p-4">
              <span>Check-in & Check-out</span>
              <DateRangePicker value={range} onChange={setRange} />
            </div>
          </div>
          <div className="p-4 grid">
            <span>Check-in</span>
            <DateRangePicker value={range} onChange={setRange} />
          </div>
        </div>{" "}
        <Button text={"Check availability"} className="py-4" />
      </div>
      <Button
        text={"Make an inquiry"}
        className="py-4 bg-gray-900 hover:bg-gray-700"
      />
    </div>
  );
};

export default PriceCalculator;
