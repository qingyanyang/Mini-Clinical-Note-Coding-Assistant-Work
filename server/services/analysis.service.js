import { runAnalysisLLM } from "./LLMClient.service.js";


export const generateAnalysis = async ({ transcriptText, ack }) => {

    const AnalysisRes = await runAnalysisLLM(transcriptText);

    return { serviceRes: AnalysisRes };
}