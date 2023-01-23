/** @format */

const db = require("../../models");

const updateComplaintResult = async (req, res, next) => {
   try {
      const { id } = req.params;
      let { status, message, estimated_time } = req.body;
      let complaintResult = await db.complaint_result.findOne({ where: { id } });
      await db.complaint_result
         .update(
            {
               status: status,
               message: message,
               estimated_time: estimated_time,
            },
            { where: { id } }
         )
         .then(async (result) => {
            complaintResult = await db.complaint_result.findOne({ where: { id } });
            return res.status(200).json({ message: "Update Complaint Result Success", data: complaintResult });
         })
         .catch((err) => console.log(err));
   } catch (error) {
      console.log(error);
   }
};

const getAll = async (req, res, next) => {
   await db.complaint_result
      .findAll({
         include: [
            {
               model: db.Complaint,
               as: "complaint",
            },
         ],
      })
      .then((result) => {
         return res.status(200).json({ message: "All Data", data: result });
      })
      .catch((err) => console.log(err));
};

const getOne = async (req, res, next) => {
   const { id } = req.params;
   await db.complaint_result
      .findOne({
         where: { id },
         include: [
            {
               model: db.Complaint,
               as: "complaint",
            },
         ],
      })
      .then((result) => {
         return res.status(200).json({ message: "One Data", data: result });
      })
      .catch((err) => console.log(err));
};

module.exports = { updateComplaintResult, getAll, getOne };
