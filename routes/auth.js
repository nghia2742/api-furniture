const authController = require('../app/controller/authController')
const middlewareController = require('../app/controller/middlewareController')
const router = require('express').Router()

router.get('/checkAuth', middlewareController.isAccessToken, authController.index)

router.post('/login', authController.login)

router.post('/register', authController.register)

router.post('/logout', authController.logout)

module.exports = router