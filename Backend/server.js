const express = require("express");
const links = require("./Helper/links.js")
const app = express();
const Databse = require("./Helper/Database.js")
const cors = require("cors");
const session = require("express-session")
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})




app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));





Databse.connect();



links(app);




app.listen(2000, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server running on port 2000");
    console.log("%s", "http://localhost:2000");
  }
});
