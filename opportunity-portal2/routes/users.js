const express = require('express')
const router = express.Router()
const {registerValidations, userController, resetPasswordValidations} = require('../controllers/user-controller')

router.get('/register', async (req, res, next) => {
    res.render('users/register', {
        title: 'Register',
        pageTitle: 'Sign Up'
    })
})

router.post('/register', registerValidations,async(req, res, next) => {
    await userController.create(req, res, next)
})

router.get('/login', async(req, res, next) => {
    res.render('users/login', {
        title: 'Log in!',
        pageTitle: 'Portal Log In'
    })
})

router.post('/login', async(req, res, next) => {
    await userController.authenticate(req, res, next)
})

router.get('/logout', async function(req, res, next) {
    await userController.logout(req, res, next)
})

router.get('/reset_password', async function(req, res, next) {
    await userController.reset_password(req, res, next)
})

router.post('/update_password', resetPasswordValidations, async function(req, res, next) {
    await userController.update_password(req, res, next)
})

router.get('/view_user', async (req, res, next) => {
    await userController.view_user(req, res, next)
})

module.exports = router