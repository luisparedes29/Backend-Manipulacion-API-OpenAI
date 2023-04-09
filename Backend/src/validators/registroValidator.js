const { body, validationResult } = require('express-validator');
module.exports.registroValidator = [
    body('correo').isString().isEmail().notEmpty(),
    body('username').isString().notEmpty(),
    body('password').isString().notEmpty().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 dígitos'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        next();
    }]