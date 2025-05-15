

const fs = require('fs');

const indexController = {
    index: function (req, res, next) {

        const archivoProductos = fs.readFileSync(__dirname + "/product.json", "utf-8");
        const products = JSON.parse(archivoProductos);

        return res.render('index', { title: 'DevelopShop', products });
    }


}


module.exports = indexController;