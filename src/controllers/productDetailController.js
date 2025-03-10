const productDetailController = {
    index:function(req, res,next) {
    return res.render('productDetail',{ title: 'Detalles de productos' });
}


}


module.exports = productDetailController;