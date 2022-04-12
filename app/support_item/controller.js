const db = require('../../models')

const storeSupportItems = async (req, res) => {
    try {
        const payload = req.body
        await db.Support_items.create(payload)
            .then(result => res.json({ msg: 'Success Create', data: result }))
            .catch(err => console.log(err))
    } catch (error) {
        console.log(error);
    }
}

const getSupportItems = async (req, res) => {
    try {
        await db.Support_items.findAll({
            include: [{
                model: db.User,
                as: 'user',
                attributes: ['id', 'firstname', 'lastname', 'role']
            }]
        })
            .then(result => res.json({ msg: 'Get All Data', data: result }))
            .catch(err => console.log(err))
    } catch (error) {
        console.log(error);
    }
}

const updateSupportItems = async (req, res) => {
    try {
        const { id } = req.params
        const payload = req.body
        await db.Support_items.update(payload, { where: { id: id } })
            .then(result => res.json({ msg: 'Update Data Success', data: result }))
            .catch(err => console.log(err))
    } catch (error) {
        console.log(error);
    }
}

const destroySupportItems = async (req, res) => {
    try {
        const { id } = req.params
        await db.Support_items.destroy({ where: { id: id } })
            .then(result => res.json({ msg: 'Success Delete', data: result }))
            .catch(err => console.log(err))
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getSupportItems, storeSupportItems, updateSupportItems, destroySupportItems }