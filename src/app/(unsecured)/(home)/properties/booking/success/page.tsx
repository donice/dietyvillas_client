"use client";
import React from "react";
import Summary from "../_components/Summary";
import { Button } from "@/components/common/button";
import { useRouter, useSearchParams } from "next/navigation";

const BookingSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const url = searchParams.get("url");

  return (
    <div className="space-y-6 px-4 py-10 mx-auto max-w-7xl text-gray-600">
      <section className="grid md:grid-cols-2 gap-20">
        <div className="grid gap-5 h-fit">
          <h1 className="text-3xl md:text-7xl font-bold">
            Reservation request sent to
            <span className="italic"> Ajibola</span>{" "}
          </h1>
          <Button
            text={"Go to inbox"}
            className="py-4 rounded-3xl bg-gray-900 hover:bg-gray-700 max-w-xs"
            onClick={() => router.push("/dashboard/inbox")}
          />
        </div>
        <Summary url={url} />
      </section>
    </div>
  );
};

export default BookingSuccessPage;
