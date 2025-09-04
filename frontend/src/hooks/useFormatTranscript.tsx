import { useState } from "react";
import type {
  IApiFullResponse,
  IFormatRequest,
  IFormattedResponse,
} from "@/types";
import { API_BASE_URL } from "@/constants";

export function useFormatTranscript() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [formatted, setFormatted] = useState<string>("");

  const formatTranscript = async (payload: IFormatRequest) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/format`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await res.json()) as IApiFullResponse<IFormattedResponse>;
      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }

      if (json.status === 201) {
        const structured = json.data.parsedResponse.parsed.turns ?? [];
        setFormatted(
          structured
            .map(({ speaker, text }) => `${speaker}: ${text}`)
            .join("\n")
        );

        return json.data.parsedResponse;
      }

      throw new Error(`Unexpected status ${json.status}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError("");
    setFormatted("");
  };

  return {
    formatTranscript,
    loading,
    error,
    formatted,
    reset,
    setFormatted,
  };
}
