const userSchema = require("../Schema/UserSchema.js");
const OtpSchema = require("../Schema/OtpSchema.js");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const NodeMailer = require("./NodeMailer.js");

async function VerifyUser(email, pass) {
  try {
    const user = await userSchema.findOne({ Email: email });

    if (!user) return false;

    var pass = await bcrypt.compare(pass, user.Password);

    if (!pass) return false;

    return user;
  } catch (err) {
    console.log("Verify User - ", err);
    return false;
  }
}

async function SetOtp(email) {
  try {
    const otp = await OtpSchema.findOne({ Email: email });
    const OTP = Math.floor(1000000 + Math.random() * 9000000).toString();
    const mailWait = await NodeMailer.SendOtpUsingMail(OTP, email);

    if (!mailWait) {
      return false;
    }

    if (!otp) {
      const expireAt = (Date.now() + 1000 * 60 * 30).toString();

      await OtpSchema.create({ Email: email, Otp: OTP, Exp: expireAt });
    } else {
      await OtpSchema.updateOne({ Email: email }, { $set: { Otp: OTP } });
    }

    return true;
  } catch (err) {
    console.log("Generate Otp - ", err);
    return false;
  }
}

module.exports = {
  // Sign In Function
  SignIn: async (req, res) => {
    try {
      // Destructuring the request for email and password
      const { email, password, category } = req.body;
      console.log(req.body);

      if (email && password && category && category == "patient") {
        try {
          const user = await VerifyUser(email, password);
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
          } else {
            console.log(user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {}
    return res.header(201).json({ status: 401 });
  },

  SignUp: async (req, res) => {
    try {
      const { email, password, phone, fname, sname, gender } = req.body;
      if (email && password && phone && fname && sname && gender) {
        if (await userSchema.findOne({ Email: email }))
          return res.header(201).json({ status: 405 });
        try {
          const saltRound = parseInt(process.env.SALTROUND);
          var pass = await bcrypt.genSalt(saltRound).then((salt) => {
            return bcrypt.hash(password, salt);
          });
          console.log(pass);

          const user = await userSchema.create({
            FName: fname.toUpperCase(),
            SName: sname.toUpperCase(),
            Email: email,
            Phone: phone,
            Password: pass,
            Gender: gender.toUpperCase(),
          });
          if (user) {
            return res.header(200).json({ status: 200 });
          } else {
            return res.header(401).json({ status: 404 });
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        return res.header(201).json({ status: 404 });
      }
    } catch (err) {}
    return res.header(201).json({ status: 401 });
  },

  // Sign In Function

  VerifyOtp: async (req, res) => {
    try {
      // Destructuring the request for email and password
      const { email, password, otp } = req.body;

      if (email && password) {
        try {
          const user = await VerifyUser(email, password);
          if (user && otp) {
            var OTP = await OtpSchema.findOne({ Email: email });
            if (OTP.Otp == otp && OTP.Exp > Date.now()) {
              await userSchema.updateOne(
                { Email: email },
                { $set: { Verified: true } }
              );
              return res.header(200).json({ status: 200 });
            } else {
              return res.header(200).json({ status: 202 });
            }
          } else if (user && user.Verified) {
            return res.header(200).json({ status: 205 });
          } else if (user) {
            const OtpStatus = await SetOtp(email);
            if (OtpStatus) {
              return res.header(200).json({ status: 201 });
            } else {
              return res.header(200).json({ status: 206 });
            }
          } else {
            return res.header(200).json({ status: 203 });
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {}
    return res.header(201).json({ status: 401 });
  },

  VerifyToken: async (req, res) => {
    try {
      const { token } = req.body;

      if (token) {
        try {
          const user = await JWT.verify(token, process.env.JWTSECRET);
          if (user) {
            return res.header(200).json({ status: 200, user });
          } else {
            return res.header(200).json({ status: 203 });
          }
        } catch (err) {}
      }
    } catch (err) {}
    return res.header(201).json({ status: 401 });
  },

  Test: async (req, res) => {
    const saltRound = parseInt(process.env.SALTROUND);
    var pass = await bcrypt.genSalt(saltRound).then((salt) => {
      return bcrypt.hash("Admin@1", salt);
    });
    console.log(pass);

    const user = await userSchema.updateOne(
      { Email: "satvikshukla453@gmail.com" },
      {
        Weight : 50
      }
    );
    console.log(user);

    return res.send("<h1>Server test</h1>");
  },

  SearchAppointmentPatient: async (req, res) => {
    try {
      const { token } = req.body;

      console.log("SearchAppointmentPatient");
      console.log(req.body);

      if (token) {
        console.log("ok");
        try {
          const user = await JWT.verify(token, process.env.JWTSECRET);
          if (user) {
            const result = await userSchema
              .findOne({ Email: user.Email })
              .lean();
            console.log(result);
            return res
              .header(200)
              .json({ status: 200, result: result.Appointments });
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
};
