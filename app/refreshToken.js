const db = require('../models')
const jwt = require('jsonwebtoken')

 const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) return res.status(401).json({message: 'Unauthorize'})
        const user = await db.User.findAll({
            where: { token: refreshToken }
        })


        if (!user[0]) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(404)
            const id = user[0].id
            const firstname = user[0].firstname
            const email = user[0].email
            const accessToken = jwt.sign({ id, firstname, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '60s'
            })
            res.json({ accessToken })
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {refreshToken}
