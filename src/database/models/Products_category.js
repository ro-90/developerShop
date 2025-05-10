module.exports = (sequelize, DataTypes) => {
    const alias = 'Product_category';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productName:{
            type: DataTypes.STRING
            
        },
        
        
    };
    const config = {
        tableName: 'products_categorys',
        underscored: true,
        timestamps: true,
    }
    const Product_category = sequelize.define(alias, cols, config);
    
    Product_category.associate = function (models) {
        Product_category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'id_categorys'
        });
        Product_category.belongsTo(models.Product, {
            as: 'products',
            foreignKey: 'id_categorys'
        });

    
    
        
    }
}
