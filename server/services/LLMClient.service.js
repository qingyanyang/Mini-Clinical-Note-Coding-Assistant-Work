import OpenAI from "openai";
import { ASSISTANT_ROLE, MODEL, API_KEY, USER_ROLE } from "../config/openAI.js";
import { zodTextFormat } from "openai/helpers/zod.mjs";
import { AnalysisSchema } from "../schemas/analysis.validation.js";

const openAIClient = new OpenAI({ apiKey: API_KEY });

// @ts-ignore
export const runAnalysisLLM = async (transcript) => {
    const system = [
        "You are a primary-care clinical note assistant.",
        "Return structured JSON that matches the provided schema exactly (no extra keys).",
        "Use cautious language; avoid definitive medical claims.",
        "If emergencies are present (chest pain, suicidal, shortness of breath, anaphylaxis, stroke), set risks.riskLevel='high' and list reasons. Do NOT give triage instructions.",
        "Keep content concise; derive only from the transcript."
    ].join(" ");

    const user = [
        "Transcript:",
        '"""',
        transcript,
        '"""',
        "Return ONLY the JSON per schema."
    ].join("\n");

    // @ts-ignore
    const response = await openAIClient.responses.parse({
        model: MODEL,
        input: [
            // @ts-ignore
            { role: ASSISTANT_ROLE, content: system },
            // @ts-ignore
            {
                role: USER_ROLE,
                content: user,
            },
        ],
        text: {
            format: zodTextFormat(AnalysisSchema, "event")
        }
    });

    if (response.status !== "completed" || !response.output_parsed) {
        throw new Error("Model did not complete a valid structured response");
    }

    return {
        parsed: response.output_parsed,
        meta: {
            model: response.model,
            usage: response.usage,
            status: response.status
        }
    };
}

