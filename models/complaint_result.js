/** @format */

"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Complaint_result extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Complaint_result.belongsTo(models.Complaint, { foreignKey: "complaintId", as: "complaint", onDelete: "CASCADE" });
      }
   }
   Complaint_result.init(
      {
         id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            primaryKey: true,
         },
         complaintId: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         status: {
            type: DataTypes.ENUM({
               values: ["success", "pending", "checked", "failed"],
            }),
            allowNull: false,
            defaultValue: "pending",
         },
         message: {
            type: DataTypes.TEXT,
         },
         estimated_time: {
            type: DataTypes.STRING,
         },
      },
      {
         sequelize,
         modelName: "complaint_result",
      }
   );
   return Complaint_result;
};
