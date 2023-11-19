const express = require("express")
const Post = require("./post") // new
const router = express.Router()
const mysql = require('mysql2');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const connection = mysql.createConnection({
        host: 'localhost',
        password: '1156673',
        user: 'root',
        database: 'cinemasystem',
        port:3306
      });


//const dbConnection = require("./database").databaseConnection;

const createToken = (_id) =>{
        //first argument is an object that represent a payload of the token. 
        // the Different property and values are going to be inside the payload
        //seond arg is is secret string only known to the server. Secret string is in .env varable
        //third arg is option, which we used expired. It meain the user will be logged in for 3 days
        //then the token will be expired
       return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'} )
    }

/**
 * 
 * @param {string} email 
 * @returns {Promise<int>}
 */
const getUserId = (email) => {
        let sql = "SELECT * FROM registereduser WHERE email = '" + email + "'";
        connection.query(
                sql,
                function(err, results, fields) {
                  return results.registeredUserID;
                }
              );

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
        password: '1156673',
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
//fetches the user profile
router.get("/getProfile", async(req, res) => {
        const id = await getUserId(req.body.email);
        //const id = 11;
        sql = "SELECT * FROM registereduser JOIN paymentcard ON registereduser.registeredUserID = paymentcard.userId WHERE paymentcard.userId = " + id + ""
        connection.query(
                sql,
                function(err, results, fields) {
                  console.log(results);
                  res.send(results);
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
                  if(results.length != 0) {
                        console.log(results);
                        //create a token
                        const token = createToken(results.registeredUserID)
                        //as respond, we send back the email and token. we can find in postman or local storage
                        res.status(200).json({email, token})
                  } else {
                        console.log({error: err});
                        res.status(400).json('error')
    }
                  }
                
              );
})

router.post("/signup", async(req, res) => {
        //INSERT INTO user (name, phone, email, password, isSubscribed, statusId) VALUES ([givenName],[givenPhone],[givenEmail],[givenPassword],[false],[1])
        //console.log(req.body);
        let sql = "SELECT * FROM registereduser WHERE email = '" + req.body.email + "'";

        const salt = await bcrypt.genSalt(10) //the longer the number, the longer it take for hacker to crack pw, but also take longer for user to signup
        const hash = await bcrypt.hash(req.body.password, salt)

        connection.query(
                sql,
                function(err, results, fields) {
                  if(results.length == 0) { //email does not exist in db\
                        sql = "INSERT INTO registereduser(phone, email, password, isSubscribed, statusID, name) VALUES ("
                                + "'999-999-9999'"
                                +  ", '" + req.body.email + "', "
                                + "'" + hash + "', "
                                + "'false', "
                                + "1, "
                                + "'" + req.body.name + "'"
                                + ")";
                        
                        connection.query(
                                sql,
                                function(err, results) {
                                        if(err) throw err;
                                        console.log("user successfully added");
                                        console.log("new user id: " + results.insertId);
                                        sql = "INSERT INTO paymentcard(userID) VALUES (" + results.insertId + ")"
                                        connection.query(
                                                sql,
                                                function(err, results, fields) {
                                                  console.log("payment profile made for user (id is->): " + results.insertId)
                                                  console.log
                                                }
                                        );

                                }
                                );
                        
                  } else { //email already exist in db
                        console.log("email is already associated with account")
                  }
                }
              );
        
        
        
})

//verify given password with one stored in db
router.post("/verifyPassword", async(req, res) => {
        let sql = "SELECT * FROM registereduser WHERE email = '" + req.body.email + "'";
        connection.query(
                sql,
                async function(err, results, fields) { //this is questionable because i made into async
                        const match = await bcrypt.compare(req.body.password, results.password);
                        if(match) {
                                res.status(200).json(true);
                        } else {
                                res.status(400).json(false);
                        }
                }
              );

})
router.post("/book-movie", (req, res) => {
        // Extract booking data from the request body
        const { movieId, userId, bookingDate, bookingTime, seats } = req.body;
    
        // TODO: Add validation for the input data
    
        // SQL query to insert booking into the database
        const sql = "INSERT INTO bookings (movie_id, user_id, booking_date, booking_time, seats) VALUES (?, ?, ?, ?, ?)";
    
        // Executing the query
        connection.query(sql, [movieId, userId, bookingDate, bookingTime, seats.join(',')], (error, results) => {
            if (error) {
                console.error('Error in booking:', error);
                res.status(500).json({ message: "Error processing your booking" });
            } else {
                console.log('Booking successful:', results);
                res.status(200).json({ message: "Booking successful" });
            }
        });
    });
    

//verify if given email is an admin
router.post("/verifyAdmin", async(req, res) => {
        const id = await getUserId(req.body.email);
        let sql = "SELECT * FROM admin WHERE userId = " + id;
        connection.query(
                sql,
                async function(err, results, fields) { //this is questionable because i made into async
                        if(results.length != 0) {
                                res.status(200).json(true);
                        } else {
                                res.status(400).json(false);
                        }
                }
        );


})



module.exports = router