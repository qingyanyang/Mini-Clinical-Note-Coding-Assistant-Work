
import ValidationError from '../exceptions/validationError.js';
import { AnalyzeRequestSchema } from '../schemas/analysis.validation.js';
import { generateAnalysis } from '../services/analysis.service.js';

export const createAnalysis = async (req, res, next) => {
    try {
        //validate request
        const parsed = AnalyzeRequestSchema.safeParse(req.body ?? {});
        if (!parsed.success) {
            const details = parsed.error.issues.map(i => ({
                path: i.path?.join('.') || '(root)',
                message: i.message
            }));
            throw new ValidationError('Validation failed', details);
        }
        const { transcriptText, ack = false } = parsed.data;
        const serviceRes = await generateAnalysis({ transcriptText, ack });

        const gated = serviceRes?.guardrails?.requiresAcknowledgement === true;
        res.formatResponse(serviceRes, gated ? 200 : 201);
    } catch (e) {
        console.error(e);
        next(e);
    }
}
