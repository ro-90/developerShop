const fs = require('fs');
const db = require('../database/models');

module.exports = {

    index: function (req, res, next) {
        db.Product.findAll()
            .then(function (products) {
                return res.render('products/productList', { title: 'productos', products });
            })
            .catch(function (error) {
                console.log(error)
            })
    },
    show: (req, res) => {
        return res.send('estamos en el detalle del producto: ${req.params.id}')
    },
    detail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: [
                    { association: 'category' },
                    { association: 'brand' },
                    { association: 'colors' },
                    { association:'sizes' }
                ]
            })
            const relatedProducts = await db.Product.findAll({
                    where: {
                        brandId: product.brandId,
                        id: {
                            [db.Sequelize.Op.ne]: product.id
                        }
                    },
                    limit: 3
                })
            
            return res.render('products/productDetail', { 
                title: 'Detalle del producto', 
                ...product.dataValues,
                relatedProducts
            });
        } catch (error) {
            console.log(error);
        }
    },
    add: async (req, res) => {
        try {
            const [categories, brands, colors, sizes] = await Promise.all([
                db.Category.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                }),
                db.Brand.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                }),
                db.Color.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                }),
                db.Size.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                })
            ])
            return res.render('products/productAdd', { title: 'Agregar producto', categories, brands, colors, sizes });
            
        } catch (error) {
           console.log(error);
            
        }
    },
    create: async (req, res) => {
        try {
            let { name, description, price, brandId, categoryId, colors, sizes } = req.body;
            const product = await db.Product.create({
                name : name.trim(),
                description : description.trim(),
                price,
                brandId,
                categoryId,
                image: req.file? req.file.filename : null
            })

            colors = typeof colors === 'string' ? [colors] : colors;
            sizes = typeof sizes === 'string' ? [sizes] : sizes;
            
            await Promise.all([
                product.addColors(colors),
                product.addSizes(sizes)
            ])
            return res.redirect('/admin')
        }   
        catch (error) {
            console.log(error);
        }
    },
    edit: async (req, res) => {
        try {
            const [product, categories, brands, colorsArray, sizesArray] = await Promise.all([
                db.Product.findByPk(req.params.id, {
                include: [
                    { association: 'colors' },
                    { association:'sizes' }
                ]
            }),
                db.Category.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                }),
                db.Brand.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                }),
                db.Color.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                }),
                db.Size.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                })
        ])
            return res.render('products/productEdit', { 
                title: 'Editar producto',
                ...product.dataValues,
                categories,
                brands,
                colorsArray,
                sizesArray
            });
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        try {
            let { name, description, price, brandId, categoryId, colors, sizes } = req.body;
            const product = await db.Product.findByPk(req.params.id);

            (req.file && fs.existsSync('./public/images/' + product.image)) && fs.unlinkSync('./public/images/' + product.image)

            product.name = name.trim();
            product.description = description.trim();
            product.price = price;
            product.brandId = brandId;
            product.categoryId = categoryId;
            product.image = req.file? req.file.filename : product.image;
            await product.save();
            colors = typeof colors ==='string'? [colors] : colors;
            sizes = typeof sizes ==='string'? [sizes] : sizes;
            await Promise.all([
                product.setColors(colors),
                product.setSizes(sizes)
            ])
            
            return res.redirect('/admin');

        } catch (error) {
            console.log(error);
        }
        return res.send('products/update')
    },
    remove: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
            (fs.existsSync('./public/images/' + product.image)) && fs.unlinkSync('./public/images/' + product.image)

            await Promise.all([
                product.setColors([]), 
                product.setSizes([])
            ]);
            await product.destroy();
            
            return res.redirect('/admin');
        } catch (error) {
            console.log(error);
        }
        return res.send('products/remove');
    },
    search: async (req, res) => {
        try {
            const products = await db.Product.findAll({
                where: {
                    name: {
                        [db.Sequelize.Op.like]: `%${req.query.keywords}%`
                    }
                }
            })
            return res.render('products/productList', { title: 'productos', products });
        }
        catch (error) {
            console.log(error); 
        }
    }
}