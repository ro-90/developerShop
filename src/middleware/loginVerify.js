const loginVerify = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        return res.redirect('/users/login') // si no esta logueado lo redirecc
    }
};

module.exports = loginVerify;