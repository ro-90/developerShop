
module.exports = (sequelize, DataTypes) => {
    const alias = 'Color';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        colorName: {
            type: DataTypes.STRING,
            
        }
    };
    const config = {
        tableName: 'colors',
        timestamps: true,
        underscored: true
    }
    const Color = sequelize.define(alias, cols, config);

    Color.associate = function (models) {
        Color.hasMany(models.Product_color, {
            as: 'products',
            foreignKey: 'id_color'
        });
    }

    return Color;
}
