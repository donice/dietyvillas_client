import React, { useEffect, useRef } from 'react';
import { TbChevronDown, TbChevronUp } from 'react-icons/tb';

interface CustomDateDropdownProps {
  onDateSelect: (date: string) => void;
}

const CustomDateDropdown: React.FC<CustomDateDropdownProps> = ({ onDateSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getLast12Months = () => {
    const months = [];
    const currentDate = new Date();

    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const value = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}`; // "YYYY-MM"
      const label = `${month} ${year}`; // "Month YYYY"
      months.push({ label, value });
    }

    return months;
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (value: string) => {
    setSelectedDate(value);
    onDateSelect(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = getLast12Months().find(m => m.value === selectedDate)?.label || 'Select Month';

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        className="py-2 text-sm bg-white rounded-md hover:text-primary flex items-center gap-2"
        onClick={toggleDropdown}
      >
        {selectedLabel} {isOpen ? <TbChevronUp /> : <TbChevronDown />}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-48 mt-2 bg-white rounded-md shadow-lg">
          {getLast12Months().map(({ label, value }) => (
            <div
              key={value}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(value)}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDateDropdown;
