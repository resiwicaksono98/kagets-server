/** @format */

const db = require("../../models");
const fs = require("fs");
const cloudinaryConfig = require("../../config/cloudinary");

const getNews = async (req, res) => {
   try {
      const result = await db.News.findAll({
         include: [
            {
               model: db.User,
               as: "user",
               attributes: ["id", "firstname", "lastname", "role"],
            },
            {
               model: db.Category,
               as: "category",
               attributes: ["id", "name"],
            },
         ],
      });
      res.json({
         msg: "Get News",
         data: result,
      });
   } catch (error) {
      console.log(error);
   }
};

const getNewsById = async (req, res) => {
   try {
      const result = await db.News.findAll({ where: { id: req.params.id }, include: ["category", "user"] });
      res.json({
         msg: "Get News",
         data: result,
      });
      console.log(result[0].categoryId);
   } catch (error) {
      console.log(error);
   }
};

const storeNews = async (req, res) => {
   try {
      if (req.file) {
         await db.News.create({
            title: req.body.title,
            description: req.body.description,
            rate: req.body.rate,
            categoryId: req.body.categoryId,
            userId: req.body.userId,
            image: req.file.filename,
         })
            .then((result) => {
               //  cloudinaryConfig.uploader.upload(result.image, (imageResult) => {
               //     return res.json({
               //        imageUrl: result.secure_url,
               //        imageId: result.public_id,
               //     });
               //  });
               res.status(200).json({
                  msg: "Create data successfully",
                  data: result,
               });
            })
            .catch((e) => console.log(e));
      }
   } catch (error) {
      console.log(error);
   }
};

const updateNews = async (req, res) => {
   try {
      const { id } = req.params;
      let payload = req.body;
      if (req.file) {
         const getNews = await db.News.findByPk(id);
         fs.unlinkSync(`public/images/news/${getNews.image}`);
         await db.News.update(
            {
               title: req.body.title,
               description: req.body.description,
               rate: req.body.rate,
               categoryId: req.body.categoryId,
               image: req.file.filename,
            },
            { where: { id: id } }
         );
      } else {
         await db.News.update(payload, { where: { id } });
      }
      await db.News.findByPk(id, { include: "category" })
         .then((result) => {
            res.json({
               msg: "Update data successfully",
               data: result,
            });
         })
         .catch((e) => console.log(e));
   } catch (error) {
      console.log(error);
   }
};

const destroyNews = async (req, res) => {
   try {
      const { id } = req.params;
      const news = await db.News.findByPk(id);
      const result = await db.News.destroy({
         where: { id: id },
      });
      fs.unlinkSync(`public/images/news/${news.image}`);
      return res.json({
         msg: "Success Delete data",
         data: result,
      });
   } catch (error) {
      console.log(error);
   }
};

module.exports = { storeNews, getNews, getNewsById, destroyNews, updateNews };
