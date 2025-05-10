const productCarltController = {
    index:function(req, res,next) {
        db = require('../database/models');
        db.Product.findAll()
        .then(function(products){
            return res.render('products/productCarlt',{ title: 'carrito de productos', products });
        })
        .catch(function(error){
            console.log(error)
        })
   
}


}


module.exports = productCarltController;