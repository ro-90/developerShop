const profileController = {
    index:function(req, res,next) {
    return res.render('users/profile',{ title: 'registrate' });
}


}


module.exports = profileController;