const { model } = require("mongoose");
const Database = require("../Helper/Database.js");
const UserValidate = require("../Helper/UserValidate.js");
const DoctorValidate = require("../Helper/DoctorValidate.js");
const QueryValidate = require("../Helper/Query.js");
const { validate } = require("../Schema/UserSchema.js");
const Nodemailer = require("./NodeMailer.js");

const link = (app) => {
  app.get("/", function (req, res) {
    return res.send("server running");
  });
  
  app.get("/test", function (req, res) {
    return UserValidate.Test(req,res);
  });
  
  app.get("/api/DoctorSignUp", async function (req, res) {
    DoctorValidate.SignUp(req,res);
  });
  
  app.get("/api/test", async function (req, res) {
    return res.json({data : await Nodemailer.SendOtpUsingMail(111111)});
  });

  app.post("/api/user/SignIn", async function (req, res) {
    UserValidate.SignIn(req,res);
  });

  app.post("/SignUp", async function (req, res) {
    UserValidate.SignUp(req,res);
  });
  
  app.post("/Verify", async function (req, res) {
    UserValidate.VerifyOtp(req,res);
  });
  
  app.post("/VerifyToken", async function (req, res) {
    UserValidate.VerifyToken(req,res);
  });
  
  app.post("/api/DoctorSignIn", async function (req, res) {
    DoctorValidate.SignIn(req,res);
  });
  
  
  
  app.post("/api/SearchAppointment", async function (req, res) {
    QueryValidate.SearchAppointment(req,res);
  });
  
  
  app.post("/api/BookAppointment", async function (req, res) {
    QueryValidate.BookAppointment(req,res);
  });
};

module.exports = link;
