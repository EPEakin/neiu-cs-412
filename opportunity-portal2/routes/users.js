const express = require('express')
const router = express.Router()
const {registerValidations, userController} = require('../controllers/user-controller')

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
    console.log('I MADE IT TO POST')
    await userController.authenticate(req, res, next)
})
module.exports = router