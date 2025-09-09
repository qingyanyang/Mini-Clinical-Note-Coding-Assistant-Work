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
  const [isSample1Loading, setIsSample1Loading] = useState<boolean>(false);
  const [isSample2Loading, setIsSample2Loading] = useState<boolean>(false);
  const [isPasteLoading, setIsPasteLoading] = useState<boolean>(false);

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
    error: formatError,
    formatted,
  } = useFormatTranscript();

  const onPaste = async () => {
    setIsPasteLoading(true);
    const text = await navigator.clipboard.readText();
    if (text.trim()) {
      await formatTranscript({ rawTranscriptText: text });
    }
    setIsPasteLoading(false);
  };

  const onClickSample = async (sampleNum: number) => {
    if (sampleNum === 1) {
      setIsSample1Loading(true);
    } else {
      setIsSample2Loading(true);
    }
    const res = await fetch(`/sampleTranscript0${sampleNum}.text`, {
      cache: "no-cache",
    });
    if (!res.ok) setErrorMsg("Failed to load sample");
    const text = await res.text();
    await formatTranscript({ rawTranscriptText: text });
    if (sampleNum === 1) {
      setIsSample1Loading(false);
    } else {
      setIsSample2Loading(false);
    }
  };

  const resetAll = () => {
    setAckChecked(false);
    reset();
  };

  const handleSave = async () => {
    const lastCheckErrorMsg = getErrorMessage(formatted, {
      label: "transcript",
      required: true,
      limit: MAX_LENGTH,
    });
    setErrorMsg(lastCheckErrorMsg);
    if (!lastCheckErrorMsg) {
      await handleSubmit({ transcriptText: formatted, ack: ackChecked });
    }
  };

  useEffect(() => {
    if (formatted) {
      resetAll();
      const instantErrorMsg = getErrorMessage(formatted, {
        label: "transcript",
        required: true,
        limit: MAX_LENGTH,
      });
      setErrorMsg(instantErrorMsg);
    }
  }, [formatted]);
  return (
    <div className=" min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col p-6 gap-10">
        <Banner />
        <HeaderAnimation />
        <Textarea
          disabled
          isSubmitLoading={isSubmitLoading}
          isFormatLoading={isPasteLoading}
          isSample1Loading={isSample1Loading}
          isSample2Loading={isSample2Loading}
          onSave={handleSave}
          onPaste={onPaste}
          onClickSample1={() => onClickSample(1)}
          onClickSample2={() => onClickSample(2)}
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
