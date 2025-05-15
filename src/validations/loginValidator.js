const { body } = require('express-validator');
const db = require('../database/models');
const bcrypt = require("bcrypt");

async function comparePass(pass, hash) {
    return await bcrypt.compare(pass, hash);
}
module.exports = [
    body('email').notEmpty().withMessage('El campo no puede estar vacio').bail()
        .isEmail().withMessage('El campo debe ser un correo').bail(),
    body('password').notEmpty().withMessage('El campo no puede estar vacio').bail()
        .custom(async (value, { req }) => {
            const user = await db.User.findOne({
                where: {
                    email: req.body.email,
                }
            });
            if (!user || !bcrypt.compareSync(value, user.password)) {
                throw new Error('Las credenciales no son validas');
            }
            return true;
        })
]