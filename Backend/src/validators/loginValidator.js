const { body, validationResult } = require('express-validator');
module.exports.loginValidator = [
    body('correo').isString().isEmail().notEmpty(),
    body('password').isString().notEmpty().isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }]