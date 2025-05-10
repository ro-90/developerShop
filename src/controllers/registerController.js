const registerController = {
    index:function(req, res,next) {
    return res.render('users/register',{ title: 'registrate' });
}


}


module.exports = registerController;