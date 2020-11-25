const express = require('express')
const router = express.Router()
let Opp = require('../models/opportunities').Opp
const {oppValidations, oppController} = require('../controllers/opportunities-controller')

router.get('/add', async (req, res, next) => {

        res.render('opportunities/add_opportunity', {
            isCreate: true,
            layout: 'default',
            title: 'Add an opportunity',
            pageTitle: 'Add a new opportunity here!',
            isAddActive: "active"
        })

})

router.get('/edit', async (req, res, next) => {
    console.log('in EDIT ROUTE:', req.query.oppId)
    await oppController.edit(req, res, next)
})

router.post('/save', oppValidations, async (req, res, next) => {
    try{
        if(req.body.saveMethod === 'create') {
            await oppController.create(req, res, next)
        }
        else{
            await oppController.update(req, res, next)
        }

    }catch(err){
        next(err)
    }

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