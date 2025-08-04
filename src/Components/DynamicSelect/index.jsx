import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DynamicSelect({ options = [], label = "Select Option", onSelect }) {
  const [selected, setSelected] = useState(options[0] || "");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleSelect = (option) => {
    setSelected(option);
    onSelect?.(option);
    setOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-xs" ref={dropdownRef}>
      <label className="block mb-1 text-sm text-gray-700 font-medium">{label}</label>
      <div
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer shadow-sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="text-sm text-gray-800">{selected}</span>
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </div>

      {open && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 text-sm hover:bg-green-50 cursor-pointer ${
                selected === option ? "bg-green-100 text-green-700 font-medium" : "text-gray-700"
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
