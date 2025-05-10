const loginController = {
    index:function(req, res,next) {
    return res.render('users/login',{ title: 'iniciar secion' });
}


}






module.exports = loginController;