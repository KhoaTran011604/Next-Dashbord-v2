import { cn } from "../../styles/lib/utils";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { HD_InputProps } from "types/MainType";

const HD_Input = ({
  title,
  isItemForm = false,
  name,
  type = "text",
  placeholder = "",
  iconPosition = "right",
  fileStyleVariant = "",
  height = "sm",
  disabled = false,
  icon = <></>,

  initValue,
  onChange,
}: HD_InputProps) => {
  const [value, setValue] = useState(initValue);
  const formContext = isItemForm ? useFormContext() : null;
  const errors = formContext?.formState.errors;
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  useEffect(() => {
    initValue && setValue(initValue);
  }, [initValue]);

  return (
    <>
      {title && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {title}
        </label>
      )}
      <div className="mb-4">
        <div
          className={cn(
            "relative mt-3 [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:-translate-y-1/2",
            iconPosition === "left" ? "[&_svg]:left-4.5" : "[&_svg]:right-4.5"
          )}
        >
          <input
            type={type}
            {...(isItemForm ? formContext.register(name) : {})}
            placeholder={placeholder}
            className={cn(
              "h-11 w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-200 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary",
              type === "file"
                ? getFileStyles(fileStyleVariant!)
                : "px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white",
              iconPosition === "left" && "pl-12.5",
              height === "sm" && "py-2.5"
            )}
            disabled={disabled}
            value={value}
            onChange={handleChange}
          />
          {icon}
        </div>
        {isItemForm && errors[name] && (
          <span className="ml-1 select-none text-sm text-red-500">
            {errors[name]?.message as string}
          </span>
        )}
      </div>
    </>
  );
};

function getFileStyles(variant: "style1" | "style2") {
  switch (variant) {
    case "style1":
      return `file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white`;
    default:
      return `file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 file:focus:border-primary dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white px-3 py-[9px]`;
  }
}

export default HD_Input;
