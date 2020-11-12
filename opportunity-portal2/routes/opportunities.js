const express = require('express')
const router = express.Router()
let oppStore = require('../app').oppStore



router.get('/add', async (req, res, next) => {
    try{
        res.render('add_opportunity', {
            isCreate: true,
            layout: 'default',
            title: 'Add an opportunity',
            pageTitle: 'Add a new opportunity here!',
            oppKey: await oppStore.count(),
            isAddActive: "active"

        })
    } catch(err) {
        next(err)
    }
})


router.post('/save', async (req, res, next) => {
    try{
        let opp;

        if(req.body.saveMethod === 'create')
            opp = await oppStore.create(req.body.oppKey, req.body.title, req.body.description, req.body.dateDue,
                req.body.submitter, req.body.oppType, req.body.oppLoc)
        else
            opp = await oppStore.update(req.body.oppKey, req.body.title, req.body.description, req.body.dateDue,
                req.body.submitter, req.body.oppType, req.body.oppLoc)

        res.redirect('/opportunities/view?key=' + req.body.oppKey)
    }catch(err){
        next(err)
    }
})

router.post('/destroy', async (req, res, next) => {
    try{
        let opp;
        opp = await oppStore.destroy(req.body.oppKey)

        res.redirect('/opportunities/view_all')
    }catch(err){
        next(err)
    }
})



router.get('/delete', async (req, res, next) => {
    try{
        let opp = await oppStore.read(req.query.key)
        res.render('delete_opportunity', {
            title: "Delete Opportunity",
            oppTitle: opp.title,
            oppKey: opp.key,
            oppDescription: opp.description,
            oppDateDue: opp.dateDue,
            layout: 'default',

        })
    }catch(err){
        next(err)
    }
})

router.get('/view', async (req, res, next) => {
    try{
        let opp = await oppStore.read(req.query.key)
        res.render('view_opportunity', {
            title: "View Opportunity",
            pageTitle: "Opportunity Details",
            oppSubmitter: opp.submitter,
            oppTitle: opp.title,
            oppKey: opp.key,
            oppDescription: opp.description,
            oppDateDue: opp.dateDue,
            oppType: opp.oppType,
            oppLoc: opp.oppLoc,
            layout: 'default',

        })
    }catch(err){
        next(err)
    }
})

router.get('/view_all', async function(req, res, next) {
    try{
        let keyList = await oppStore.keyList()
        let keyPromises = keyList.map(key => {
            return oppStore.read(key)
        })
        let allOpps = await Promise.all(keyPromises)
        let numCurrentOpps = await oppStore.count_filtered()
        let oppExists = false
        if(numCurrentOpps > 0) {oppExists = true}
        res.render('view_all_opportunities', {
            title: 'All Current Opportunities',
            pageTitle: 'Here are the current STEM Opportunities',
            numCurrentOpps: numCurrentOpps,
            oppExists: oppExists,
            layout: 'default',
            oppList: extractOppsToLiteral(allOpps),
            isViewAllActive: "active"
        })
    } catch(err){
        next(err)
    }
})

function extractOppsToLiteral(allOpps){
    return allOpps.map(opp => {
        return {
            oppKey: opp.key,
            oppTitle: opp.title,
            oppDateDue: opp.dateDue,
            oppSubmitter: opp.submitter,
            oppType: opp.oppType,
            oppLoc: opp.oppLoc
        }
    })
}

router.get('/edit', async (req, res, next) => {
    try {
        let opp = await oppStore.read(req.query.key)
        res.render('edit_opportunity', {
            isCreate: false,
            title: "Edit Opportunity",
            pageTitle: "Edit this opportunity",
            oppTitle: opp.title,
            oppKey: opp.key,
            oppDescription: opp.description,
            oppDateDue: opp.dateDue,
            oppSubmitter: opp.submitter,
            oppType: opp.oppType,
            oppLoc: opp.oppLoc,
            layout: 'default'



        })
    }catch(err) {
        next(err)
    }
})
module.exports = router;