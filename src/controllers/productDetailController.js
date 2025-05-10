const productDetailController = {
    index:function(req, res,next) {
    return res.render('products/productDetail',{ title: 'Detalles de productos' });
}


}


module.exports = productDetailController;