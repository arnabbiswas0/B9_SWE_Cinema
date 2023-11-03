require("dotenv").config()

const mysql = require('mysql2');
const mysqlconnection = mysql.createConnection({
    host: 'arnabbiswas1.ddns.net',
    password: 'Remote-password',
    user: 'remote_user',  
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