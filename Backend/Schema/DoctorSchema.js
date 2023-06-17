const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    FName: { type: String, require: true },
    SName: { type: String, require: true },
    Email: { type: String, require: true },
    Password: { type: String, require: true },
    Phone: { type: String, require: true },
    City: { type: String, require: true },
    State: { type: String, require: true },
    Department: { type: String, require: true },
    Verified: { type: Boolean, default: false },
    Per_Hour_Limit : {type:Number,default:5},
    TimeSlot: [
      {
        Date: { type: String, required: true },
        Time: { type: String, required: true },
      },
    ],
  },
  { collection: "Doctor" }
);

const model = mongoose.model("DoctorSchema", DoctorSchema);
module.exports = model;
