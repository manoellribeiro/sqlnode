const { Model, DataTypes } = require('sequelize');

class Address extends Model {
    static init(sequelize){
        super.init({
            zipcode: DataTypes.STRING,
            street: DataTypes.STRING,
            number: DataTypes.INTEGER,
        }, {
          sequelize: sequelize,
          tableName: "addresses"
        }
        )
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner'}) //Identifica que o endereço pertence a um dado User
    }
}

module.exports = Address;