import { useState } from "react";

import Banner from "../components/Banner";
import HeaderAnimation from "../components/HeaderAnimation";
import Textarea from "../components/TextArea";
import ResultsTabs from "../components/ResultsTabs";
import EmergencyPopup from "../components/EmergencyPopup";
import type {
  IAnalyzeRequest,
  IApiFullResponse,
  IParsedResponse,
} from "@/types";
import "./index.css";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { API_BASE_URL, MAX_LENGTH } from "@/constants";

function App() {
  const [input, setInput] = useState<string>("");
  const [analysisRes, setAnalysisRes] = useState<IParsedResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [ackChecked, setAckChecked] = useState<boolean>(false);
  const [showEmergencyPopup, setShowEmergencyPopup] = useState<boolean>(false);

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    resetAll();
    const newValue = e.target.value;
    setInput(newValue);
    //validation real time
    const instantErrorMsg = getErrorMessage(newValue, {
      required: true,
      limit: MAX_LENGTH,
    });
    setErrorMsg(instantErrorMsg);
  };

  const resetAll = () => {
    setAckChecked(false);
    setShowEmergencyPopup(false);
    setAnalysisRes(null);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcriptText: input,
          ack: ackChecked,
        } as IAnalyzeRequest),
      });
      const resJson = (await res.json()) as IApiFullResponse;
      const { parsedResponse } = resJson.data;

      if (resJson.status === 200) {
        if (parsedResponse.guardrails.requiresAcknowledgement) {
          setShowEmergencyPopup(true);
        }
      } else if (resJson.status === 201) {
        setAnalysisRes(parsedResponse);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMsg(err?.message ?? "");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex flex-col items-center">
      <div className="max-w-6xl flex flex-col p-6 gap-10">
        <Banner />
        <HeaderAnimation />
        <Textarea
          isLoading={isLoading}
          onChange={onInputChange}
          onSave={onSubmit}
          name={"transcription"}
          input={input}
          value={input}
          errorMsg={errorMsg}
          disableSubmit={showEmergencyPopup && !ackChecked}
        />
        {showEmergencyPopup && <EmergencyPopup setAckChecked={setAckChecked} />}
        {analysisRes && <ResultsTabs analysisResults={analysisRes} />}
      </div>
    </div>
  );
}

export default App;
