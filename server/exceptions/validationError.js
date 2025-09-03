export default class ValidationError extends Error {
    constructor(message = 'Validation failed', details = []) {
        super(message);
        this.name = 'ValidationError';
        this.status = 400;
        this.details = details;
    }
}