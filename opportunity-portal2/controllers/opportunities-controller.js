const Opp = require('../models/opportunities').Opp
const {body, validationResult} = require('express-validator')
const mongoose = require('mongoose')
const {DateTime} = require('luxon')


exports.oppController = {

    create: async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
            res.redirect('/opportunities/add')
        }else{
            try{
                let opp = getOpp(req.body)
                opp = await opp.save()

                req.flash('success', `Opportunity created successfully!`)
                res.redirect('/opportunities/view?id=' + opp.id)
            }catch(error){
                console.log(`Error saving opportunity: ${error.message}`)
                req.flash('error', `Failed to create an opportunity entry because: ${error.message} </br>`)
                res.redirect('/opportunities/add')
            }
        }
    },

    edit: async (req, res, next) => {
      try{
          const opp = await Opp.findOne({_id: req.query.id})

          res.render('opportunities/edit_opportunity', {
              isCreate: false,
              title: "Edit Opportunity",
              pageTitle: "Edit this opportunity",
              oppTitle: opp.title,
              oppId: opp.id,
              oppDescription: opp.description,
              oppDateDue: opp.dateDue,
              oppSubmitter: opp.submitter,
              oppType: opp.oppType,
              oppLoc: opp.oppLoc,
              layout: 'default'})
      }catch(error){
          next(error)
      }
    },

    view: async (req, res, next) => {
        try{
            console.log('IN VIEW: id is ', req.query.id)
            const opp = await Opp.findOne({_id:req.query.id})
            console.log('IN VIEW: opp is ', opp.title)
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
            console.log(`Error reading opportunity ${req.query.id}`)
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

    update: async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
            res.redirect('/opportunities/edit?id=' + req.body.id)
        }else {
            try {
                const opp = await Opp.findOneAndUpdate({_id: req.body.id}, {
                    title: req.body.title,
                    description: req.body.description,
                    dateDue: req.body.dateDue,
                    submitter: req.body.submitter,
                    oppType: req.body.oppType,
                    oppLoc: req.body.oppLoc
                })
                req.flash('success', `Your edit has been made!`)
                res.redirect('/opportunities/view?id=' + req.body.id)
            } catch (error) {
                console.log(`Error updating opportunity: ${error.message}`)
                req.flash('error', `Your edit didn't go through because: ${error.message} </br>`)
                res.redirect('/opportunities/edit?id=' + req.body.id)
            }
        }
    },

    destroy: async (req, res, next) => {
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
}

const getOpp = (body) => {
    return new Opp({
        title: body.title,
        description: body.description,
        dateDue: body.dateDue,
        submitter: body.submitter,
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
    body('oppType')
        .notEmpty().withMessage('Opportunity type is required'),
    body('oppLoc')
        .notEmpty().withMessage('Location is required')
]

