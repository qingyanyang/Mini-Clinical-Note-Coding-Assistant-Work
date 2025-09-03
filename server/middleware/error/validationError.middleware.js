import ValidationError from "../../exceptions/validationError.js";

export default (err, req, res, next) => {
    if (err instanceof ValidationError) {
        res.status(404).json({ error: err.message });
        return;
    }
    next();
}