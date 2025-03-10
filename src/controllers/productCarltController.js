const productCarltController = {
    index:function(req, res,next) {
    return res.render('productCarlt',{ title: 'carrito de productos' });
}


}


module.exports = productCarltController;