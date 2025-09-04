
import { AnalyzeRequestSchema, FormatRawRequestSchema } from '../schemas/analysis.validation.js';
import { generateAnalysis } from '../services/analysis.service.js';
import { runFormatRequestLLM } from '../services/LLMClient.service.js';

export const createAnalysis = async (req, res, next) => {
    try {
        //validate request
        const parsedRequest = AnalyzeRequestSchema.parse(req.body ?? {});

        const { transcriptText, ack = false } = parsedRequest;
        const parsedResponse = await generateAnalysis({ transcriptText, ack });
        // @ts-ignore
        const gated = parsedResponse?.guardrails?.requiresAcknowledgement === true;
        res.formatResponse({ parsedResponse }, gated ? 200 : 201);
    } catch (e) {
        console.error(e);
        next(e);
    }
}

export const CreateFormatTranscript = async (req, res, next) => {
    try {
        const parsedRequest = FormatRawRequestSchema.parse(req.body ?? {});
        const { rawTranscriptText } = parsedRequest;

        const formattedResponse = await runFormatRequestLLM(rawTranscriptText);
        res.formatResponse({ formattedResponse }, 201);
    } catch (e) {
        console.error(e);
        next(e);
    }
}
