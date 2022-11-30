const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const userSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    gstin: {
        type: String,
        required: true
        // pattern check ?
    },
    cd: {
        type: Date,
        require: true
    }, 
    role:{
        type: String,
        enum : ["Customer", "Delivery Partner"],
        required: true,
        default:"Customer"
    },
    role_id:{
        type:String
    },
    user_status:{
        type:String,
        enum:["Active","In Active"],
        default:"Active"
    }
})

module.exports = mongoose.model('User', userSchema)


