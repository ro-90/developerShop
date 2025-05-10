module.exports = (sequelize, DataTypes) => {
    const alias = 'Users_category';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       
        
        categorysName: {
            type: DataTypes.INTEGER,
            
        }
    };
    const config = {
        tableName: 'users_categorys',
        timestamps: true,
        underscored: true
    }
    const Users_category = sequelize.define(alias, cols, config);
    Users_category.associate = function (models) {
        Users_category.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'id_user'
        });
        
        
    }
    return Users_category;
}