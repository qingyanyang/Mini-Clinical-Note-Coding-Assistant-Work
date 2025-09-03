export const generateAnalysis = async ({ transcriptText }) => {
    const serviceRes = transcriptText + ' from service ai processed';
    return { serviceRes };
}