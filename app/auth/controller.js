const db = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getUsers = async (req, res, next) => {
    try {
        const users = await db.User.findAll({
            attributes: ['id', 'email', 'role'], include: [{
                model: db.News,
                as: 'news',
                attributes: ['id', 'title', 'description', 'rate', 'image']
            }, {
                model: db.Support_items,
                as: 'support_items',
                attributes: ['id', 'ktp', 'sim', 'other']
            }]
        })
        res.json(users)
    } catch (error) {
        console.log(error);
    }
}

const registerUser = async (req, res, next) => {
    try {
        const payload = req.body
        await db.User.create(payload)
            .then(response =>
                res.json({
                    message: 'Success Register',
                    data: response,
                })
            ).catch(errors => {
                res.json({
                    message: 'Failed Register',
                    data: errors
                })
            })


    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)
    }
}


const login = async (req, res, next) => {
    try {
        const user = await db.User.findAll({
            where: { email: req.body.email }
        })
        const match = await bcrypt.compare(req.body.password, user[0].password)
        if (!match) return res.status(400).json({ msg: 'Wrong Password' })
        const id = user[0].id
        const firstname = user[0].firstname
        const email = user[0].email

        const accessToken = jwt.sign({ id, firstname, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '60s'
        })
        const refreshToken = jwt.sign({ id, firstname, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1D'
        })

        await db.User.update({ token: refreshToken }, {
            where: { id: id }
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json({ accessToken })

    } catch (err) {
        console.log(err);
    }
}

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(204)
    const user = await db.User.findAll({
        where: { token: refreshToken }
    })
    if (!user[0]) return res.sendStatus(204)
    const id = user[0].id
    await db.User.update({ token: null }, {
        where: { id: id }
    })
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}


module.exports = { registerUser, getUsers, login, logout }
