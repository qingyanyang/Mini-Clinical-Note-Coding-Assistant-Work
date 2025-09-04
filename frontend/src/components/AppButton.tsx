import clsx from "clsx";
import { ArrowUp, Loader2 } from "lucide-react";
import React from "react";

export interface IButtonProps {
  onClick: () => void;
  isLoading: boolean;
  errorDisable: boolean;
  className: string;
  buttonText?: string;
}
const AppButton: React.FC<IButtonProps> = ({
  onClick,
  isLoading,
  errorDisable,
  className,
  buttonText,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || errorDisable}
      className={clsx(
        isLoading
          ? "bg-emerald-500 animate-pulse shadow-lg shadow-emerald-200"
          : errorDisable
          ? "bg-destructive cursor-not-allowed"
          : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer ",
        "transition-all duration-300text-white flex items-center justify-center text-white",
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
