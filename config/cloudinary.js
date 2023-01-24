/** @format */

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
   cloud_name: "doh920vsx",
   api_key: "725157489862262",
   api_secret: "0hpZGAP8cDx2rBfc-1LwjmO-AKo",
});

const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: {
      folder: "KAGETS",
   },
});

const multerUpload = multer({ storage: storage });

module.exports = multerUpload;
