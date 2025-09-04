// App.tsx
import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import HeaderAnimation from "../components/HeaderAnimation";
import Textarea from "../components/TextArea";
import ResultsTabs from "../components/ResultsTabs";
import EmergencyPopup from "../components/EmergencyPopup";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { MAX_LENGTH } from "@/constants";
import { useAnalyze } from "@/hooks/useAnalyze";
import "./index.css";
import { useFormatTranscript } from "@/hooks/useFormatTranscript";

function App() {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [ackChecked, setAckChecked] = useState<boolean>(false);

  const {
    handleSubmit,
    requiredAck,
    loading: isSubmitLoading,
    error: submitError,
    data: analysisRes,
    reset,
  } = useAnalyze();

  const {
    formatTranscript,
    loading: isFormatLoading,
    error: formatError,
    formatted,
  } = useFormatTranscript();

  const resetAll = () => {
    setAckChecked(false);
    reset();
  };

  useEffect(() => {
    if (formatted.trim() !== "") {
      resetAll();
      const instantErrorMsg = getErrorMessage(formatted, {
        label: "transcript",
        required: true,
        limit: MAX_LENGTH,
      });
      setErrorMsg(instantErrorMsg);
    }
  }, [formatted]);

  const onPaste = async () => {
    const text = await navigator.clipboard.readText();
    if (text.trim()) {
      await formatTranscript({ rawTranscriptText: text });
    }
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col p-6 gap-10">
        <Banner />
        <HeaderAnimation />
        <Textarea
          disabled
          isSubmitLoading={isSubmitLoading}
          isFormatLoading={isFormatLoading}
          onSave={() =>
            handleSubmit({ transcriptText: formatted, ack: ackChecked })
          }
          onPaste={onPaste}
          name={"transcript"}
          errorMsg={errorMsg || submitError || formatError}
          disableSubmit={requiredAck && !ackChecked}
          formatted={formatted}
        />
        {requiredAck && <EmergencyPopup setAckChecked={setAckChecked} />}
        {analysisRes && <ResultsTabs analysisResults={analysisRes} />}
      </div>
    </div>
  );
}

export default App;
