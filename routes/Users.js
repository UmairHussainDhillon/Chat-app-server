const dbConnection = require('../Databases/connect');
var express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
var router = express.Router();


var bodyparser = require('body-parser');
const { Router } = require('express');


router.post('/register', (req, res) => {
  console.log(req.body);
  const created = new Date()
  let result = {};
  let status = 200;
  

  const { name, password } = req.body;
    dbConnection.execute('SELECT `name` FROM `users` WHERE `name`=?', [name])
    .then(([rows]) => {
        if(rows.length > 0){
          console.log(rows.length)
          result.status=404;
          result.msg="User Does Not Exists with this name";
         res.send(result);
        }
       else{
    //TODO bcrypt
           bcrypt.hash(password, 12).then((hash_pass) => {
        // INSERTING USER INTO DATABASE
           dbConnection.execute("INSERT INTO `users`(`name`,`password`,`created`) VALUES(?,?,?)",
            [name,hash_pass,created])
           .then(result => {
          console.log("done");
          result.status=404;
          result.msg="your account has been created successfully... ";
         console.log(result)
         res.send(result);
       
        }).catch(err => {
            // THROW INSERTING USER ERROR'S
            if (err) throw err;
        });
    })
    
    }})
});
// END OF REGISTER ROUTE
router.get('/users', function (req, res) {
  dbConnection.query("select * from users") 
  .then(([rows]) => {
    if(rows.length===0){
      data="No data"
      res.send(data)
    }
    else{
      data = rows;
      console.log("Users List Sent: ")
      res.send(data)
    }
  })
});
router.get('/messages', function (req, res) {
  dbConnection.query("select * from messages") 
  .then(([rows]) => {
    if(rows.length===0){
      data="No data"
      res.send(data)
    }
    else{
      data = rows;
      res.send(data)
    }
  })
});
/*
users.get('/dashboard', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})*/

module.exports = router;