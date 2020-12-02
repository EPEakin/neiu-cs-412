const express = require('express')
const router = express.Router()
let Opp = require('../models/opportunities').Opp
const {oppValidations, oppController} = require('../controllers/opportunities-controller')

router.get('/add', async (req, res, next) => {
    await oppController.add(req, res, next)
})

router.get('/edit', async (req, res, next) => {
    console.log('in EDIT ROUTE:', req.query.oppId)
    await oppController.edit(req, res, next)
})

router.post('/save', oppValidations, async (req, res, next) => {
    await oppController.save(req, res, next)
})

router.post('/destroy', async (req, res, next) => {
    try{
        let opp;
        opp = await oppController.destroy(req, res, next)

        res.redirect('/opportunities/view_all')
    }catch(err){
        next(err)
    }
})

router.get('/view', async (req, res, next) => {
    await oppController.view(req, res, next)
})

router.get('/view_all', async function(req, res, next) {
    await oppController.view_all(req, res, next)
})

router.get('/view_user_opps', async function(req, res, next) {
    await oppController.view_user_opps(req, res, next)
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


module.exports = router