module.exports.resError = function (req, res, mensaje, status) {
    const statusCode = status;
    const mensajeError = mensaje
    res.status(statusCode).json({
        error: true,
        status: statusCode,
        body: mensajeError
    })
}

module.exports.resSuccess = function (req, res, mensaje, status) {
    const statusCode = status;
    const mensajeError = mensaje
    res.status(statusCode).json({
        error: false,
        status: statusCode,
        body: mensajeError
    })
}

module.exports.resSuccessToken = function (req, res, token, mensaje, status) {
    const statusCode = status;
    const mensajeError = mensaje;
    const tokenTemp = token;
    res.status(statusCode).json({
        error: false,
        status: statusCode,
        token: tokenTemp,
        body: mensajeError
    })
}
