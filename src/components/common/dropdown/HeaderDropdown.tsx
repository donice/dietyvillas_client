import React from 'react';
import { TbChevronDown, TbChevronUp } from 'react-icons/tb';

interface CustomDropdownProps {
  onHeaderSelect: (value: string) => void;
  label?: string;
  list: string[];
}

const HeaderDropdown: React.FC<CustomDropdownProps> = ({ onHeaderSelect, label, list }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (value: string) => {
    setSelectedItem(value);
    onHeaderSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        className="text-primary font-semibold text-md py-2 text-sm bg-white rounded-xl hover:text-primary flex items-center gap-2"
        onClick={toggleDropdown}
      >
        {selectedItem || label || "Select"} {isOpen ? <TbChevronUp /> : <TbChevronDown />}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-48 mt-2 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          {list.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderDropdown;
