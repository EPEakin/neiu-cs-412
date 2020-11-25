exports.AbstractOppStore = class AbstractOppStore {
    async close() {}
    async update(key, title, description, dateDue, submitter, oppType, oppLoc) {}
    async create(key, title, description, dateDue, submitter, oppType, oppLoc) {}
    async read(key) {}
    async destroy(key) {}
    async keyList() {}
    async count() {}

}

const mongoose = require('mongoose')
const OppSchema = new mongoose.Schema({
    /*key:{
        type: Number,
        required: true,
        unique: true
    },*/
    title:{
        type: String,
        required: [true, 'A title for the opportunity is required.'],
        minLength: [3,'Minimum title length is 3 characters']
    },
    description: {
        type: String,
        required: [true, 'A description of the opportunity is required.']
    },
    dateDue: {
        type: Date,
        required: [true, 'Please add a due date for this opportunity']
    },
    submitter: {
        type: String,
        required: [true, 'Please add the name of the submitter']
    },
    oppType:{
        type: String,
        required: [true, 'Please indicate what type of opportunity this is']
    },
    oppLoc:{
        type: String,
        required: [true, 'Please indicate whether this opportunity is virtual or in-person']
    }
})

exports.Opp = mongoose.model('opportunities', OppSchema)