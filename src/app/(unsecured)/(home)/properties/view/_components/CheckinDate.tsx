"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

type DateRange = {
  startDate?: Date;
  endDate?: Date;
};

interface DateRangePickerProps {
  value?: DateRange;
  onChange: (range: DateRange) => void;
  minRangeDays?: number;
  maxRangeDays?: number;
  locale?: string;
}

export default function DateRangePicker({
  value,
  onChange,
  minRangeDays = 0,
  maxRangeDays = Infinity,
  locale = "en-US",
}: DateRangePickerProps) {
  const [tempRange, setTempRange] = useState<DateRange>(value || {});
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    setTempRange(value || {});
  }, [value]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const generateCalendar = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const dates = [];

    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) dates.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) {
      dates.push(new Date(year, month, d));
    }
    return dates;
  };

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const handleDateClick = (date: Date) => {
    if (date < today) return;

    if (!tempRange.startDate || (tempRange.startDate && tempRange.endDate)) {
      const newRange = { startDate: date, endDate: undefined };
      setTempRange(newRange);
      onChange(newRange);
    } else {
      const start = tempRange.startDate;
      let startDate = start < date ? start : date;
      let endDate = start < date ? date : start;

      const diffDays = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      );

      if (diffDays < minRangeDays || diffDays > maxRangeDays) {
        toast(`Select between ${minRangeDays} and ${maxRangeDays} days.`);
        return;
      }

      const newRange = { startDate, endDate };
      setTempRange(newRange);
      onChange(newRange);
    }
  };

  const isSelected = (date: Date) => {
    if (!tempRange.startDate) return false;
    if (tempRange.startDate && !tempRange.endDate) {
      return date.getTime() === tempRange.startDate.getTime();
    }
    if (tempRange.startDate && tempRange.endDate) {
      return date >= tempRange.startDate && date <= tempRange.endDate;
    }
    return false;
  };

  const clearSelection = () => {
    setTempRange({});
    onChange({});
  };

  const renderCalendar = (month: number, year: number) => {
    const dates = generateCalendar(month, year);

    return (
      <div
        className="w-64 p-2"
        aria-label={`Calendar for ${month + 1}/${year}`}
      >
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
            className="px-2 py-1 rounded hover:bg-gray-200"
            aria-label="Previous month"
          >
            ◀
          </button>
          <div className="text-center font-semibold">
            {new Intl.DateTimeFormat(locale, {
              month: "long",
              year: "numeric",
            }).format(new Date(year, month))}
          </div>
          <button
            onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
            className="px-2 py-1 rounded hover:bg-gray-200"
            aria-label="Next month"
          >
            ▶
          </button>
        </div>

        <div className="grid grid-cols-7 text-xs text-gray-500 mb-1">
          {Array.from({ length: 7 }, (_, i) =>
            new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
              new Date(2023, 9, i + 1)
            )
          ).map((day, index) => (
            <div key={index} className="text-center">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-sm">
          {dates.map((date, index) => {
            if (!date) return <div key={index}></div>;
            const isPast = date < today;

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={isPast}
                className={`rounded p-1 focus:outline focus:ring-2 focus:ring-amber-400 ${
                  isPast
                    ? "cursor-not-allowed text-gray-400 opacity-50"
                    : isSelected(date)
                    ? "bg-amber-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                aria-pressed={isSelected(date)}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const startMonth = currentMonth.getMonth();
  const startYear = currentMonth.getFullYear();
  const nextMonth = (startMonth + 1) % 12;
  const nextYear = startMonth === 11 ? startYear + 1 : startYear;

  return (
    <div className="py-6 border-b border-gray-200 grid gap-5">
      <h3 className="text-xl font-medium mb-2">Select Check-in date</h3>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          {value?.startDate && value?.endDate
            ? `${formatDate(value.startDate)} → ${formatDate(value.endDate)}`
            : value?.startDate
            ? `${formatDate(value.startDate)}`
            : "No date selected"}
        </div>
        {(value?.startDate || value?.endDate) && (
          <button
            onClick={clearSelection}
            className="text-gray-500 text-xs px-2 py-1 rounded hover:bg-gray-200"
          >
            Clear
          </button>
        )}
      </div>

      <div className="md:flex gap-2">
        {renderCalendar(startMonth, startYear)}
        {renderCalendar(nextMonth, nextYear)}
      </div>
    </div>
  );
}
