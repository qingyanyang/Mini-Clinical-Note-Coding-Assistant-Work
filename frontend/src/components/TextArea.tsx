// TextArea.tsx
import { MAX_LENGTH } from "@/constants";
import clsx from "clsx";
import { FileWarning, Loader2, Sparkles } from "lucide-react";
import { type TextareaHTMLAttributes } from "react";
import AppButton from "./AppButton";

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isSubmitLoading: boolean;
  isFormatLoading: boolean;
  isSample1Loading: boolean;
  isSample2Loading: boolean;
  onSave: () => Promise<void>;
  onPaste: () => Promise<void>;
  onClickSample1: () => Promise<void>;
  onClickSample2: () => Promise<void>;
  name: string;
  placeholder?: string;
  errorMsg?: string;
  maxLength?: number;
  disableSubmit: boolean;
  formatted: string;
  showSample?: boolean;
}

const TextArea: React.FC<ITextAreaProps> = ({
  isSubmitLoading,
  isFormatLoading,
  isSample1Loading,
  isSample2Loading,
  onSave,
  onPaste,
  onClickSample1,
  onClickSample2,
  name,
  placeholder = "Paste transcript, then Analyze…",
  errorMsg,
  maxLength = MAX_LENGTH,
  disableSubmit = false,
  formatted,
  showSample = true,
  ...props
}) => {
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      e.preventDefault();
      await onSave();
    }
  };

  const isLoading =
    isSubmitLoading || isFormatLoading || isSample1Loading || isSample2Loading;

  const isError = errorMsg?.trim() !== "" || disableSubmit;

  return (
    <div className="flex flex-col gap-2 w-full ">
      <AppButton
        onClick={onPaste}
        isLoading={isFormatLoading}
        disabled={isLoading}
        isError={isError}
        buttonText="Paste Transcript Here"
        className={"w-60 h-14 rounded-2xl m-auto mb-2"}
      />
      <div
        className={clsx(
          "relative transition-all duration-500 shadow-lg rounded-lg border border-border",
          isLoading
            ? "ring-4 ring-emerald-400 ring-opacity-75 shadow-lg shadow-emerald-200/50"
            : ` ${
                isError
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
          value={formatted}
          placeholder={placeholder}
          disabled={true}
          className="p-10 rounded-4xl focus:outline-0 bg-white w-full h-[260px] resize-none text-lg placeholder:text-gray-500 focus:ring-0 z-10"
          maxLength={maxLength}
          onKeyDown={handleKeyDown}
          {...props}
        />
        <AppButton
          onClick={onSave}
          isLoading={isSubmitLoading}
          disabled={isLoading || isError}
          isError={isError}
          className={"absolute bottom-4 right-4 rounded-full w-14 h-14 "}
        />
        {isSubmitLoading && (
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
      {showSample && (
        <div className="flex gap-4 mt-4">
          <AppButton
            onClick={onClickSample1}
            isLoading={isSample1Loading}
            disabled={isLoading}
            isError={isError}
            buttonText="Transcript Sample 1"
            className={"w-40 h-20 rounded-2xl mb-2"}
          />
          <AppButton
            onClick={onClickSample2}
            isLoading={isSample2Loading}
            disabled={isLoading}
            isError={isError}
            buttonText="Transcript Sample 2"
            className={"w-40 h-20 rounded-2xl mb-2"}
          />
        </div>
      )}
    </div>
  );
};

export default TextArea;
