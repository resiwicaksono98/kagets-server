const router = require('express').Router()
const authController = require('./controller')
const { refreshToken } = require('../refreshToken')
const verifyToken  = require('../../middleware/verifyToken')

router.get('/users',verifyToken.verifyToken, authController.getUsers)
router.post('/register', authController.registerUser)
router.post('/login', authController.login)
router.get('/token', refreshToken)
router.delete('/logout', authController.logout)


module.exports = router
