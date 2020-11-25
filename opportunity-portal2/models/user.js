const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SchemaTypes = mongoose.SchemaTypes
const bcrypt = require('bcrypt')

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
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    opps: [
        {
            type: SchemaTypes.ObjectID,
            ref: 'Opportunity'
        }
    ]
})

UserSchema.virtual('fullName').get(function() {
    return `${this.name.first} ${this.name.last}`
})

UserSchema.pre('save', async function(next){
    let user = this
    try{
        user.password = await bcrypt.hash(user.password, 10)
        //user.email = await bcrypt.hash(user.email, 10)
    } catch (error){
        console.log(`Error in hashing password ${error.message}`)
    }
})

UserSchema.methods.passwordComparison = async function(inputPassword) {
    let user = this
    return await bcrypt.compare(inputPassword, user.password)
}
exports.User = mongoose.model('users', UserSchema)