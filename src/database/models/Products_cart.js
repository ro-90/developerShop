module.exports = (sequelize, DataTypes) => {
    const alias = 'products_cart';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            
        },
        create_time: {
            type: DataTypes.TIMETAMP,
            
        },

       
    };
    const config = {
        tableName: 'products_cart',
        timestamps: true,
        underscored: true
    }
    const Products_cart = sequelize.define(alias, cols, config);
    Products_cart.associate = function (models) {
        Products_cart.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });
        Products_cart.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'id_product'
        });
    }
    return Products_cart;
}