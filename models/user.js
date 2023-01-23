/** @format */

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         User.hasMany(models.News, { foreignKey: "userId", as: "news" });
         User.hasMany(models.Complaint, { foreignKey: "userId", as: "complaint" });
      }
   }
   User.init(
      {
         id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => uuidv4(),
         },
         firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 10,
         },
         lastname: {
            type: DataTypes.STRING,
         },
         email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
               args: true,
               msg: "email already used",
            },
            validate: {
               isEmail: {
                  msg: "Must be a valid email address",
               },
            },
         },
         password: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
               args: true,
               msg: "phone number is not valid",
            },
            validate: {
               isNumeric: true,
            },
         },
         address: {
            type: DataTypes.TEXT,
         },
         mitra_type: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         token: { type: DataTypes.STRING },
         profile_picture: { type: DataTypes.STRING },
         role: { type: DataTypes.STRING },
      },
      {
         sequelize,
         hooks: {
            beforeCreate: (user, options) => {
               user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
            },
         },
         modelName: "User",
      }
   );
   return User;
};
