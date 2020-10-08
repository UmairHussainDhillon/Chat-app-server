
  const mysql = require('mysql2');
  const dbConnection = mysql.createPool({
      host     : 'localhost', // MYSQL HOST NAME
      user     : 'test', // MYSQL USERNAME
      password : 'testpassword', // MYSQL PASSWORD
      database : 'timetable_mis' // MYSQL DB NAME
  }).promise();
  module.exports = dbConnection;