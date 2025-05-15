const db = require('../database/models');

const indexController = {
    index: async (req, res, next) =>  {
        try {
            const [dress, accessories] = await Promise.all([
                db.Product.findAll({
                    where: {
                        categoryId: 1
                    },
                    order: db.sequelize.random(),
                    limit: 4
                }),
                db.Product.findAll({
                    where: {
                        categoryId: 2
                    },
                    order: db.sequelize.random(),
                    limit: 4
                })
            ]);
            return res.render('index', { title: 'DevelopShop', dress, accessories });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = indexController;