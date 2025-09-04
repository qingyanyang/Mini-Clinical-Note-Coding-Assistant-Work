import { MAX_LENGTH } from "@/constants";
import clsx from "clsx";
import { ArrowUp, FileWarning, Loader2, Sparkles } from "lucide-react";
import type { TextareaHTMLAttributes } from "react";

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave: () => void;
  name: string;
  input: string;
  placeholder?: string;
  errorMsg?: string;
  maxLength?: number;
  disableSubmit: boolean;
}
const TextArea: React.FC<ITextAreaProps> = ({
  isLoading,
  onChange,
  onSave,
  name,
  input,
  placeholder = "Ask AI a medical question or make a request...",
  errorMsg,
  maxLength = MAX_LENGTH,
  disableSubmit = false,
  ...props
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      e.preventDefault();
      onSave();
    }
  };
  const disableBtn = errorMsg?.trim() !== "" || disableSubmit;
  return (
    <div className="flex flex-col gap-2">
      <div
        className={clsx(
          "relative transition-all duration-500 shadow-lg rounded-lg border border-border",
          isLoading
            ? "ring-4 ring-emerald-400 ring-opacity-75 shadow-lg shadow-emerald-200/50"
            : ` ${
                disableBtn
                  ? "ring-2 ring-destructive"
                  : "focus-within:ring-2 focus-within:ring-emerald-400"
              } focus-within:ring-opacity-50`
        )}
      >
        {isLoading && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-100/20 via-blue-100/20 to-emerald-100/20 animate-pulse"></div>
        )}
        <Sparkles className="absolute top-4 left-4" />
        <textarea
          autoFocus
          name={name}
          value={input}
          onChange={onChange}
          placeholder={placeholder}
          disabled={isLoading}
          className="p-10 rounded-4xl focus:outline-0 bg-white w-full h-[260px] resize-none text-lg placeholder:text-gray-500 focus:ring-0 z-10"
          {...props}
          maxLength={maxLength}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={onSave}
          disabled={disableBtn || isLoading}
          className={clsx(
            isLoading
              ? "bg-emerald-500 animate-pulse shadow-lg shadow-emerald-200"
              : disableBtn
              ? "bg-destructive cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer ",
            "absolute bottom-4 right-4 rounded-full w-14 h-14 transition-all duration-300text-white flex items-center justify-center text-white"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <ArrowUp className="w-6 h-6" />
          )}
        </button>
        {isLoading && (
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-2 rounded-full border border-emerald-200">
              <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
              <span className="text-sm text-emerald-700 font-medium">
                Analyzing...
              </span>
            </div>
          </div>
        )}
      </div>
      {errorMsg && (
        <span className="flex text-destructive items-center gap-1">
          <FileWarning size={16} />
          <p>{errorMsg}</p>
        </span>
      )}
    </div>
  );
};

export default TextArea;
