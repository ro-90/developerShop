

module.exports = {

    index: function (req, res, next) {
        db.Product.findAll()
            .then(function (products) {
                return res.render('products/products', { title: 'productos', products });
            })
            .catch(function (error) {
                console.log(error)
            })
    },
    list: (req, res) => {
        return res.send('products/products')
    },
    show: (req, res) => {
        return res.send('estamos en el detalle del producto: ${req.params.id}')
    },
    detail: (req, res) => {
        return res.send('products/detail')
    },
    add: (req, res) => {
        return res.send('products/add')
    },
    create: (req, res) => {
        return res.send('products/create')
    },
    edit: (req, res) => {
        return res.render('products/productEdit', { title: 'Detalles de productos' });

    },
    update: (req, res) => {
        return res.send('products/update')
    },
    remove: function (req, res) {
        return res.send('products/remove')
    },
    search: function (req, res) {
        return res.send('products/search')
    }
}