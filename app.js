const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
//----------------------------------------- END OF IMPORTS---------------------------------------------------

//DB CONNECTION

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------



// Routes

var LoginRouter = require('./routes/Login');
app.use('/',LoginRouter);

// Regiser Route
var RegisterRouter = require('./routes/Users');
app.use('/',RegisterRouter);

app.get("/user", (req, res) => {
  res.send("its Working !"); // To check Route
});
//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
PORT= process.env.PORT||4000;
app.listen(PORT, () => {
  console.log("Server Has Started on PORT: "+ PORT);
});