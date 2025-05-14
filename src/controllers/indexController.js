

const fs = require('fs');

const indexController = {
    index: function (req, res, next) {

        const archivoProductos = fs.readFileSync(__dirname + "/product.json", "utf-8");
        const products = JSON.parse(archivoProductos);

        return res.render('admin', { title: 'administracion', products });
    }


}


module.exports = indexController;