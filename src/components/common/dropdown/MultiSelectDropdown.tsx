import React, { useEffect, useRef } from 'react';
import { TbChevronDown, TbChevronUp } from 'react-icons/tb';
import { IoClose } from 'react-icons/io5';

interface DropdownItem {
  label: string;
  value: string;
}

interface MultiSelectDropdownProps {
  list: DropdownItem[];
  label?: string;
  onSelectionChange: (values: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  list,
  label = "Select options",
  onSelectionChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<DropdownItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const isSelected = (item: DropdownItem) =>
    selectedItems.some(selected => selected.value === item.value);

  const handleSelect = (item: DropdownItem) => {
    let updatedSelections;
    if (isSelected(item)) {
      updatedSelections = selectedItems.filter(i => i.value !== item.value);
    } else {
      updatedSelections = [...selectedItems, item];
    }
    setSelectedItems(updatedSelections);
    onSelectionChange(updatedSelections.map(i => i.value));
  };

  const removeItem = (value: string) => {
    const updated = selectedItems.filter(i => i.value !== value);
    setSelectedItems(updated);
    onSelectionChange(updated.map(i => i.value));
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block w-64">
      <div
        className="py-2 px-3 text-sm border border-gray-300 bg-white rounded-xl cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}
      >
        <div className="flex flex-wrap gap-1">
          {selectedItems.length === 0 ? (
            <span className="text-gray-400">{label}</span>
          ) : (
            selectedItems.map(item => (
              <span
                key={item.value}
                className="flex items-center bg-gray-200 rounded px-2 py-0.5 text-xs text-gray-700"
              >
                {item.label}
                <IoClose
                  className="ml-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.value);
                  }}
                />
              </span>
            ))
          )}
        </div>
        {isOpen ? <TbChevronUp /> : <TbChevronDown />}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          {list.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                isSelected(item) ? 'bg-gray-100 font-semibold' : 'text-gray-700'
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
