import {
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export interface UISelectOption {
  value: string;
  displayValue?: ReactNode | string;
  search?: string;
}

interface UISelectProps {
  id?: string;
  label?: string;
  name?: string;
  isRequired?: boolean;
  placeholder?: string;
  error?: string;
  onChange?: (value: string) => void;
  options: UISelectOption[];
  defaultValue?: string;
  disabled?: boolean;
  showSearch?: boolean;
}

export default function UISelect({
  id,
  label,
  isRequired,
  placeholder = "Select",
  error,
  onChange,
  options,
  defaultValue,
  disabled,
  showSearch = false,
}: UISelectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filteredOptions, setFilteredOptions] =
    useState<UISelectOption[]>(options);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    defaultValue
  );

  const toggleDropdown = () => !disabled && setIsOpen(!isOpen);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
    onChange && onChange(value);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setKeyword(searchValue);
    setFilteredOptions(
      options.filter(
        (option) =>
          option.value.toLowerCase().includes(searchValue) ||
          option.search?.toLowerCase().includes(searchValue)
      )
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`mt-1 flex items-center justify-between border ${
          error
            ? "border-red-500"
            : "border-gray-300 focus-within:border-indigo-500"
        } rounded-md px-3 py-2 cursor-pointer`}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <span className="text-gray-900">
          {selectedOption
            ? options.find((opt) => opt.value === selectedOption)
                ?.displayValue ?? selectedOption
            : placeholder}
        </span>
        <i
          className={`ml-2 fa ${
            isOpen ? "fa-chevron-up" : "fa-chevron-down"
          } text-gray-500`}
        ></i>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {showSearch && (
            <div className="p-2">
              <input
                type="text"
                value={keyword}
                onChange={handleSearch}
                placeholder="Search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                >
                  {option.displayValue || option.value}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
