const loginController = {
    index:function(req, res,next) {
    return res.render('login',{ title: 'iniciar secion' });
}


}






module.exports = loginController;