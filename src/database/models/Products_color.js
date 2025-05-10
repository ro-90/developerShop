module.exports = (sequelize, DataTypes) => {
    const alias = 'Products_color';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_product: {
            type: DataTypes.INTEGER,
             
        },
        id_color: {
            type: DataTypes.INTEGER,
             
        }
    };
    const config = {
        tableName: 'products_colors',
        timestamps: true,
        underscored: true
    }
    const Product_color = sequelize.define(alias, cols, config);

    Product_color.associate = function (models) {
        Product_color.belongsTo(models.Product, {
            as: 'products',
            foreignKey: 'id_product'
        });
        Product_color.belongsTo(models.Color, {
            as: 'colors',
            foreignKey: 'id_color'
        });
    }

    return Product_color;
}