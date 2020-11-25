let Opp = require('./opportunities').Opp
let AbstractOppStore = require('./opportunities').AbstractOppStore
const mongoose = require('mongoose')


exports.MongooseOppStore = class MongooseOppStore extends AbstractOppStore {

    async create(key, title, description, dateDue, submitter, oppType, oppLoc){

        let opp = new Opp({
           // key: key,
            title: title,
            description: description,
            dateDue: dateDue,
            submitter: submitter,
            oppType: oppType,
            oppLoc: oppLoc
        })
        opp = await opp.save()
        return opp
    }

    async findAllOpps() {
        const opps = await Opp.find({})
        return opps.map(opp => {
            return {
                oppKey: opp.key,
                oppTitle: opp.title,
                oppDateDue: opp.dateDue
            }
        })
    }

    async read(key){
        return Opp.findOne({key:key})
    }

    async update(key, title, description, dateDue, submitter, oppType, oppLoc) {

        let opp = await Opp.findOneAndUpdate({key: key},{
            title: title,
            description: description,
            dateDue: dateDue,
            submitter: submitter,
            oppType: oppType,
            oppLoc: oppLoc
        })
        return opp

    }

    async destroy(key){
        const opp = await Opp.find({key: key})
        let destroyOpp

        if (opp)
            destroyOpp = await Opp.findOneAndDelete({key: key})
        else
            throw new Error(`In Destroy: Opportunity ${key} does not exist`)
    }

    async count() {
        return Opp.countDocuments({})
    }
}