import React from 'react';
import { TbChevronDown, TbChevronUp } from 'react-icons/tb';

interface DropdownItem {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  onItemSelect: (value: string) => void;
  label?: string;
  list: DropdownItem[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ onItemSelect, label, list }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<DropdownItem | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item);
    onItemSelect(item.value);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="py-2 px-3 text-sm border border-gray-300 bg-white rounded-xl hover:text-primary flex items-center gap-2"
        onClick={toggleDropdown}
      >
        {selectedItem?.label || label || "Select"} {isOpen ? <TbChevronUp /> : <TbChevronDown />}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-48 mt-2 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          {list.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(item);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
