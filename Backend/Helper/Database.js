const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

URL = process.env.DATABASEURL;



module.exports = {
  connect: () => {

    mongoose
      .connect(URL)
      .then(() => {
        console.log("Database Connected");
      })
      .catch((err) => {
        console.log("Database connection failed");
        console.log(err);
      });
  },
};
