const DoctorSchema = require("../Schema/DoctorSchema.js");
const OtpSchema = require("../Schema/OtpSchema.js");
const AppointmentSchema = require("../Schema/Appointments.js");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function VerifyUser(email, pass) {
  try {
    const doc = await DoctorSchema.findOne({ Email: email });
    if (!doc) return false;
    var pass = await bcrypt.compare(pass, doc.Password);
    if (!pass) return false;
    return doc;
  } catch (err) {
    console.log("Verify Doctor - ", err);
  }
}

module.exports = {
  SignIn: async (req, res) => {
    try {
      // Destructuring the request for email and password
      const { email, password, category } = req.body;
      console.log(req.body);

      if (email && password && category && category == "doctor") {
        try {
          const user = await VerifyUser(email, password);
          console.log(user);

          if (user && user.Verified) {
            const secret = process.env.JWTSECRET;
            const token = await JWT.sign(
              {
                FName: user.FName,
                SName: user.SName,
                Email: user.Email,
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
              },
              secret
            );
            return res.header(200).json({ status: 200, token });
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {}
    return res.header(201).json({ status: 401 });
  },

  SignUp: async (req, res) => {
    for (var i = 0; i < 10; i++) {
      await AppointmentSchema.create({
        DoctorName: "Satvik_Doctor",
        DoctorEmail: "satvik1@gmail.com",
        PatientName: "Satvik_Patient" + i.toString(),
        PatientEmail: i.toString() + "satvik@gmail.com",
        Date: "2023-04-16",
        Time_Slot: "9:00-12:00",
      });
    }
  },

  SearchAppointmentPatient: async (req, res) => {
    try {
      const { token } = req.body;

      console.log("SearchAppointmentDoctor");
      console.log(req.body);

      if (token) {
        console.log("ok");
        try {
          const user = await JWT.verify(token, process.env.JWTSECRET);
          if (user) {
            const results = await AppointmentSchema.find({
              DoctorEmail: user.Email,
            }).lean();
            console.log(results);
            let data_arr = [];
            for (var i of results) {
              data_arr.push({
                ID: i._id,
                Patient_Name: i.PatientName,
                Appointment_Date: i.Date,
                City: i.City,
                Time: i.Time_Slot,
                Status: i.Visited
                  ? "Completed"
                  : Date.parse(i.Date) < Date.now()
                  ? "Expired"
                  : "Up Comming",
              });
            }
            return res.header(200).json({ status: 200, result: data_arr });
          } else {
            return res.header(200).json({ status: 402 });
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
    return res.header(201).json({ status: 401 });
  },

  Test: async (req, res) => {
    const saltRound = parseInt(process.env.SALTROUND);
    var pass = await bcrypt.genSalt(saltRound).then((salt) => {
      return bcrypt.hash("Admin@1", salt);
    });
    console.log(pass);
    await DoctorSchema.updateOne(
      { Email: "satvik1@gmail.com" },
      { Password: pass }
    );
  },
};
