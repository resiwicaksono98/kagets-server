/** @format */

"use strict";
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Complaint_results", {
         id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
         },
         complaintId: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         status: {
            type: Sequelize.ENUM({
               values: ["success", "pending", "checked", "failed"],
            }),
            allowNull: false,
            defaultValue: "pending",
         },
         message: {
            type: Sequelize.TEXT,
         },
         estimated_time: {
            type: Sequelize.STRING,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Complaint_results");
   },
};
