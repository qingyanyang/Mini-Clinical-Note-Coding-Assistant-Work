
import { generateAnalysis } from '../services/analysis.service.js';

export const createAnalysis = async (req, res, next) => {
    try {
        const { transcriptText } = req.body ?? {};
        const serviceRes = await generateAnalysis({ transcriptText });
        res.formatResponse(serviceRes, 201);
    } catch (e) {
        console.error(e);
        next(e);
    }
}
