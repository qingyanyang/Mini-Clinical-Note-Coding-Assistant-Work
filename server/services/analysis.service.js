import { AnalysisSchema } from "../schemas/analysis.validation.js";
import { runAnalysisLLM } from "./LLMClient.service.js";


export const generateAnalysis = async ({ transcriptText, ack }) => {

    const analysisRes = await runAnalysisLLM(transcriptText, AnalysisSchema);


    return { ...analysisRes };
}