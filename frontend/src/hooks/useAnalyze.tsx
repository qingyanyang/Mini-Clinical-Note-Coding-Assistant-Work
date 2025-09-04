// src/hooks/useAnalyze.ts
import { useState } from "react";
import type {
  IAnalyzeRequest,
  IApiFullResponse,
  IParsedResponse,
} from "@/types";
import { API_BASE_URL } from "@/constants";

export function useAnalyze() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<IParsedResponse | null>(null);
  const [requiredAck, setRequiredAck] = useState<boolean>(false);

  const handleSubmit = async (payload: IAnalyzeRequest) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await res.json()) as IApiFullResponse<IParsedResponse>;
      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }

      const parsed = json.data.parsedResponse;

      if (json.status === 200 && parsed.guardrails.requiresAcknowledgement) {
        setRequiredAck(true);
      }

      if (json.status === 201) {
        setData(parsed);
        setRequiredAck(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e?.message ?? "unknown error");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError("");
    setData(null);
  };

  return { requiredAck, handleSubmit, loading, error, data, setData, reset };
}
