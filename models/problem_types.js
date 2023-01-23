/** @format */

"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Problem_types extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         Problem_types.hasMany(models.Complaint, { foreignKey: "problem", as: "complaint" });
      }
   }
   Problem_types.init(
      {
         id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
         },
      },
      {
         sequelize,
         modelName: "Problem_types",
      }
   );
   return Problem_types;
};
