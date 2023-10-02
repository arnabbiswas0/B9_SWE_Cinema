const express = require('express');
const app = express();
const mssql = require("mssql");
 
app.get('/', function (req, res) {
 
   
    const config = {
        user: 'root',
        password: 'cay80634',
        server: 'localhost:3306',
        database: 'movie'
    };
 
    var dbConn = new mssql.ConnectionPool(config);

    dbConn.connect(function (err) {
 
        let request = new mssql.Request();
 
       
        request.query('SELECT * FROM movie LIMIT 10',
            function (err, records) {
 
                if (err) console.log(err)
 
                res.send(records);
 
            });
    });
});
 
let server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});