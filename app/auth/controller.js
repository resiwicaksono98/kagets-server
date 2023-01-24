/** @format */

const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
   try {
      const refreshToken = req.session.refreshToken;
      if (!refreshToken) return res.status(500).json({ message: "No Token" });
      const users = await db.User.findOne({
         where: { token: refreshToken },
         attributes: ["id", "email", "firstname", "lastname", "phone_number", "mitra_type", "role"],
         include: [
            {
               model: db.News,
               as: "news",
               attributes: ["id", "title", "description", "rate", "image"],
            },
         ],
      });
      res.json(users);
   } catch (error) {
      return res.status(500).json(error);
   }
};

const registerUser = async (req, res, next) => {
   try {
      const payload = req.body;
      await db.User.create(payload)
         .then((response) =>
            res.json({
               message: "Success Register",
               data: response,
            })
         )
         .catch((errors) => {
            res.status(500).json({
               message: "Failed Register",
               data: errors,
            });
         });
   } catch (err) {
      if (err && err.name === "ValidationError") {
         return res.status(500).json({
            error: 1,
            message: err.message,
            fields: err.errors,
         });
      }
      next(err);
   }
};

const login = async (req, res, next) => {
   try {
      const user = await db.User.findAll({
         where: { email: req.body.email },
      });
      const match = await bcrypt.compare(req.body.password, user[0].password);
      if (!match) return res.status(400).json({ msg: "Wrong Password" });
      const id = user[0].id;
      const firstname = user[0].firstname;
      const email = user[0].email;

      const accessToken = jwt.sign({ id, firstname, email }, process.env.ACCESS_TOKEN_SECRET, {
         expiresIn: "60s",
      });
      const refreshToken = jwt.sign({ id, firstname, email }, process.env.REFRESH_TOKEN_SECRET, {
         expiresIn: "1D",
      });

      await db.User.update(
         { token: refreshToken },
         {
            where: { id: id },
         }
      );
      req.session.refreshToken = refreshToken;
      res.status(200).json({ user, accessToken });
   } catch (err) {
      console.log(err);
   }
};

const logout = async (req, res) => {
   const refreshToken = req.cookies.refreshToken;
   if (!refreshToken) return res.sendStatus(204);
   const user = await db.User.findOne({
      where: { token: refreshToken },
   });
   if (!user) return res.sendStatus(204);
   const id = user.id;
   await db.User.update(
      { token: null },
      {
         where: { id: id },
      }
   );
   res.clearCookie("refreshToken");
   return res.status(200).json({ message: "Success logout" });
};

module.exports = { registerUser, getUsers, login, logout };
