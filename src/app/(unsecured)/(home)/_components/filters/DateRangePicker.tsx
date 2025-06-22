"use client";

import React, { useState, useEffect, useRef } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState<DateRange>({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const generateCalendar = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const dates = [];

    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) {
      dates.push(null);
    }

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
        alert(
          `Please select a range between ${minRangeDays} and ${maxRangeDays} days.`
        );
        return;
      }

      const newRange = { startDate, endDate };
      setTempRange(newRange);
      onChange(newRange);
      setIsOpen(false);
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

  const getDateClass = (date: Date) => {
  if (date < today) return "text-gray-400 cursor-not-allowed bg-transparent";

  if (tempRange.startDate && tempRange.endDate) {
    if (date.getTime() === tempRange.startDate.getTime()) {
      return "bg-gray-900 text-white rounded-l-3xl";
    }
    if (date.getTime() === tempRange.endDate.getTime()) {
      return "bg-gray-900 text-white rounded-r-3xl";
    }
    if (date > tempRange.startDate && date < tempRange.endDate) {
      return "bg-gray-200 text-black";
    }
  }

  if (tempRange.startDate && !tempRange.endDate) {
    if (date.getTime() === tempRange.startDate.getTime()) {
      return "bg-amber-500 text-white";
    }
  }

  return "hover:bg-gray-200";
};


  const renderCalendar = (month: number, year: number) => {
    const dates = generateCalendar(month, year);

    return (
      <div
        className="w-64 p-2"
        aria-label={`Calendar for ${month + 1}/${year}`}
      >
        <div className="flex justify-between items-center mb-2">
          <span
            onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
            className="px-2 py-1 rounded hover:bg-gray-200"
            aria-label="Previous month"
          >
            ◀
          </span>
          <div className="text-center font-semibold">
            {new Intl.DateTimeFormat(locale, {
              month: "long",
              year: "numeric",
            }).format(new Date(year, month))}
          </div>
          <span
            onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
            className="px-2 py-1 rounded hover:bg-gray-200"
            aria-label="Next month"
          >
            ▶
          </span>
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
        <div className="grid grid-cols-7 text-sm">
          {dates.map((date, index) =>
            date ? (
              <span
                key={index}
                onClick={() => handleDateClick(date)}
                className={` p-1 focus:outline focus:ring-2 focus:ring-amber-400 ${getDateClass(date)} `}
                aria-pressed={isSelected(date)}
              >
                {date.getDate()}
              </span>
            ) : (
              <div key={index}></div>
            )
          )}
        </div>
      </div>
    );
  };

  const startMonth = currentMonth.getMonth();
  const startYear = currentMonth.getFullYear();
  const nextMonth = (startMonth + 1) % 12;
  const nextYear = startMonth === 11 ? startYear + 1 : startYear;

  return (
    <div className="relative inline-block" ref={ref}>
      <span
        onClick={() => setIsOpen(!isOpen)}
        className=" rounded min-w-[240px] text-left"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {value?.startDate && value?.endDate
          ? `${formatDate(value.startDate)} - ${formatDate(value.endDate)}`
          : value?.startDate
          ? `${formatDate(value.startDate)}`
          : "Add Date"}
      </span>

      {isOpen && (
        <div
          className="absolute z-10 mt-2 bg-white border rounded shadow p-2 flex gap-2"
          role="dialog"
          aria-label="Date range picker"
        >
          {renderCalendar(startMonth, startYear)}
          {renderCalendar(nextMonth, nextYear)}
        </div>
      )}
    </div>
  );
}

