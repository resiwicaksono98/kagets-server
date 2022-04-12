const db = require('../../models')
const fs = require('fs')

const storeComplaint = async (req, res) => {
    try {
        if (req.file) {
            const { userId, problem, description } = req.body
            const support_image = req.file.filename
            await db.Complaint.create({ userId, problem, description, support_image })
                .then(result => {
                    res.json({
                        msg: 'Success Create Complaint',
                        data: result
                    })
                }).catch(err => console.log(err))
        }
        let payload = req.body
        await db.Complaint.create(payload)
            .then(result => {
                res.json({
                    msg: 'Success Create Complaint',
                    data: result
                })
            }).catch(err => console.log(err))


    } catch (error) {
        console.log(error);
    }
}

const getComplaint = async (req, res) => {
    try {
        await db.Complaint.findAll({
            include: [{
                model: db.User,
                as: 'user',
                attributes: ['id', 'firstname', 'lastname', 'email', 'phone_number', 'address', 'mitra_type', 'profile_picture', 'role']
            }, {
                model: db.Problem_types,
                as: 'problem_type',
                attributes: ['id', 'name']
            }]
        })
            .then(result => res.json({ msg: 'All data complaint', data: result }))
            .catch(err => console.log(err))
    } catch (error) {
        console.log(error);
    }
}

const getComplaintById = async (req, res) => {
    try {
        const { id } = req.params
        await db.Complaint.findByPk(id, {
            include: [{
                model: db.User,
                as: 'user',
                attributes: ['id', 'firstname', 'lastname', 'email', 'phone_number', 'address', 'mitra_type', 'profile_picture', 'role']
            }, {
                model: db.Problem_types,
                as: 'problem_type',
                attributes: ['id', 'name']
            }],
        })
            .then(result => res.json({ msg: 'Data complaint', data: result }))
            .catch(err => console.log(err))

    } catch (error) {
        console.log(error);
    }
}

const updateComplaint = async (req, res) => {
    try {
        const { id } = req.params
        if (req.file) {
            const { userId, problem, description } = req.body
            const support_image = req.file.filename
            let getImage = await db.Complaint.findByPk(id)
            if (getImage.support_image) {
                fs.unlinkSync(`public/images/complaints/${getImage.support_image}`)
            }
            await db.Complaint.update({ userId, problem, description, support_image }, { where: { id: id } })
                .then(result => {
                    res.json({
                        msg: 'Success update Complaint',
                        count_update: result,
                    })
                }).catch(err => console.log(err))
        }
        let payload = req.body
        await db.Complaint.update(payload, { where: { id: id } })
            .then(result => {
                res.json({
                    msg: 'Success update Complaint',
                    data: result
                })
            }).catch(err => console.log(err))


    } catch (error) {
        console.log(error);
    }
}

const destroyComplaint = async (req, res) => {
    try {
        const { id } = req.params
        const getComplaint = await db.Complaint.findByPk(id)
        await db.Complaint.destroy({ where: { id: id } })
        if (getComplaint.support_image) {
            fs.unlinkSync(`public/images/complaints/${getComplaint.support_image}`)
        }
        return res.json({
            msg: 'Success Deleted',
            data: getComplaint
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = { storeComplaint, getComplaint, destroyComplaint, getComplaintById, updateComplaint }