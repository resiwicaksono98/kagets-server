const uuid = require('uuid')
const bcrypt = require('bcrypt')
const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/

module.exports = (sequelize, DataTypes) => {
    const Prdduct = sequelize.define('Product', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        }}, {
        hooks: {
            beforeCreate: (user, options) => {
                user.password = user.password && user.password != '' ? bcrypt.hashSync(user.password, 10) : "";
            }
        }
    })

    return Prdduct
}




