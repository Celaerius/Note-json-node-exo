const validate = (schema) => {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            if (!req.body) {
                throw new Error("Validation resulted in null or undefined");
            }
            next();
        } catch (err) {
            console.error("Validation error:", req.body, err);
            return res.status(400).json({ message: 'Invalid request', errors: err.Errors });
        }
    };
};

module.exports =  validate ;