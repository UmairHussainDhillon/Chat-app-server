const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const dbConnection = require('./Databases/connect');
const bodyParser = require("body-parser");
const app = express();
//----------------------------------------- END OF IMPORTS---------------------------------------------------

var http = require("http").createServer(app);
var io = require("socket.io")(http);
io.on('connection', socket => { 
  console.log("User Connected...",socket.id)
  var response = "Ali"
socket.emit("FromAPI", response); 
// listen from client inside IO "connection" event
socket.on("send_message", function (data) {
  console.log(data)
 dbConnection.execute("INSERT INTO `messages`(`message`,`sender`,`reciever`) VALUES(?,?,?)",
    [data.message,data.sender,data.receiver])
    .then(result => {
    // send event to receiver
    io.emit("new_message", data);});
})

});

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
http.listen(PORT, () => {
  console.log("Server Has Started on PORT: "+ PORT);
});