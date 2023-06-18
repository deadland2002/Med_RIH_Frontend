const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    FName:{type:String , require:true},
    SName:{type:String , require:true},
    Email:{type:String , require:true},
    Password:{type:String , require:true},
    Phone:{type:String , require:true},
    Gender:{type:String , require:true},
    Image:{type:String , require:true},
    Age:{type:String , require:true},
    Weight:{type:Number , require:true},
    Height:{type:Number , require:true},
    Verified:{type:Boolean , default:false},
    Appointments:[
        {
            Appointment_Date:{type:String,required:true},
            Appointment_Time:{type:String,required:true},
            Appointment_City:{type:String,required:true},
            Doctor:{type:String,required:true},
            Booked_Date:{type:Date,default:Date.now()},
            Visited:{type:Boolean,default:false},
            Dignosed:{type:String},
            Next_Appointment_Date:{type:String}
        }
    ]
}, { collection: 'User' })

const model = mongoose.model('UserSchema', Schema);

module.exports = model;