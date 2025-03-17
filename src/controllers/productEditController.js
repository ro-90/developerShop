const productEditController = {
    index:function(req, res,next) {
    return res.render('productEdit',{ title: 'Detalles de productos' });
}


}


module.exports = productEditController;