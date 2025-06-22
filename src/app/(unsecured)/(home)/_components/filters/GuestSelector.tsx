"use client";

import React, { useState, useRef, useEffect } from "react";

type GuestType = "adults" | "children" | "infants" | "pets";

interface Guests {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

interface GuestSelectorProps {
  value?: Guests;
  onChange: (guests: Guests) => void;
}

const defaultGuests: Guests = {
  adults: 0,
  children: 0,
  infants: 0,
  pets: 0,
};

export default function GuestSelector({ value = defaultGuests, onChange }: GuestSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleCountChange = (type: GuestType, delta: number) => {
    const updated = {
      ...value,
      [type]: Math.max(0, (value[type] || 0) + delta),
    };
    onChange(updated);
  };

  const guestSummary = () => {
    const total = value.adults + value.children + value.infants + value.pets;
    if (total === 0) return "Add Guest";
    return `${value.adults + value.children} guests${value.infants ? `, ${value.infants} infants` : ""}${value.pets ? `, ${value.pets} pets` : ""}`;
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[200px] text-left"
      >
        {guestSummary()}
      </span>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-400 rounded-xl shadow-lg p-4 w-80">
          <h3 className="font-semibold text-lg mb-3">Who's expected</h3>

          {[
            { type: "adults", label: "Adults", sub: "Ages 13 or above" },
            { type: "children", label: "Children", sub: "Ages 2 - 12" },
            { type: "infants", label: "Infants", sub: "Under 2" },
            { type: "pets", label: "Pets", sub: "Emotional support animals" },
          ].map((item) => (
            <div key={item.type} className="flex justify-between items-center py-2">
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-gray-500">{item.sub}</div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  onClick={() => handleCountChange(item.type as GuestType, -1)}
                  // disabled={value[item.type as GuestType] === 0}
                  className={`w-8 h-8 rounded-full text-lg flex items-center justify-center border ${
                    value[item.type as GuestType] === 0
                      ? "text-gray-400 border-gray-300"
                      : "text-black border-gray-500"
                  }`}
                >
                  –
                </span>
                <span className="w-5 text-center">{value[item.type as GuestType]}</span>
                <span
                  onClick={() => handleCountChange(item.type as GuestType, 1)}
                  className="w-8 h-8 rounded-full text-lg flex items-center justify-center border border-gray-500"
                >
                  +
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
