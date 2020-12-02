const Opp = require('../models/opportunities').Opp
const User = require('../models/user').User
const {body, validationResult} = require('express-validator')
const mongoose = require('mongoose')
const {DateTime} = require('luxon')

exports.oppController = {
    save: async (req, res, next) => {
        try{
            let opp
            if(req.body.saveMethod === 'create') {
                opp = await create(req, res, next)
            }
            else{
                opp = await update(req, res, next)
            }
        }catch(err){
            next(err)
        }
    },

    add: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                res.render('opportunities/add_opportunity', {
                    isCreate: true,
                    layout: 'default',
                    title: 'Add an opportunity',
                    pageTitle: 'Add a new opportunity here!',
                    isAddActive: "active"
                })
            } catch (error) {
                next(error)
            }
        }
        else{
            req.flash('error', 'Please log in to add opportunities!')
            res.redirect('/users/login')
        }
    },

    edit: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try{
                const opp = await Opp.findOne({_id: req.query.id.trim()})
                res.render('opportunities/edit_opportunity', {
                    isCreate: false,
                    title: "Edit Opportunity",
                    pageTitle: "Edit this opportunity",
                    oppTitle: opp.title,
                    oppId: opp.id,
                    oppDescription: opp.description,
                    oppDateDue: DateTime.fromJSDate(opp.dateDue).toISODate(),
                    oppSubmitter: opp.submitter,
                    oppType: opp.oppType,
                    oppLoc: opp.oppLoc,
                    layout: 'default'})
            }catch(error){
                next(error)
            }
        }
        else{
            req.flash('error', 'Please log in to edit opportunities!')
            res.redirect('/users/login')
        }
    },

    view: async (req, res, next) => {
        try{
            const opp = await Opp.findOne({_id:req.query.id.trim()})
            console.log('IN VIEW: date is ', DateTime.fromJSDate(opp.dateDue).toISODate())
            res.render('opportunities/view_opportunity', {
                title: "View Opportunity",
                pageTitle: "Opportunity Details",
                oppSubmitter: opp.submitter,
                oppTitle: opp.title,
                oppId: opp.id,
                oppDescription: opp.description,
                oppDateDue: DateTime.fromJSDate(opp.dateDue).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY),
                oppType: opp.oppType,
                oppLoc: opp.oppLoc,
                layout: 'default'
            })
        }catch(error){
            console.log(`Error reading opportunity ${req.query.id.trim()}`)
        }
    },

    view_user_opps: async (req, res, next) => {
        if(req.isAuthenticated()) {
            try{
                //console.log('in view_user_opps', req.user, req.user.opps)
                let oppIds = req.user.opps
                console.log('in view_user_opps: oppIds = ', oppIds)
                let oppPromises = oppIds.map(id => Opp.findOne({_id: id}))
                let opps = await Promise.all(oppPromises)

                let allOpps = opps.map(opp => {
                    return {
                        oppId: opp.id,
                        oppTitle: opp.title,
                        oppDateDue: DateTime.fromJSDate(opp.dateDue).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
                    }
                })

                let numCurrentOpps = oppIds.length
                console.log('In view_user_opps: numCurrentOpps is: ', numCurrentOpps)
                let oppExists = false
                if(numCurrentOpps > 0) {oppExists = true}
                res.render('opportunities/view_user_opportunities', {
                    title: 'All Current Opportunities',
                    pageTitle: 'Here are the current STEM Opportunities',
                    numCurrentOpps: numCurrentOpps,
                    oppExists: oppExists,
                    layout: 'default',
                    oppList: allOpps,
                    isViewAllActive: "active"
                })
            } catch(err){
                next(err)
            }
        }
    },

    view_all: async (req, res, next) => {
        try{
            const opps = await Opp.find({})
            allOpps = opps.map(opp => {
                return {
                    oppId: opp.id,
                    oppTitle: opp.title,
                    oppDateDue: DateTime.fromJSDate(opp.dateDue).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
                }
            })

            let numCurrentOpps = await Opp.countDocuments({})
            console.log('In View-all: numCurrentOpps is: ', numCurrentOpps)
            let oppExists = false
            if(numCurrentOpps > 0) {oppExists = true}
            res.render('opportunities/view_all_opportunities', {
                title: 'All Current Opportunities',
                pageTitle: 'Here are the current STEM Opportunities',
                numCurrentOpps: numCurrentOpps,
                oppExists: oppExists,
                //oppExists: true,
                layout: 'default',
                oppList: allOpps,
                isViewAllActive: "active"
            })

        } catch(err){
            next(err)
        }
    },

    destroy: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try{
                console.log('IN DESTROY: id is', req.body)
                const opp = await Opp.find({_id: req.body.id})
                console.log('IN DESTROY: opp id is', opp.id)

                if (opp)
                    await Opp.findOneAndDelete({_id: req.body.id})
                else
                    throw new Error(`In Destroy: Opportunity ${req.body.id} does not exist`)

                res.redirect('/opportunities/view_all')
            }catch(error){
                console.log(`Error deleting opportunity ${req.body.id}`)
            }
        }
        else{
            req.flash('error', 'Please log in to delete opportunities!')
            res.redirect('/users/login')
        }

    }
}

const create = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
        res.redirect('/opportunities/add')
    }else{
        try{
            let opp = getOpp(req.body)
            opp = await opp.save()
            req.user.opps.push(opp.id.trim())
            req.user = await User.findByIdAndUpdate({_id: req.user.id.trim()}, {opps: req.user.opps}, {new: true})
            req.flash('success', `Opportunity created successfully!`)
            res.redirect('/opportunities/view?id=' + opp.id)
            return opp
        }catch(error){
            console.log(`Error saving opportunity: ${error.message}`)
            req.flash('error', `Failed to create an opportunity entry because: ${error.message} </br>`)
            res.redirect('/opportunities/add')
        }
    }
}

const update = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
        res.redirect('/opportunities/edit?id=' + req.body.id)
    }else {
        let testType = req.body.oppType
        let testLoc = req.body.oppLoc
        console.log('IN UPDATE: req.body.oppType', req.body.oppType, ' testType: ', testType)
        console.log('IN UPDATE: req.body.oppLoc', req.body.oppLoc, ' testLoc: ', testLoc)

        if(req.body.oppType === "")
        {
            const set = await Opp.findOne({_id: req.body.id})
            testType = set.oppType
        }
        if(typeof testLoc === 'undefined')
        {
            const setLoc = await Opp.findOne({_id: req.body.id})
            testLoc = setLoc.oppLoc
        }
        console.log('IN UPDATE2: req.body.oppType', req.body.oppType, ' testType: ', testType)
        console.log('IN UPDATE2: req.body.oppLoc', req.body.oppLoc, ' testLoc: ', testLoc)

        try {
            const opp = await Opp.findOneAndUpdate({_id: req.body.id}, {
                title: req.body.title,
                description: req.body.description,
                dateDue: req.body.dateDue,
                submitter: req.body.submitter,
                oppType: testType,
                oppLoc: testLoc
            })
            req.flash('success', `Your edit has been made!`)
            res.redirect('/opportunities/view?id=' + req.body.id)
        } catch (error) {
            console.log(`Error updating opportunity: ${error.message}`)
            req.flash('error', `Your edit didn't go through because: ${error.message} </br>`)
            res.redirect('/opportunities/edit?id=' + req.body.id)
        }
    }
}

const getOpp = (body) => {
    return new Opp({
        title: body.title.trim(),
        description: body.description.trim(),
        dateDue: body.dateDue,
        submitter: body.submitter.trim(),
        oppType: body.oppType,
        oppLoc: body.oppLoc
    })
}

exports.oppValidations = [
    body('title')
        .notEmpty().withMessage('First name is required')
        .isLength({min:2}).withMessage('First name must be at least 2 characters'),
    body('description')
        .notEmpty().withMessage('Last name is required')
        .isLength({min:2}).withMessage('Last name must be at least 2 characters'),
    body('dateDue')
        .notEmpty().withMessage('A due date is required')
        .trim().isDate().withMessage('Due date must be a date'),
    body('submitter')
        .notEmpty().withMessage('Last name is required')
        .isLength({min:2}).withMessage('Last name must be at least 2 characters'),
   /* body('oppType')
        .notEmpty().withMessage('Opportunity type is required'),*/
   /* body('oppLoc')
        .notEmpty().withMessage('Location is required')*/
]

