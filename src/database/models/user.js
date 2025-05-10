module.exports = (sequelize, DataTypes) => {
    const alias = 'User';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        first_name: {
            type: DataTypes.STRING,
            
        },
        last_name: {
            type: DataTypes.STRING,
            
        },
        email: {
            type: DataTypes.STRING,
            
        },
        pasword: {
            type: DataTypes.STRING,
        } ,
        image: {
            type: DataTypes.BLOB,
            
        },
        createTime: {
            type: DataTypes.TIME,
            
        },
         id_users_category: {
            type: DataTypes.INTEGER,
         }
        
        };
        
        const config = {
            tableName: 'users',
            timestamps: true,
            underscored: true
        }
        const User = sequelize.define(alias, cols, config);
        User.associate = function (models) {
            User.hasMany(models.Product_cart, {
                as: 'products_cart',
                foreignKey: 'user_id'
            });
        }
        return User;
    }
    
   