require("dotenv").config()

const mysql = require('mysql2');
const mysqlconnection = mysql.createConnection({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    user: process.env.USER,  
    database: 'movies',
    port:3306
  });

  mysqlconnection.connect((err) => {
    if(err) {
        console.log('did not export properly');
    } else {
        console.log('exported properly');
    }
  })

  exports.databaseConnection = mysqlconnection;