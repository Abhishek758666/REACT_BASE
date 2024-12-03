"use client";

import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import {
  CSSProperties,
  ChangeEvent,
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  MouseEventHandler,
  WheelEventHandler,
  useEffect,
  useState,
} from "react";

interface UIInputProps {
  id?: string;
  label?: string;
  name?: string;
  isRequired?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | "location";
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  defaultValue?: string | number | null;
  instruction?: string;
  disabled?: boolean;
  autoComplete?: string;
  min?: string;
  max?: string;
  maxLength?: number;
  pattern?: string;
  onWheel?: WheelEventHandler<HTMLInputElement>;
  isNepaliDatePicker?: boolean;
}

export default function UIInput({
  id,
  label,
  name,
  isRequired,
  placeholder,
  type,
  style,
  onClick,
  onChange,
  onWheel,
  error,
  defaultValue,
  instruction,
  disabled,
  autoComplete,
  max,
  min,
  maxLength,
  pattern,
  isNepaliDatePicker,
}: UIInputProps) {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setValue(defaultValue ? defaultValue.toString() : "");
  }, [defaultValue]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value;
    if (!maxLength || inputValue.length <= maxLength) {
      setValue(inputValue);
      if (onChange) onChange(e);
    }
  };

  const handleWheel: WheelEventHandler<HTMLInputElement> = (e) => {
    e.currentTarget.blur();
    e.stopPropagation();
    setTimeout(() => e.currentTarget.focus(), 0);
  };

  const handleNepaliDateChange = (date: string) => {
    setValue(date);
    if (onChange) {
      const event = {
        target: { value: date, name },
      } as ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className="space-y-2" style={style}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {type === "date" && isNepaliDatePicker ? (
          <NepaliDatePicker
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring ${
              error
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            onChange={handleNepaliDateChange}
            value={value}
          />
        ) : (
          <input
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            id={id}
            name={name}
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring ${
              error
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
            placeholder={placeholder}
            onClick={onClick}
            onChange={handleChange}
            value={value}
            required={isRequired}
            disabled={disabled}
            autoComplete={autoComplete ?? name}
            min={min}
            max={max}
            maxLength={maxLength}
            pattern={pattern}
            onWheel={handleWheel}
          />
        )}

        {type === "location" && (
          <i className="fa-solid fa-location-dot absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
          >
            <i className={`fa-regular fa-eye${showPassword ? "" : "-slash"}`} />
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {instruction && <p className="text-sm text-gray-500">{instruction}</p>}
    </div>
  );
}
