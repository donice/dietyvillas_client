import React, { useState, useRef, useEffect, JSX } from 'react';

type Props = {
  onRangeSelect: (range: { from: string; to: string }) => void;
};

const daysInMonth = (month: number, year: number): number =>
  new Date(year, month + 1, 0).getDate();

const getStartDayOfMonth = (month: number, year: number): number =>
  new Date(year, month, 1).getDay();

const isSameDate = (d1: Date, d2: Date) =>
  d1.toDateString() === d2.toDateString();

const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const DateRangePicker: React.FC<Props> = ({ onRangeSelect }) => {
  const today = new Date();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDayClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    let newSelection: Date[] = [];

    if (selectedDates.length === 0 || selectedDates.length === 2) {
      newSelection = [date];
    } else if (selectedDates.length === 1) {
      newSelection = [selectedDates[0], date].sort((a, b) => a.getTime() - b.getTime());
    }

    setSelectedDates(newSelection);

    if (newSelection.length === 2) {
      onRangeSelect({
        from: formatDate(newSelection[0]),
        to: formatDate(newSelection[1]),
      });
      setShowCalendar(false);
    }
  };

  const renderDays = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const startDay = getStartDayOfMonth(currentMonth, currentYear);
    const days: JSX.Element[] = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const thisDate = new Date(currentYear, currentMonth, day);
      const isSelected = selectedDates.some(d => isSameDate(d, thisDate));

      days.push(
        <div
          key={day}
          className={`w-8 h-8 flex items-center justify-center cursor-pointer rounded
            ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (offset: number) => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const formatSelected = () => {
    if (selectedDates.length === 0) return 'Select Start and End Date';
    if (selectedDates.length === 1) return formatDate(selectedDates[0]);
    return `${formatDate(selectedDates[0])} - ${formatDate(selectedDates[1])}`;
  };

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <button
        className="px-4 py-2 border-2 border-gray-200 rounded-xl bg-white text-sm"
        onClick={() => setShowCalendar(prev => !prev)}
      >
        {formatSelected()}
      </button>

      {showCalendar && (
        <div className="absolute z-10 mt-2 bg-white border rounded shadow p-4 w-64">
          <div className="flex justify-between items-center mb-2">
            <button onClick={() => changeMonth(-1)}>&lt;</button>
            <div className="font-bold">
              {new Date(currentYear, currentMonth).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </div>
            <button onClick={() => changeMonth(1)}>&gt;</button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-gray-500 mb-1 text-xs">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {renderDays()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
