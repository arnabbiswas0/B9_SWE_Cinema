require("dotenv").config()
const express = require("express")
//const Post = require("./post") // new
const router = express.Router()
const mysql = require('mysql2');
const promisesql = require('mysql2/promise');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const nodemailer = require('nodemailer');
const connection = mysql.createConnection({
        host: 'localhost',
        password: 'cay80634',
        user: 'root',  
        database: 'cinemasystem',
        port:3306
      });

const promisequery = promisesql.createConnection({
        host: 'localhost',
        password: 'cay80634',
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
 * 
 */
const getUserId = async (email) => {
        let sql = "SELECT * FROM registereduser WHERE email = '" + email + "'";
        console.log(sql);
        connection.query(
                sql,
                function(err, results, fields) {
                        console.log({results})
                        return results;
                }
        );
        

}

function getId(email) {
        return new Promise((resolve, reject) => {
                let sql = "SELECT * FROM registereduser WHERE email = '" + email + "'";
                console.log(sql);
                connection.query(
                        sql,
                        function(err, results, fields) {
                                console.log(results.registeredUserID);
                                return resolve(results);
                        }
                );
        })
}


/**
 * 
 * @param {string} message
 * @param {string} email
 * @returns {Promise<string>}
 */
const sendEmail = (email, message) => {
        var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'softwareengineeruga@gmail.com',
                  pass: 'piambnyooengfjqy'
                }
              });
              
              var mailOptions = {
                from: 'softwareengineeruga@gmail.com',
                to: email,
                subject: 'Cinema Account',
                text: message
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
              
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
        host: 'arnabbiswas1.ddns.net',
        password: 'Remote-password',
        user: 'remote_user',  
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
router.post("/getProfile", async(req, res) => {
        let id = '';
        await getId(req.body.email).then((data) => {
                if(data.length > 0) {
                        id = data[0].registeredUserID
                }
        });

        sql = "SELECT * FROM registereduser JOIN paymentcard ON registereduser.registeredUserID = paymentcard.userId WHERE paymentcard.userId = " + id + ""
        connection.query(
                sql,
                function(err, results, fields) {
                  console.log(results);
                  res.status(200).json(results);
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
        /*
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
        */
              let password = '';
              let id = '';
              let email = req.body.email
              await getId(req.body.email).then((data) => { //it says getting id but its actually pulling the entire tuple so we grab password
                      if(data.length > 0) {
                              password = data[0].password;
                              id = data[0].registeredUserID;
                      }
              });
              const match = await bcrypt.compare(req.body.password, password);
              console.log(match);
              if(match) {
                //console.log(results);
                //create a token
                const token = createToken(id)
                //as respond, we send back the email and token. we can find in postman or local storage
                res.status(200).json({email, token})
              } else {
                //console.log({error: err});
                res.status(400).json('error')
              }
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
                                                async function(err, results, fields) {
                                                        console.log("payment profile made for user (id is->): " + results.insertId)
                                                        let message = "Your account has been successfully created";
                                                        const success = await sendEmail(req.body.email, message);
                                                        res.status(200).json(req.body.email);
                                                }
                                        );

                                }
                                );
                        
                  } else { //email already exist in db
                        console.log("email is already associated with account")
                        res.status(400).json('error');
                  }
                }
              );
        
        
        
})

//verify given password with one stored in db
router.post("/verifyPassword", async(req, res) => {
        /*
        let sql = "SELECT * FROM registereduser WHERE email = '" + req.body.email + "'";
        connection.query(
                sql,
                async function(err, results, fields) { //this is questionable because i made into async
                        const match = await bcrypt.compare(req.body.password, results.password);
                        console.log(match);
                        if(match) {
                                console.log(match);
                                res.status(200).json(true);
                        } else {
                                res.status(400).json(false);
                        }
                }
              );
        */
        let password = '';
        await getId(req.body.email).then((data) => { //it says getting id but its actually pulling the entire tuple so we grab password
                if(data.length > 0) {
                        password = data[0].password
                }
        });
        const match = await bcrypt.compare(req.body.password, password);
        console.log(match);
        if(match) {
                console.log(match);
                res.status(200).json(true);
        } else {
                res.status(400).json(false);
        }

})

//verify if given email is an admin
router.post("/verifyAdmin", async(req, res) => {
        //const id = await getUserId(req.body.email).then((data) => {console.log({data})});
        //await new Promise(resolve => setTimeout(resolve, 5000));
        let id = '';
        await getId(req.body.email).then((data) => {
                if(data.length > 0) {
                        id = data[0].registeredUserID
                }
        });
        console.log(id)
        //const id = await promisequery.query("SELECT * FROM registereduser WHERE email = '" + req.body.email + "'")
        console.log(req.body.email);
        let sql = "SELECT * FROM admin WHERE userId = " + id;
        connection.query(
                sql,
                function(err, results, fields) { //this is questionable because i made into async
                        if(results.length > 0) {
                                res.status(200).json(true);
                        } else {
                                res.status(400).json(false);
                        }
                }
        );


})

//updates user profile and payment info
router.post("/updateProfile", async (req, res) => {
        console.log(req.body);
        let sql = "UPDATE registereduser SET name = '" + req.body.name + "', phone = '" + req.body.phone + "', streetName = '" + req.body.streetname + "', city = '" + req.body.city + "', zip = '" + req.body.zip + "', state = '" + req.body.state +  "' WHERE email = '" + req.body.email + "'"; //add where clause 

        let id = '';
        await getId(req.body.email).then((data) => {
                if(data.length > 0) {
                        id = data[0].registeredUserID
                }
        });

        connection.query(
                sql,
                function(err, results, fields) {
                  console.log(results);
                  res.send(results);
                }
        );
        
        /*        
        console.log(id);
        let cardNumber = req.body.cardNumber;
        if(cardNumber.length > 0) {
                const salt = await bcrypt.genSalt(10) //the longer the number, the longer it take for hacker to crack pw, but also take longer for user to signup
                const hash = await bcrypt.hash(req.body.password, salt)
                cardNumber = hash;
        }

        sql = "UPDATE paymentcard SET streetName = '" + req.body.streetname + "', city = '" + req.body.city + "', zip = '" + req.body.zip + "', state = '" + req.body.state + "', "
                + "cardNumber = '" + cardNumber + "', expDate = '" + req.body.expirationDate + "', cvv = '" + req.body.cvv + "' WHERE userId = " + id; //add where clause 

        console.log(sql);

        connection.query(
                sql,
                function(err, results, fields) {
                  //console.log(results);
                  res.send(results);
                }
        );
        */
})

router.post('/changePassword', async (req, res) => {
        console.log(req.body);

        const salt = await bcrypt.genSalt(10) //the longer the number, the longer it take for hacker to crack pw, but also take longer for user to signup
        const hash = await bcrypt.hash(req.body.password, salt)

        let sql = "UPDATE registereduser SET password = '" + hash + "' WHERE email = '" + req.body.email + "'"; //add where clause 

        let id = '';
        await getId(req.body.email).then((data) => {
                if(data.length > 0) {
                        id = data[0].registeredUserID
                }
        });

        console.log(sql);

        connection.query(
                sql,
                function(err, results, fields) {
                  //console.log(results);
                  res.send(results);
                }
        );
})

router.post('/addShowtime', async(req, res) => {
        console.log(req.body);
        /*
        let sql = "INSERT INTO showtime(date, time, movieName, roomID) VALUES ("
        + "'" +req.body.date + "'"
        + ", '" + req.body.time + "', "
        + "'" + req.body.movieName + "', "
        + "'1'"
        + ")";
        console.log(sql);
        */
        let time = ["3:00", "4:00", "5:00"];
        let date = ["11/30/2023", "12/01/2023", "12/02/2023", "12/03/2023", "12/04/2023"];
        let movieName = "Saw X";
        let room = "1"
        let response = [];

        for (let day of date) {
                for(let t of time) {
                       let sql =  "INSERT INTO showtime(date, time, movieName, roomID) VALUES ("
                        + "'" +day + "'"
                        + ", '" + t + "', "
                        + "'" + movieName + "', "
                        + "'1'"
                        + ")";
                         console.log(sql);
                         response.push(sql);
                }
        }
        res.send(response);

})



module.exports = router