const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    Email:{type:String,require:true},
    Otp:{type:String,require:true},
    Exp:{type:Number,require:true},
}, { collection: 'Otp' })

const model = mongoose.model('Schema', OtpSchema);

module.exports = model;