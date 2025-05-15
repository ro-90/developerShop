const {body} = require('express-validator');
const db = require('../database/models');

module.exports = [
    body('userName').notEmpty().withMessage('El campo no puede estar vacio').bail().trim()
        .isAlpha().withMessage('No se permiten numeros o caracteres especiales').bail()
        .isLength({ min: 5, max: 10 }).withMessage("El minimo de caracters es 5 y el maximo 10"),

    body('email').notEmpty().withMessage('El campo no puede estar vacio').bail()
    .isEmail().withMessage('El campo debe ser un email con formato válido').bail()
    .custom(async (value) => {
        const user = await db.User.findOne({ where: { email: value } });
           if (user) {
            throw new Error('El email ya se encuentra registrado');
        }
        return true;
    }),

    body('password').notEmpty().withMessage('El campo no puede estar vacio').bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/).withMessage("Debe tener entre 8 y 20 caracteres, incluyendo una mayúscula, una minuscula, un número y un caracter especial"),

    body('confirmPassword').notEmpty().withMessage('El campo no puede estar vacio').bail()
   .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),

]