/** @format */

const db = require("../../models");

const createCategory = async (req, res) => {
   try {
      const payload = req.body;
      await db.Category.create(payload)
         .then((result) => {
            res.status(200).json({
               data: result,
               msg: "Create Category Success",
            });
         })
         .catch((e) => console.log(e));
   } catch (error) {
      console.log(error);
   }
};

const getCategory = async (req, res) => {
   try {
      const data = await db.Category.findAll({ include: "news" });
      res.status(200).json({
         msg: "Category All",
         data: data,
      });
   } catch (error) {
      console.log(error);
   }
};

const categoryById = async (req, res) => {
   try {
      const { id } = req.params;
      const data = await db.Category.findOne({ where: { id: id }, include: "news" });
      res.status(200).json({
         msg: "One Category ",
         data: data,
      });
   } catch (error) {
      console.log(error);
   }
};

const updateCategory = async (req, res) => {
   try {
      const payload = req.body;
      const { id } = req.params;

      let result = await db.Category.update(payload, {
         where: { id: id },
      });

      return res.json({
         msg: "Success Update",
         data: result + " Data Berhasil Di Update",
      });
   } catch (error) {
      console.log(error);
   }
};

const destroyCategory = async (req, res) => {
   const { id } = req.params;

   const result = await db.Category.destroy({
      where: { id: id },
   });
   res.status(200).json({
      msg: "Success Delete",
      data: result,
   });
};

module.exports = { createCategory, getCategory, updateCategory, categoryById, destroyCategory };
