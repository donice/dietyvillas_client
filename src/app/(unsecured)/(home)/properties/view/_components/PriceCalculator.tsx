import React, { useEffect, useState } from "react";
import DateRangePicker from "@/app/(unsecured)/(home)/_components/filters/DateRangePicker";
import { Button } from "@/components/common/button";
import GuestSelector from "@/app/(unsecured)/(home)/_components/filters/GuestSelector";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { set, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

const PriceCalculator = ({ data }: any) => {
  const router = useRouter();
  const [propertyUrl, setPropertyUrl] = useState(0)
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
      return res;
    },

    onSuccess: (data) => {
      toast.success(data?.data?.resp_description || "Booking successful!");
      setRange({});
      setGuests({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
      });

      console.log("Booking success:", data);

      router.push(`/properties/booking?url=${propertyUrl}&booking_id=${data?.data?.data?.id}&amount=${data?.data?.data?.amount}` );
    },

    onError: (error) => {
      const errorData = (error as any)?.response?.data;
      let errorMessages = "Booking failed!";
      if (errorData?.errors && Array.isArray(errorData.errors)) {
        errorMessages = errorData.errors.map((e: any) => e.message).join(" ");
      }
      toast.error(errorMessages);
      console.log("Booking error:", errorMessages, errorData);
    },
  });

  const { handleSubmit, setValue } = useForm<BookingProps>({
    defaultValues: {
      property_id: data?.id,
      check_in: formatDateLocale(range.startDate),
      check_out: formatDateLocale(range.endDate),
      no_of_guest: guests.adults + guests.children,
    },
  });

  useEffect(() => {
    setValue("no_of_guest", guests.adults + guests.children);
  }, [guests]);

  useEffect(() => {
    setValue("check_in", formatDateLocale(range.startDate));
    setValue("check_out", formatDateLocale(range.endDate));
  }, [range]);

  useEffect(() => {
    setValue("property_id", data?.id);
    setPropertyUrl(data?.url)
  }, [data]);

  const onSubmit = async (data: BookingProps) => {
    console.log("Booking data:", data);
    bookMutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl w-full mx-auto grid gap-4 shadow-md p-10 rounded-3xl"
      >
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
          loading={bookMutation.isPending}
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
