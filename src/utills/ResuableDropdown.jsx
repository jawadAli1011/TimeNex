import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowLeft, ArrowDown } from "lucide-react";

function CustomDropdown({
  options = [],
  optionbtn = "",
  value,
  onChange,
  placeholder,
  itemName,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item) => {
    onChange(item);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-sm">
      {/* Selected value */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="form-control flex w-full items-center justify-between rounded-md  bg-white px-4 py-2.5 text-left text-sm  outline-none hover:border-gray-500"
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value ? value : placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? "" : "rotate-90"
          }`}
        />
      </button>

      {/* Dropdown options */}
      {open && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              No options available
            </div>
          ) : (
            options.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleSelect(item)}
                className="flex w-full items-center justify-between  hover:bg-gray-100"
                style={{ padding: "8px" }}
              >
                {/* ID */}
                <span className="flex text-left  text-gray-700">
                  {item[itemName]}
                </span>
                {optionbtn && (
                  <span
                    className="border rounded-sm bg-[#b8901b] text-white hover:bg-[#cfac41] cursor-pointer "
                    style={{ padding: "2px 8px" }}
                  >
                    {optionbtn}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
