import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function MultiSelect({
  label,
  options = [],
  selected = [],
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(selected || []);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value) => {
    let newSelected;
    if (selectedValues.includes(value)) {
      newSelected = selectedValues.filter((item) => item !== value);
    } else {
      newSelected = [...selectedValues, value];
    }
    setSelectedValues(newSelected);
    onChange?.(newSelected);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedValues(selected || []);
  }, [selected]);

  return (
    <div className="relative w-full max-w-xs" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        onClick={toggleDropdown}
        className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md bg-white flex justify-between items-center"
      >
        <span
          className="text-gray-700 truncate block max-w-full"
          title={selectedValues.join(", ")} // show full values on hover
        >
          {selectedValues.length > 0
            ? selectedValues.join(", ")
            : "Select options"}
        </span>

        <ChevronDown size={18} className="text-gray-500" />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-2 shadow-md max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 ${
                selectedValues.includes(option) ? "bg-gray-100" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                readOnly
              />
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
