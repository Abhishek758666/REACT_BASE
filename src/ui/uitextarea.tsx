import { CSSProperties, ChangeEventHandler, useEffect, useState } from "react";

interface UITextAreaProps {
  id?: string;
  label?: string;
  name?: string;
  isRequired?: boolean;
  placeholder?: string;
  style?: CSSProperties;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  error?: string;
  defaultValue?: string | null;
  instruction?: string;
  disabled?: boolean;
  maxLength?: number;
}

export default function UITextArea({
  id,
  label,
  name,
  isRequired,
  placeholder,
  style,
  onChange,
  error,
  defaultValue,
  instruction,
  disabled,
  maxLength,
}: UITextAreaProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const inputValue = e.target.value;
    if (!maxLength || inputValue.length <= maxLength) {
      setValue(inputValue);
      if (onChange) onChange(e);
    }
  };

  return (
    <div className="space-y-2" style={style}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={id}
        name={name}
        className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:ring-blue-300"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        required={isRequired}
        disabled={disabled}
        maxLength={maxLength}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      {instruction && <p className="text-sm text-gray-500">{instruction}</p>}
    </div>
  );
}
