const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    DoctorName: { type: String, require: true },
    DoctorEmail: { type: String, require: true },
    PatientName: { type: String, require: true },
    PatientEmail: { type: String, require: true },
    City: { type: String, require: true },
    Date: { type: String, require: true },
    Time_Slot: { type: String, require: true },
    Next_Slot: { type: String , default:null },
    Previous_Slot: { type: String , default:null },
    Visited: { type: Boolean , default:false },
    Medication: [
      {
        Medicine_Name:{ type: String, require: true },
        Medicine_Quantity:{ type: Number, require: true }
      }
    ],
  },
  { collection: "Appointment" }
);

const model = mongoose.model("AppointmentSchema", AppointmentSchema);

module.exports = model;
