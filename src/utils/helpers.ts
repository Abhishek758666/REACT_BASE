import { ZodError, ZodType } from "zod";
import { errorToast, successToast } from "../lib/toastify";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";

import axios from "axios";
export const handleApiError = (error: any) => {
  if (axios.isCancel(error)) return;

  if (error.response && error.response.data && error.response.data.errors) {
    const errors = error.response.data.errors;
    errors.forEach((error: any) => {
      errorToast(error.message);
    });
  } else if (
    error.response &&
    error.response.data &&
    error.response.data.message
  ) {
    errorToast(error.response.data.message);
  } else if (error.response.data.error) {
    errorToast(error.response.data.error);
  } else {
    errorToast("Network Error");
  }
};

export const intlFormat = (val: number, locales?: string) =>
  new Intl.NumberFormat(locales ?? "en-IN").format(val);

export const parseInputType = (
  type: HTMLInputTypeAttribute | "list",
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  if (type === "checkbox" && "checked" in e.target) return e.target.checked;
  if (type === "number") return +e.target.value.trim();
  if (type === "file" && "files" in e.target) return e.target.files;
  if (type === "list") return e.target.value ?? [];
  return e.target.value.trim();
};

export const copyToClipboard = (val: string) => {
  if (!navigator.clipboard) return errorToast("Cannot copy!");
  navigator.clipboard.writeText(val);
  successToast("Coppied!");
};

//!Zod
interface ValidationResult<T> {
  data: T;
  errors?: {
    hasError: boolean;
    error: {
      [K in keyof T]?: string;
    };
  };
}
export const validateSchema = <T>(
  data: unknown,
  schema: ZodType<T, any, any>
): ValidationResult<T> => {
  try {
    const response = schema.parse(data);

    return { data: response };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorState: {
        [K in keyof T]?: string;
      } = {};
      let hasError = false;
      error.errors.forEach(
        (err) => (errorState[err.path[0].toString() as keyof T] = err.message)
      );
      error.errors.length > 0 && (hasError = true);

      return { data: data as T, errors: { error: errorState, hasError } };
    }
    throw error;
  }
};

//!FormData
export const parseFormData = <T>(data: T) => {
  const formData = new FormData();
  if (typeof data !== "object" || !data) return formData;
  Object.keys(data).forEach((i) => {
    let elem = data[i as keyof typeof data] as string;
    elem !== undefined || (elem !== null && (elem = elem + ""));
    elem && formData.append(i, elem);
  });
  return formData;
};

export const formatDate = (date: Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const calculateTotalDays = (startDate: Date, endDate: Date): number => {
  const timeDifference = endDate.getTime() - startDate.getTime();

  const totalDays = timeDifference / (1000 * 3600 * 24);

  return Math.ceil(totalDays);
};
