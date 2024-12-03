import {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  useState,
} from "react";
import UIButton from "./UiButton";

interface UIFileInputProps {
  id?: string;
  label?: string;
  name?: string;
  isRequired?: boolean;
  placeholder?: string;
  style?: CSSProperties;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  instruction?: string;
  multiple?: boolean;
  accept?: string;
}

export default function UIFileInput({
  id,
  label,
  name,
  isRequired,
  placeholder,
  style,
  onChange,
  error,
  instruction,
  accept,
}: UIFileInputProps) {
  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileList(files);
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

      <div
        className={`relative flex flex-col border rounded px-4 py-3 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">
            {fileList && fileList.length > 0
              ? Array.from(fileList).map((file, index) => (
                  <div key={index} className="truncate">
                    {file.name}
                  </div>
                ))
              : placeholder || "No file selected"}
          </span>
          <UIButton
            label={
              fileList && fileList.length > 0
                ? `${fileList.length} Files Selected`
                : "Browse Files"
            }
            type="secondary"
            style={{ fontSize: "0.8rem", height: "2.5rem" }}
            onClick={() => document.getElementById(id || "")?.click()}
          />
        </div>
        <input
          id={id}
          name={name}
          type="file"
          onChange={handleFileChange}
          multiple
          accept={accept}
          required={isRequired}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {instruction && <p className="text-sm text-gray-500">{instruction}</p>}
    </div>
  );
}
