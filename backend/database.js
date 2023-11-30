//require("dotenv").config()

const mysql = require('mysql2');
const mysqlconnection = mysql.createConnection({
    host: 'localhost',
    password: 'cay80634',
    user: 'root',
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