import React, { useMemo, useState } from "react";
import DateRangePicker from "@/app/(unsecured)/(home)/_components/filters/DateRangePicker";
import { Button } from "@/components/common/button";
import GuestSelector from "@/app/(unsecured)/(home)/_components/filters/GuestSelector";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useForm } from "react-hook-form";

export const formatDateLocale = (s: Date | undefined) =>
  s
    ? ((d) =>
        `${d.getFullYear()}-${(d.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")} ${d
          .getHours()
          .toString()
          .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d
          .getSeconds()
          .toString()
          .padStart(2, "0")}`)(new Date(s))
    : null;

const PriceCalculator = () => {
  const [range, setRange] = useState<{ startDate?: Date; endDate?: Date }>({});
  const [guests, setGuests] = useState<any>({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const bookMutation = useMutation({
    mutationKey: ["bookMutation"],
    mutationFn: async (data: BookingProps) => {
      const res = axiosInstance.post("/bookings/create", data);
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<BookingProps>({
    defaultValues: {
      property_id: 0,
      check_in: formatDateLocale(range.startDate),
      check_out: formatDateLocale(range.endDate),
      no_of_guest: guests.adults + guests.children,
    },
  });

  const onSubmit = async (data: BookingProps) => {
    console.log("Booking data:", data);
    bookMutation.mutate(data)
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl w-full mx-auto grid gap-4 shadow-md p-10 rounded-3xl">
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
            <GuestSelector value={guests} onChange={setGuests} />
          </div>
        </div>{" "}
        <Button
          text={"Check availability"}
          className="py-4"
          disabled={range?.startDate == null && guests?.adults > 0}
        />
      </form>
      <Button
        text={"Make an inquiry"}
        className="py-4 bg-gray-900 hover:bg-gray-700"
      />
    </div>
  );
};

export default PriceCalculator;

type BookingProps = {
  property_id: number;
  check_in: string | null;
  check_out: string | null;
  no_of_guest: number;
};
