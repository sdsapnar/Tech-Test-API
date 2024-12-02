const ac = require('./app.contants');

exports.getResponseStructure = (status, message, data) => ({
    status,
    message,
    response: data || {},
});

exports.getParameterMissingResponse = (missingParams) => {
    const missingParamsString = missingParams.join(',');
    return this.getResponseStructure(
        ac.status.badRequest,
        `${ac.message.parameterMissing} ${missingParamsString}`
    );
};

exports.getServerErrorResponse = (err) =>
    this.getResponseStructure(
        ac.status.internalServerError,
        `${ac.message.internalServerError} ( ${err} )`
    );

exports.getSuccessResponse = (message, data) => {
    let m = message;
    let d = data;
    if (message !== null && message !== undefined && data === undefined) {
        d = message;
        m = null;
    }
    return this.getResponseStructure(
        ac.status.success,
        m || ac.message.success,
        d
    );
};

exports.getBadRequestResponse = (message, data) => {
    let m = message;
    let d = data;
    if (message !== null && message !== undefined && data === undefined) {
        d = message;
        m = null;
    }
    return this.getResponseStructure(
        ac.status.badRequest,
        m || ac.message.failed,
        d
    );
};