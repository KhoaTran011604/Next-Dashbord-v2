import { useEffect, useState } from "react";

const Select = ({
  title,
  name,
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  success = false,
  error = false,
  hint,
}) => {
  // Manage the selected value
  const [selectedValue, setSelectedValue] = useState<string>();

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    const selectedObj = options.find((opt) => opt.value === value);
    onChange(selectedObj); // Trigger parent handler
  };
  const classNameErr = `  border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (
    <div>
      {title && (
        <label
          htmlFor={name}
          className="mb-3 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {title}
        </label>
      )}
      <select
        name={name}
        className={`h-11 w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-200 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary ${
          error ? classNameErr : ""
        }  px-5.5 text-dark placeholder:text-dark-6 dark:text-white ${
          selectedValue
            ? "text-gray-800 dark:text-white/90"
            : "text-gray-400 dark:text-gray-400"
        } ${className}`}
        value={selectedValue}
        onChange={handleChange}
      >
        {/* Placeholder option */}
        <option
          value=""
          disabled
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {placeholder}
        </option>
        {options?.length > 0 &&
          options.map((option) => (
            <option
              key={Math.random()}
              value={option.value}
              className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
            >
              {option.label}
            </option>
          ))}
      </select>
      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
              ? "text-success-500"
              : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Select;
