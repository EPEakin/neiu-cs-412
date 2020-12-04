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
const Schema = mongoose.Schema
const SchemaTypes = mongoose.SchemaTypes
const passportLocalMongoose = require('passport-local-mongoose')
const User = require('../models/user').User
const OppSchema = new mongoose.Schema({
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
    },
    website:{
        type: String
    },
    submitterId:{
        type: SchemaTypes.ObjectID,
        ref: 'User'
    }
})

exports.Opp = mongoose.model('opportunities', OppSchema)