class ApiError extends Error {

constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
    }
}

class NotFoundError extends ApiError {
    constructor(message = 'Ressource non trouvée') {
        super(message, 404);
    }
}

class ValidationError extends ApiError {
    constructor(message = 'Requête invalide') {
        super(message, 400);
    }
}

module.exports = { ApiError, NotFoundError, ValidationError };