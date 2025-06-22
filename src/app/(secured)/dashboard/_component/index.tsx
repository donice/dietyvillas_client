"use client";
import { CgArrowUp } from "react-icons/cg";
import { SlArrowRight } from "react-icons/sl";
// import { Calendar } from "antd";
import DasboardLineGraph from "./DasboardLineGraph";
import DasboardPieChart from "./DasboardPieChart";
import { CustomHeader, CustomSubHeader } from "@/components/common/header/Header";

const DashboardModule = () => {

  return (
    <section className="p-2 lg:px-4 flex flex-col gap-4 dark:text-[#D7DFEF]">
      <div>
        <CustomHeader title="Overview" />
      </div>

      <section className="grid grid-cols-3 gap-4 h-screen">
        <div className="flex flex-col gap-10 border-r border-[#E7E7E7] dark:border-[#252525]">
          <div className="flex pb-20 border-b border-[#E7E7E7] dark:border-[#252525]">
            <div className="flex flex-col items-start gap-14 ">
              <div className="grid gap-2.5">
                <h2 className="text-sm">Monthly Earnngs</h2>
                <span className="text-2xl">$ 7,852.00</span>
                <p className="text-stone-400 flex gap-2 text-xs">
                  <span className="text-green-600 flex items-center">
                    <CgArrowUp className="text-xl -mt-1" /> 2.1%
                  </span>{" "}
                  vs last month{" "}
                </p>
              </div>

              <button  onClick={() => window.location.href = '/earnings'} className="text-yellow-400 shadow-md rounded-xl py-3 px-5 border border-stone-50">
                View Earnings
              </button>
            </div>
            <div className="w-56 h-56 -mt-10">
              <DasboardPieChart />
            </div>
          </div>

          {/* Calendar */}
          <div className="my-6 pr-10">
            <div className="flex items-center justify-between gap-4 text-stone-600">
              <h3>Calendar</h3>
              <div className="text-sm flex justify-between items-center gap-2.5 text-stone-400">
                The Grave Residence <SlArrowRight />
              </div>
            </div>

            <div className="mt-5 border border-stone-200 rounded-2xl shadow-md p-2">
            {/* <Calendar fullscreen={false} className="custom-calendar"/> */}

            </div>
          </div>
        </div>

        <div className="col-span-2 w-full">
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="w-full border-r px-4">
              <CustomSubHeader title="Listings" description="Your listings" />
              <div>
                {[1, 2, 3].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center border border-stone-50 rounded-xl py-5 gap-4"
                  >
                    <div className="w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center"></div>
                    <span className="text-stone-500 text-sm">
                      Maple Ridge Flats {item}
                    </span>
                  </div>
                ))}
                <div className="mt-4 flex items-end justify-end">
                  <button  onClick={() => window.location.href = '/listings'} className="bg-yellow-500 text-xs shadow-md rounded-xl py-3 px-4 border text-white">
                    View Listings
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full border-r px-4">
              <CustomSubHeader title="Inbox" description="Unread Messages" />
              <div className="flex flex-col gap-2 mt-4">
                {[1, 2, 3].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col border border-stone-200 rounded-xl py-2.5 px-5 gap-1"
                  >
                    <p>QA</p>
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-stone-400 text-xs">
                        Maple Ridge Flats {item}
                      </span>
                      <span className="text-stone-300 text-xs">5:30pm</span>
                    </div>
                  </div>
                ))}

                <div className="mt-4 flex items-end justify-end">
                  <button  onClick={() => window.location.href = '/inbox'} className="border border-yellow-500 text-xs shadow-md rounded-xl py-3 px-4 text-yellow-500">
                    Go to Inbox
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-stone-200 p-4 pb-24 rounded-xl h-[350px] my-8">
            <div className="flex items-center justify-between gap-4 text-stone-600 mb-10 mt-4 px-4">
              <h3>Insights</h3>
              <div className="text-sm flex justify-between items-center gap-2.5 text-stone-400">
                The Grave Residence <SlArrowRight />
                {/* <Calendar/> */}
              </div>
            </div>
            <DasboardLineGraph />
          </div>
        </div>
      </section>
    </section>
  );
};

export default DashboardModule;

// {userInfo?.firstname} {userInfo?.lastname}
