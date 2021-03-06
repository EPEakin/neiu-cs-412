const User = require('../models/user').User
const Opp = require('../models/opportunities').Opp
const {body, validationResult} = require('express-validator')
const mongoose = require('mongoose')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const {DateTime} = require('luxon')

exports.userController = {
    create: async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
            res.redirect('/users/register')
        }else{
            try{
                let userParams = getUserParams(req.body)
                let newUser = new User(userParams)
                let user = await User.register(newUser, req.body.password)
                req.flash('success', `${user.fullName}'s account created successfully!`)
                res.redirect('/users/login')
            }catch(error){
                console.log(`Error saving user: ${error.message}`)
                req.flash('error', `Failed to create user account. Invalid email.`)
                res.redirect('back')
            }
        }
    },

    edit_info: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try{
                const user = await User.findOne({_id: req.user.id.trim()})
                res.render('users/edit_user', {
                    title: "Account Update",
                    pageTitle: "Edit your information",
                    id: req.user.id,
                    school: user.school,
                    subject: user.subjectArea,
                    layout: 'default'})
            }catch(error){
                next(error)
            }
        }
        else{
            req.flash('error', 'Please log in to edit user information!')
            res.redirect('/users/login')
        }
    },

    update_info: async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
            res.redirect('/users/edit_info?id=' + req.user.id)
        }else {
            try {
                const user = await User.findOneAndUpdate({_id: req.user.id}, {
                    school: req.body.school,
                    subjectArea: req.body.subject
                })
                req.flash('success', `Your edit has been made!`)
                res.redirect('/users/view_user?id=' + req.user.id)
            } catch (error) {
                console.log(`Error updating user information: ${error.message}`)
                req.flash('error', `Your edit didn't go through because: ${error.message} </br>`)
                res.redirect('/users/edit_user?id=' + req.user.id)
            }
        }
    },

    authenticate: async (req, res, next) => {
        await passport.authenticate('local', function(err, user, info){
            if(err)
                return next(err)
            if(!user){
                req.flash('error', 'Failed to login')
                return res.redirect('back')
            }
            req.logIn(user, function(err){
                if(err)
                    return next(err)
                req.flash('success', `${user.fullName} logged in!`)
                return res.redirect('/')
            })
        })(req, res, next);
    },

    logout: async (req, res, next) => {
        req.logout();
        res.redirect('/');
    },

    reset_password: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                res.render('users/reset_password', {
                    layout: 'default',
                    title: 'Reset your password',
                    pageTitle: 'Reset Password',
                })
            } catch (error) {
                next(error)
            }
        }
        else{
            req.flash('error', 'Please log in to reset your password!')
            res.redirect('/users/login')
        }
    },

    update_password:  async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
            res.redirect('/users/reset_password')
        }else {
            try {
                const user = await User.findByUsername(req.body.email)
                console.log('in update_password: ', user)

                if (req.body.email === req.user.email) {
                    user.setPassword(req.body.newPassword, function () {
                        user.save()
                        req.logout()
                        req.flash('success', 'Please log in with your new password')
                        res.redirect('/users/login')
                    })
                } else {
                    req.flash('error', 'This user does not exist')
                    res.redirect('/users/reset_password')
                }
            } catch (error) {
                next(error)
            }
        }
    },

    view_user: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                const user = await User.findByUsername(req.user.email)
                console.log('IN VIEW USER: ', user)
                res.render('users/view_user', {
                    title: 'User Information',
                    pageTitle: `${user.fullName}'s Information`,
                    role: user.role,
                    email: user.email,
                    school: user.school,
                    subjectArea: user.subjectArea,
                    dateAdded: DateTime.fromJSDate(user.dateAdded).toLocaleString(DateTime.DATE_FULL),
                    layout: 'default'
                })
            } catch (error) {
                console.log(`Error finding information for ${req.user.email}`)
            }
        } else {
            req.flash('error', 'Please log in to view user info!')
            res.redirect('/users/login')
        }
    },

    destroy: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                const user = await User.find({_id: req.user.id})
                await Opp.deleteMany({submitterId: req.user.id}).then(function(){
                }).catch(function(error){
                    console.log(error)
                })

               if (user)
                    await User.findOneAndDelete({_id: req.user.id})
                else
                    throw new Error(`In Destroy: User ${req.user.id} does not exist`)

                req.flash('success', 'User account has been deleted')
                res.redirect('/')
            } catch (error) {
                req.flash('error', 'Error: User account not deleted')
                res.redirect('/')
                console.log(`Error deleting user ${req.user.id}`)
            }
        } else {
            req.flash('error', 'Please log in to edit or delete your user account!')
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
        role: body.role,
        email: body.email,
        password: body.password,
        school: body.school,
        subjectArea: body.subjectArea,
        dateAdded: DateTime.local()
    }
}

exports.registerValidations = [
    body('first')
        .notEmpty().withMessage('First name is required')
        .isLength({min:2}).withMessage('First name must be at least 2 characters'),
    body('last')
        .notEmpty().withMessage('Last name is required')
        .isLength({min:2}).withMessage('Last name must be at least 2 characters'),
    body('school')
        .notEmpty().withMessage('The name of your school is required')
        .isLength({min:2}).withMessage('School name must be at least 2 characters'),
    body('subjectArea')
        .notEmpty().withMessage('A subject area is required')
        .isLength({min:2}).withMessage('Subject area name must be at least 2 characters'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min:8}).withMessage('Password must be at least 8 characters'),
    body('email')
        .isEmail().normalizeEmail().withMessage('Email is invalid')
]

exports.resetPasswordValidations = [
    body('oldPassword')
        .notEmpty().withMessage('Current password is required')
        .isLength({min:8}).withMessage('Current password must be at least 8 characters'),
    body('newPassword')
        .isLength({min:8}).withMessage('New password must be at least 8 characters')
        .custom((value, {req, res, next}) => {
            if(value !== req.body.confirmNewPassword){
               throw new Error('New passwords do not match')
            } else {
                return value
            }
        }),
    body('email')
        .isEmail().normalizeEmail().withMessage('Email is invalid')
]

exports.updateInfoValidations = [
    body('school')
        .notEmpty().withMessage('The name of your school is required')
        .isLength({min:2}).withMessage('School name must be at least 2 characters'),
    body('subject')
        .notEmpty().withMessage('A subject area is required')
        .isLength({min:2}).withMessage('Subject area name must be at least 2 characters')
]