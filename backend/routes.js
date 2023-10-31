const express = require("express")
const Post = require("./post") // new
const router = express.Router()
const mysql = require('mysql2');
const jwt = require('jsonwebtoken')
const connection = mysql.createConnection({
        host: 'localhost',
        password: 'cay80634',
        user: 'root',
        database: 'cinemasystem',
        port:3306
      });

//const bcrypt = require('bcrypt')
//const validator = require('validator')
//const dbConnection = require("./database").databaseConnection;

const createToken = (_id) =>{
        //first argument is an object that represent a payload of the token. 
        // the Different property and values are going to be inside the payload
        //seond arg is is secret string only known to the server. Secret string is in .env varable
        //third arg is option, which we used expired. It meain the user will be logged in for 3 days
        //then the token will be expired
       return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'} )
    }



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
        /*
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
        */
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
                  console.log("Added a movie");
                }
              );
})

router.post("/login", async(req, res) => {
        let sql = "SELECT * FROM registereduser WHERE email = '" + req.body.email + "' AND password = '" + req.body.password + "'";
        let email = req.body.email
        console.log(sql);
        connection.query(
                sql,
                function(err, results, fields) {
                  //res.send(results); // results contains rows returned by server
                  //console.log("Added a movie");
                  if(true) {
                        console.log(results);
                        //create a token
                        const token = createToken(results.registeredUserID)
                        //as respond, we send back the email and token. we can find in postman or local storage
                        res.status(200).json({email, token})
                  } else {
                        res.status(400).json('error')
    }
                  }
                
              );
})

module.exports = router