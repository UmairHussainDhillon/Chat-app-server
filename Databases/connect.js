
  const mysql = require('mysql2');
  const dbConnection = mysql.createPool({
      host     : 'localhost', // MYSQL HOST NAME
      user     : 'umair', // MYSQL USERNAME
      password : 'test123', // MYSQL PASSWORD
      database : 'chat_app' // MYSQL DB NAME
  }).promise();
  module.exports = dbConnection;