class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message);          // ⭐ VERY IMPORTANT
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
