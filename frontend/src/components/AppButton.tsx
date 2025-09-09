import clsx from "clsx";
import { ArrowUp, Loader2 } from "lucide-react";
import React from "react";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
  isError: boolean;
  className: string;
  buttonText?: string;
}
const AppButton: React.FC<IButtonProps> = ({
  onClick,
  isLoading,
  isError,
  className,
  buttonText,
  disabled,
  ...props
}) => {
  const base =
    "flex items-center justify-center text-white transition-all duration-300";
  const ready = "bg-emerald-600 hover:bg-emerald-700 cursor-pointer";
  const loading = "bg-emerald-500 animate-pulse shadow-lg shadow-emerald-200";
  const errored = "bg-red-700 hover:bg-red-400";
  const notAllowed = "!cursor-not-allowed disabled:opacity-60";
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-busy={isLoading}
      className={clsx(
        base,
        isLoading ? loading : ready,
        isError && errored,
        disabled && notAllowed,
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="w-6 h-6 animate-spin" />
      ) : buttonText ? (
        <p className="font-bold text-xl">{buttonText}</p>
      ) : (
        <ArrowUp className="w-6 h-6" />
      )}
    </button>
  );
};

export default AppButton;
