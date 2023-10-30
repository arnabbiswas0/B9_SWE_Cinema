const express = require("express")
const Post = require("./post") // new
const router = express.Router()
const mysql = require('mysql2');
const connection = mysql.createConnection({
        host: 'localhost',
        password: 'cay80634',
        user: 'root',
        database: 'movies',
        port:3306
      });
//const dbConnection = require("./database").databaseConnection;



// Get all posts
router.get("/movies", async (req, res) => {
        
	//const posts = await Post.find()
	//res.send(posts)

        /*
        let sql = 'SELECT * FROM movie LIMIT 10';
        dbconnection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('request received');
        
       
    });
    */
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
})

//adding a movie to the db
router.post("/movies", async (req, res) => {
	const post = new Post({
        title: req.body.title, // String is shorthand for {type: String}
        rating: req.body.rating,
        price: req.body.price,
        poster: req.body.poster,
        trailer: req.body.trailer,
        playing: req.body.playing
	})
	await post.save()
	res.send(post)

        let sql = "INSERT INTO movie (title, rating, trailer, poster, isOut) VALUES ("
                + req.body.title
                +req.body.rating
                +req.body.trailer
                +req.body.poster
                +req.body.playing
        +")";
        connection.query(
                sql,
                function(err, results, fields) {
                  res.send(results); // results contains rows returned by server
                  console.log(fields);
                }
              );
})

module.exports = router