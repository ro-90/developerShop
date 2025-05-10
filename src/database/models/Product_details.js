module.exports = (sequelize, DataTypes) => {
    const alias = 'product_detail';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_products_cart: {
            type: DataTypes.INTEGER,
            
        },
        id_products: {
            type: DataTypes.INTEGER,
            
        },
        items: {
            type: DataTypes.INTEGER,
            
        }
    };
    const config = {
        tableName: 'products_detail',
        timestamps: true,
        underscored: true
    }
    const Product_detail = sequelize.define(alias, cols, config);
    Product_detail.associate = function (models) {
        Product_detail.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'detail_id'
        });
        Product_detail.belongsTo(models.product_cart, {
            as: 'product_cart',
            foreignKey: 'product_cart_id'
        });
    }
    return Product_detail;
}
    
    