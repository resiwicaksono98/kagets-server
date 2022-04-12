'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class Support_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Support_items.belongsTo(models.User, { as: 'user' })
    }
  }
  Support_items.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4()
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    ktp: {
      type: DataTypes.STRING,
    },
    sim: DataTypes.STRING,
    other: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Support_items',
  });
  return Support_items;
};