import { runAnalysisLLM } from "./LLMClient.service.js";


export const generateAnalysis = async ({ transcriptText, ack }) => {

    const analysisRes = await runAnalysisLLM(transcriptText);

    return { ...analysisRes };
}