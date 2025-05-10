const productEditController = {
    index:function(req, res,next) {
    return res.render('products/productEdit',{ title: 'Detalles de productos' });
}


}


module.exports = productEditController;