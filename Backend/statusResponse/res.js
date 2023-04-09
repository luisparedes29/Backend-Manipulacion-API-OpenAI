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

