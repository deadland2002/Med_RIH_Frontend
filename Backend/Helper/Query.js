const DoctorSchema = require("../Schema/DoctorSchema.js");
const AppointmentSchema = require("../Schema/Appointments.js");
const UserSchema = require("../Schema/UserSchema.js");
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

async function VerifyToken(token) {
  try {
    const user = JWT.verify(token, process.env.JWTSECRET);
    return user;
  } catch (err) {
    console.log("Verify TOKEN - ");
    return false;
  }
}

async function GetDayFromNumber(day) {
  try {
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    return days[day];
  } catch (err) {
    console.log("Get Day - ");
    return false;
  }
}

module.exports = {
  SearchAppointment: async (req, res) => {
    try {
      // Destructuring the request for email and password
      const {
        token,
        State,
        City,
        Department,
        Date: Date_of_Appointment,
      } = req.body;

      if (token && State && City && Department && Date_of_Appointment) {
        console.log("ok");
        try {
          const user = await VerifyToken(token);
          if (user) {
            const day = new Date(Date_of_Appointment).getDay().toString();
            const result = await DoctorSchema.find({
              Department: Department,
              State: State,
              City: City,
              TimeSlot: { $elemMatch: { Date: day } },
            }).lean();

            var arr = [];

            if (result) {
              for (var i of result) {
                const exist = await UserSchema.findOne({
                  Email: user.Email,
                  Appointments: {
                    $elemMatch: {
                      Appointment_Date: Date_of_Appointment,
                      Doctor: i.FName + " " + i.SName,
                    },
                  },
                });

                var available = await AppointmentSchema.find({
                  DoctorEmail: i.Email,
                  Date: Date_of_Appointment,
                }).lean();

                if (available.length >= i.Per_Hour_Limit) continue;
                for (var obj of i.TimeSlot) {
                  if (obj.Date == day) {
                    arr.push([
                      i._id,
                      i.FName,
                      i.SName,
                      i.Department,
                      [obj.Date, obj.Time],
                      i.Per_Hour_Limit - available.length,
                      Date_of_Appointment,
                      City,
                      exist ? true : false,
                    ]);
                  }
                }
              }
            }

            return res.header(200).json({ status: 200, result: arr });
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

  BookAppointment: async (req, res) => {
    const { ID, token, Day_Time, Date_of_Appointment, City_of_Appointment } =
      req.body;
    try {
      if (
        ID &&
        token &&
        Day_Time &&
        Date_of_Appointment &&
        City_of_Appointment
      ) {
        const doctor = await DoctorSchema.findOne({ _id: ID });
        const user = await VerifyToken(token);

        if (doctor && user) {
          const available = await AppointmentSchema.find({
            DoctorEmail: doctor.Email,
            Time_Slot: Day_Time[1],
          });

          const exist = await UserSchema.findOne({
            Email: user.Email,
            Appointments: {
              $elemMatch: {
                Appointment_Date: Date_of_Appointment,
                Doctor: doctor.FName + " " + doctor.SName,
              },
            },
          });

          if (available.length < doctor.Per_Hour_Limit && !exist) {
            await AppointmentSchema.create({
              DoctorEmail: doctor.Email,
              DoctorName: doctor.FName + " " + doctor.SName,
              PatientName: user.FName + " " + user.SName,
              PatientEmail: user.Email,
              Date: Date_of_Appointment,
              Time_Slot: Day_Time[1],
              City: City_of_Appointment,
            });

            await UserSchema.updateOne(
              { Email: user.Email },
              {
                $push: {
                  Appointments: {
                    Appointment_Date: Date_of_Appointment,
                    Appointment_Time: Day_Time[1],
                    Doctor: doctor.FName + " " + doctor.SName,
                    Booked_Date: Date.now(),
                  },
                },
              }
            );

            return res.json({ status: 200 });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }

    return res.json({ status: 201 });
  },
};
