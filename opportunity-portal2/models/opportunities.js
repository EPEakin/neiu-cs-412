/*const _opp_key = Symbol('key')
const _opp_title = Symbol('title')
const _opp_description = Symbol('description')
const _opp_dateDue = Symbol('dateDue')
const _opp_submitter = Symbol('submitter')
const _opp_oppType = Symbol('oppType')
const _opp_oppLoc = Symbol('oppLoc')


exports.Opp = class Opp {
    constructor(key, title, description, dateDue, submitter, oppType, oppLoc ) {
        this[_opp_key] = key
        this[_opp_title] = title
        this[_opp_description] = description
        this[_opp_dateDue] = dateDue
        this[_opp_submitter] = submitter
        this[_opp_oppType] = oppType
        this[_opp_oppLoc] = oppLoc
    }

    get key() {return this[_opp_key]}
    get title() {return this[_opp_title]}
    set title(newTitle) {this[_opp_title] = newTitle}
    get description() {return this[_opp_description]}
    set description(newDescription) {this[_opp_description] = newDescription}
    get dateDue() {return this[_opp_dateDue]}
    set dateDue(newDateDue) {this[_opp_dateDue] = newDateDue}
    get submitter() {return this[_opp_submitter]}
    set submitter(newSubmitter) {this[_opp_submitter] = newSubmitter}
    get oppType() {return this[_opp_oppType]}
    set oppType(newOppType) {this[_opp_oppType] = newOppType}
    get oppLoc() {return this[_opp_oppLoc]}
    set oppLoc(newOppLoc) {this[_opp_oppLoc] = newOppLoc}
}*/

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
    key:{
        type: Number,
        required: true,
        unique: true
    },
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