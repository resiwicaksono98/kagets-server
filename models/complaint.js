/** @format */

"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");
const db = require("./index");
module.exports = (sequelize, DataTypes) => {
   class Complaint extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         Complaint.belongsTo(models.User, { as: "user" });
         Complaint.belongsTo(models.Problem_types, { foreignKey: "problem", as: "problem_type" });
         Complaint.hasOne(models.complaint_result, { foreignKey: "complaintId", as: "complaint_result", onDelete: "CASCADE" });
         //  Hooks
         Complaint.addHook("afterCreate", (complaint, options) => {
            models.complaint_result
               .create({
                  complaintId: complaint.id,
               })
               .then((res) => console.log("Complaint Result Created"))
               .catch((err) => console.log("error"));
         });
      }
   }
   Complaint.init(
      {
         id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            primaryKey: true,
         },
         userId: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         problem: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         description: {
            type: DataTypes.TEXT,
         },
         support_image: { type: DataTypes.STRING, allowNull: false },
      },
      {
         sequelize,
         modelName: "Complaint",
      }
   );
   return Complaint;
};
