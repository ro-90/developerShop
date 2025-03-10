const registerController = {
    index:function(req, res,next) {
    return res.render('register',{ title: 'registrate' });
}


}


module.exports = registerController;