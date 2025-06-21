import { useState } from "react";
import { UseFormRegister, FieldError, Path } from "react-hook-form";
import { TbEye, TbEyeOff } from "react-icons/tb";

type InputProps<T extends Record<string, unknown>> = {
  label: string;
  name: keyof T;
  type?: "text" | "email" | "password" | "number" | "tel" | "date";
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  required?: boolean;
  validation?: any;
  disabled?: boolean;
  className?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
};

export const TextInput = <T extends Record<string, unknown>>({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  required = false,
  validation,
  disabled,
  className,
  props
}: InputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const getErrorMessage = (error: FieldError | undefined): string => {
    if (!error) return "";

    switch (error.type) {
      case "required":
        return `${label} Field Required`;
      case "minLength":
        return "Length must be more";
      case "maxLength":
        return "Length must be less";
      default:
        return "";
    }
  };

  const errorMessage = error?.message || getErrorMessage(error);

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={String(name)} className="mb-1 text-sm font-medium text-gray-600">
        {label}
      </label>
      <div className="relative">
        <input
          id={String(name)}
          type={type === "password" && showPassword ? "text" : type}
          disabled={disabled}
          placeholder={placeholder}
            {...register((name as Path<T>), { required, ...validation })}
          className={`w-full px-3 py-3 border bg-gray-100 font-bold rounded-md focus:ring focus:ring-gray-300 focus:outline-none ${
            error ? "border-1.5 border-red-500" : "border-gray-100"
          } ${className}`}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <TbEye size={18} /> : <TbEyeOff size={18} />}
          </button>
        )}
      </div>
      {errorMessage && <p className="text-red-500 text-xs mt-1">{error?.message || errorMessage}</p>}
    </div>
  );
};


type Option = {
  label: string;
  value: string | number;
};

type SelectInputProps<T extends Record<string, any>> = {
  label: string;
  name: Path<T>;
  options: Option[];
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  required?: boolean;
  validation?: any;
  disabled?: boolean;
  className?: string;
  props?: React.SelectHTMLAttributes<HTMLSelectElement>;
};

export const SelectInput = <T extends Record<string, any>>({
  label,
  name,
  options,
  placeholder = "Select an option",
  register,
  error,
  required = false,
  validation,
  disabled = false,
  className = "",
  props
}: SelectInputProps<T>) => {
  const getErrorMessage = (error: FieldError | undefined): string => {
    if (!error) return "";
    switch (error.type) {
      case "required":
        return `${label} is required`;
      default:
        return error.message || "Invalid input";
    }
  };

  const errorMessage = getErrorMessage(error);

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-600">
        {label}
      </label>
      <select
        id={name}
        disabled={disabled}
        {...register(name, { required, ...validation })}
        className={`w-full px-3 py-3 border bg-gray-100 font-bold rounded-md focus:ring focus:ring-gray-300 focus:outline-none ${
          error ? "border-1.5 border-red-500" : "border-gray-100"
        } ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
};
