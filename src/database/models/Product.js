module.exports = (sequelize, DataTypes) => {
    const alias = 'product';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productName: {
            type: DataTypes.STRING,
            
        },
        image: {
            type: DataTypes.BLOB,
            
        },
        productDescription: {
            type: DataTypes.TEXT,
            
        },
        price: {
            type: DataTypes.DECIMAL,
           
        },
        
        
        id_poduct_categorys: {
            type: DataTypes.INTEGER,
            
        },
       
        
    };
    const config = {
        tableName: 'products',
        timestamps: true,
        underscored: true
    }
    const Product = sequelize.define(alias, cols, config);
    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: 'id_category',
            foreignKey:' id_category'
         });
        Product.belongsTo(models.Product_detail, {
            as: 'detail',
            foreignKey: 'id_detail'
        });
        Product.belongsToMany(models.Color, {
            as: 'colors',
            through: 'Product_color',
            foreignKey: 'product_id',
            otherKey: 'color_id',
            timestamps: true
        });
    }
}