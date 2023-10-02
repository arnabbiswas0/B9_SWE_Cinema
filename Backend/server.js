
const express = require('express');
const app = express();


const mysql = require('mysql2');

app.get('/', function (req, res) {
    // create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        password: 'cay80634',
        user: 'root',
        database: 'movies',
        port:3306
      });
      
      // simple query
      connection.query(
        'SELECT * FROM movie LIMIT 10',
        function(err, results, fields) {
          res.send(results); // results contains rows returned by server
          console.log(fields);
        }
      );
});

let server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});

