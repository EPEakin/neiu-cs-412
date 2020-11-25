let User = require('../models/user').User
const {body, validationResult} = require('express-validator')
const mongoose = require('mongoose')


exports.userController = {
    create: async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
            res.redirect('/users/register')
        }else{
            try{
                console.log('IN CREATE USER')
                console.log('in create user: ', req.body)
                let userParams = getUserParams(req.body)
                console.log('userParams is: ', userParams)
                let user = await User.create(userParams)
                console.log('user is: ', user)
                console.log('in register: ', req.body)
                console.log('in register: ', user.name.first, user.name.last)
                req.flash('success', `${user.fullName}'s account created successfully!`)
                res.redirect('/users/login')
            }catch(error){
                console.log(`Error saving user: ${error.message}`)
                req.flash('error', `Failed to create user account because ${error.message}`)
                res.redirect('/users/register')
            }
        }
    },

    authenticate: async (req, res, next) => {
        console.log('IN AUTHENTICATE!')
        try {
            console.log('authenticate user email: ', req.body.email)
            let user = await User.findOne({email: req.body.email})
            console.log('HERE?! authenticate user: ', user.email)
            if (user && await user.passwordComparison(req.body.password)) {
                req.flash('success', `${user.fullName} logged in successfully`)
                res.redirect('/')
            } else {
                req.flash('error', 'Your email or password is incorrect. Please try again')
                res.redirect('/users/login')
            }
        }catch(err){
                req.flash('error', 'Your email or password is incorrect. Please try again')
                res.redirect('/users/login')
        }
    }
}

const getUserParams = body => {
    return {
        name:{
            first: body.first,
            last: body.last
        },
        email: body.email,
        password: body.password
    }
}

exports.registerValidations = [
    body('first')
        .notEmpty().withMessage('First name is required')
        .isLength({min:2}).withMessage('First name must be at least 2 characters'),
    body('last')
        .notEmpty().withMessage('Last name is required')
        .isLength({min:2}).withMessage('Last name must be at least 2 characters'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min:8}).withMessage('Password must be at least 8 characters'),
    body('email')
        .isEmail().normalizeEmail().withMessage('Email is invalid')
]