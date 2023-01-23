/** @format */

const { v4: uuidv4 } = require("uuid");
("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class News extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         News.belongsTo(models.Category, { as: "category" });
         News.belongsTo(models.User, { as: "user" });
      }
   }
   News.init(
      {
         id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: () => uuidv4(),
         },
         categoryId: {
            type: DataTypes.STRING,
         },
         userId: {
            type: DataTypes.STRING,
         },
         title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
         },
         description: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         rate: {
            type: DataTypes.DOUBLE,
         },
         image: {
            type: DataTypes.STRING,
         },
         createdAt: { type: DataTypes.DATE },
         updatedAt: { type: DataTypes.DATE },
      },
      {
         sequelize,
         modelName: "News",
      }
   );
   return News;
};
