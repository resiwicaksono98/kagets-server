const db = require('../../models')

const getProblem = async (req, res) => {
    try {
        await db.Problem_types.findAll({
            include: [{
                model: db.Complaint,
                as: 'complaint',

            }]
        })
            .then(result => res.json({ msg: 'Get all problem', data: result }))
    } catch (error) {
        console.log(error);
    }
}

const storeProblem = async (req, res) => {
    try {
        await db.Problem_types.create(req.body)
            .then(result => res.json({ msg: 'Success Create Problem Type', data: result }))
            .catch(err => console.log(err))
    } catch (error) {
        console.log(error);
    }
}


const updateProblemType = async (req, res) => {
    try {
        const { id } = req.params
        const payload = req.body
        await db.Problem_types.update(payload, { where: { id: id } })
            .then(result => res.json({ msg: 'Update Data Success', data: result }))
            .catch(err => console.log(err))
    } catch (error) {
        console.log(error);
    }
}

const destroyProblemType = async (req, res) => {
    try {
        const { id } = req.params
        await db.Problem_types.destroy({ where: { id: id } })
            .then(result => res.json({ msg: 'Success Delete', data: result }))
            .catch(err => console.log(err))
    } catch (error) {
        console.log(error);
    }
}
module.exports = { storeProblem, getProblem, updateProblemType,destroyProblemType }