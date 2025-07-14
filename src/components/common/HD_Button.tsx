import React, { MouseEventHandler } from "react";

interface ButtonProps {
  loading: boolean;
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const HD_Button: React.FC<ButtonProps> = ({
  loading,
  title,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 dark:bg-black text-white/90"
    >
      {title}
      {loading && (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
      )}
    </button>
  );
};
