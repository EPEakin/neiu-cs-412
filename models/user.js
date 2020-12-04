const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SchemaTypes = mongoose.SchemaTypes
const passportLocalMongoose = require('passport-local-mongoose')
const Opp = require('../models/opportunities').Opp

const UserSchema = new Schema({
    name: {
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true
        }
    },
    school: {
        type: String,
        trim: true
    },
    subjectArea: {
        type: String,
        trim: true
    },
    dateAdded:{
        type: Date,
        trim: true
    },
    role:{
        type: String,
        trim: true
    },
    opps: [
        {
            type: SchemaTypes.ObjectID,
            ref: 'Opportunity'
        }
    ]
})

UserSchema.set('toJSON', {getters: true, virtuals: true})
UserSchema.set('toObject', {getters: true, virtuals: true})

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
})

UserSchema.virtual('fullName').get(function() {
    return `${this.name.first} ${this.name.last}`
})

exports.User = mongoose.model('users', UserSchema)