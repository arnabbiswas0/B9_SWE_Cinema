
const express = require("express")
const Post = require("./post") // new
const router = express.Router()
const mysql = require('mysql2');
const promisesql = require('mysql2/promise');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const nodemailer = require('nodemailer');

const Movie = require('./models/Movie');
const MovieDA = require('./dataAccess/movieDA');

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

function getShowtime(showtimeID) {
        return new Promise((resolve, reject) => {
                let sql = 'SELECT * FROM showtime WHERE showtimeID = \'' + showtimeID + '\'';
                connection.query(
                        sql,
                        function(err, results, fields) {
                                //console.log(results.roomID);
                                return resolve(results);
                        }
                );
        })
}

function getSeatId(seatName, roomId) {
        return new Promise((resolve, reject) => {
                let sql = "SELECT * FROM seat WHERE seatName = '" + seatName + "' AND roomID = '" + roomId + "'";
                console.log(sql);
                connection.query(
                        sql,
                        function(err, results, fields) {
                                //console.log(results.seatID);
                                return resolve(results);
                        }
                );
        })
}

function checkShowtimeCollisionHelper(showtime) {
        return new Promise((resolve, reject) => {
                connection.query(
                        showtime,
                        function(err, results, fields) {
                                console.log(results.roomID);
                                return resolve(results);
                        }
                );
        })
}
function checkShowtimeCollision(showtimes) {
        //build sql Stirng using loops then pass to checkShowtimeColissionHelper method
        //if returned result.length > 0 return true (there is a collision)
        //else return false 
        
        //use loop in the addshowTime route (test before using) 
}

function buildDateArray(startDates, endDates) {
        //console.log('start date: ' + startDate.toDateString());
        //console.log('endDate: ' + endDate.toDateString())
        let startDate = new Date(startDates);
        startDate.setDate(startDate.getDate()+1)
        let endDate = new Date(endDates)
        endDate.setDate(endDate.getDate()+1)
        return new Promise((resolve, reject) => {
                let arr = [];
                for(let day = startDate; startDate <= endDate; day.setDate(day.getDate() + 1)) {
                        arr.push(day.toDateString());
                        console.log('current day: ' + day.toDateString())
                }
                return resolve(arr);
        })
}

function getCustomerCreditCard(userId) {
        return new Promise((resolve, reject) => {
                let sql = 'SELECT * FROM paymentcard WHERE userId = \'' + userId + '\''
                connection.query(
                        sql,
                        function(err, results, fields) {
                                console.log(results.roomID);
                                return resolve(results);
                        }
                );

        })
}

async function beginAccountActivation(email) {
        //let email = 'softwareengineeruga@gmail.com';
        let id = '';
        await getId(email).then((data) => {
                if(data.length > 0) {
                        id = data[0].registeredUserID
                }
        });
        //let actvationLink = '<html>Click <a href="http://localhost:8000/api/activateUser?email=hi">here</a> link to activate account: </html>'
        let link = 'http://localhost:8000/api/activateUser?id=' + id;
        let actvationLink = '<h3>Click below to activate account: </h3><br>' 
        +'<form method="post" class="inline" action="http://localhost:8000/api/activateUser?id='
        + id 
        +"\">"
         + '<input type="hidden" name="email" value=' + email + '>'
          +'<button type="submit" name="email" value='+ email +  'class="link-button">'
           + 'Activate Account'
          +'</button>'
        +'</form>'
        sendActivationEmail(email, actvationLink);
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

const sendActivationEmail = (email, message) => {
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
                html: message
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
        host: 'localhost',
        password: 'cay80634',
        user: 'root',
        database: 'movies',
        port:3306
      });
      
      // simple query
      connection.query(
        'SELECT * FROM movie',
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

        sql = "SELECT * FROM registereduser WHERE registeredUserID = " + id + ""
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
        const movie = new Movie(req.body);              // create movie instance
        const movieDA = new MovieDA();
        await movieDA.writeNewMovie(movie);             // write to database
        res.send("Movie created successfully");
});

// checking movie schedules 
router.get("/movies/:date_time", async (req, res) => {
        const movieDA = new MovieDA();
        const movies_with_same_schedule = await movieDA.validateMovieSchedule(req.params.date_time); // req.body == schedule (date_time)
        //console.log(json(schedule));
        //res.send(schedule);
        //console.log("server endpoint reached!")
        res.json(movies_with_same_schedule);
});
/*
* {
        const movieDA = new MovieDA():
        movieDA.validateMovieSchedule(req.body);
        if (schedule === "Invalid") {
                res.send("movie schdule Invalid!")
        }
        else {res.send("movie schedule Valid!")}
}
*/

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
                res.status(200).json({email, token});
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
                                async function(err, results) {
                                        if(err) throw err;
                                        console.log("user successfully added");
                                        console.log("new user id: " + results.insertId);
                                        let message = "Your account has been successfully created";
                                        const success = await sendEmail(req.body.email, message);
                                        const success2 = await beginAccountActivation(req.body.email);
                                         res.status(200).json(req.body.email);
                                        // sql = "INSERT INTO paymentcard(userID) VALUES (" + results.insertId + ")"
                                        // connection.query(
                                        //         sql,
                                        //         async function(err, results, fields) {
                                        //                 console.log("payment profile made for user (id is->): " + results.insertId)
                                        //                 let message = "Your account has been successfully created";
                                        //                 const success = await sendEmail(req.body.email, message);
                                        //                 const success2 = await beginAccountActivation(req.body.email);
                                        //                 res.status(200).json(req.body.email);
                                        //         }
                                        // );

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
        //console.log(req.body);
        let sql = "UPDATE registereduser SET name = '" + req.body.name 
        + "', phone = '" + req.body.phone 
        + "', streetName = '" + req.body.street
        + "', city = '" + req.body.city 
        + "', state = '" + req.body.state
        + "', zip = '" + req.body.zip
        + "' WHERE email = '" + req.body.email + "'"; //add where clause 
        /*
        let sql = "UPDATE showtime(name, phone, streetName, city, state, zip) VALUES ("
        + "\'" + req.body.name + "\', "
        + "\'" + req.body.phone + "\', "
        + "\'" + req.body.streetName + "\'"
        + "\'" + req.body.city + "\'"
        + "\'" + req.body.state + "\'"
        + "\'" + req.body.zip + "\'"
        +")"
        +"' WHERE email = '" + req.body.email + "'";
        */
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

router.post("/addCard", async (req, res) => {
        let id = '';
        await getId(req.body.email).then((data) => {
                if(data.length > 0) {
                        id = data[0].registeredUserID
                }
        });
        console.log(req.body);
        console.log(id);
        let sql = "INSERT INTO paymentcard(cardNumber, type, nameOnCard, expDate, userId, cvv) VALUES ("
                                + "\'" + req.body.cardNumber + "\', "
                                + "\'" + req.body.type + "\', "
                                + "\'" + req.body.nameOnCard + "\', "
                                + "\'" + req.body.expDate + "\', "
                                + "\'" + id + "\',"
                                + "\'" + req.body.cvv + "\'"
                                +")"
                                console.log(sql);
                                connection.query(
                                        sql,
                                        function(err, results, fields) {
                                        //console.log(results);
                                        console.log(results);
                                        res.send(results);
                                        }
                                );
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

router.post('/getShowtimes', async (req,res) => {
        console.log(req.body);
        let date = new Date(req.body.date);
        date.setDate(date.getDate()+1);
        date = date.toDateString();
        console.log(date);
                let sql = 'SELECT * FROM showtime WHERE movieName = \'' + req.body.title + '\' AND date = \'' + date + '\''
        console.log(sql);
        connection.query(
                sql,
                function(err, results, fields) {
                  //console.log(results);
                  res.send(results);
                }
        );
})

//booking table needs userId, seatId, showtimeid
router.post('/getUnreservedSeats', async (req, res) => {
        let roomID = '';
        await getShowtime(req.body.showtimeID).then((data) => {
                if(data.length > 0) {
                        roomID = data[0].roomID;
                        //console.log(roomID);
                }
        });
        //console.log("starting query for seats");
        let sql = 'SELECT * FROM seat WHERE roomID = \'' + roomID + '\' AND seatId NOT IN '
        + '(SELECT seatID FROM booking WHERE showtimeID = ' + req.body.showtimeID + ')';
        connection.query(
                sql,
                function(err, results, fields) {
                  //console.log(results);
                  //console.log(results);
                  res.send(results);
                }
        );
})

router.post('/addShowtimes', async (req, res) => {
        //let dates = req.body.dates;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        console.log("Begginning date: " + startDate.toString());
        console.log('times: ' + req.body.times)
        console.log(typeof(startDate))
        console.log(req.body.times)
        console.log('movieNAme: ' + req.body.movie)
        let collisionPresent = false;
        let dates = [];
        await buildDateArray(startDate, endDate).then((data) => {
                if(data.length > 0) {
                        dates = data;
                }
        });
        let times = req.body.times;
        let room = req.body.room;
        console.log(dates);
        //checking for collisions
        for(let day of dates) {
                for(let time of times) {
                        let sql = "SELECT * FROM showtime WHERE date = \'" + day + "\' AND time = \'" + time + "\' AND roomID = \'" + room + "\'"
                        
                        await checkShowtimeCollisionHelper(sql).then((data) => {
                                if(data.length > 0) {
                                        //res.status(400).json(false);
                                        collisionPresent = true;
                                }
                        });
                        
                }
        }

        //acutally adding to DB
        if(!collisionPresent) {
                for(let day of dates) {
                        for(let time of times) {
                                let sql = "INSERT INTO showtime(date, time, movieName, roomID) VALUES ("
                                + "\'" + day + "\', "
                                + "\'" + time + "\', "
                                + "\'" + req.body.movie + "\', "
                                + "\'" + room + "\'"
                                +")"
                                
                                connection.query(
                                        sql,
                                        function(err, results, fields) {
                                        //console.log(results);
                                        console.log(results);
                                        }
                                );
                                
                        console.log(sql);
                                
                        }
                }
                res.status(200).json('Showtime have been successfully added');
        } else {
                res.status(400).json('error: Showtime collision present');
        }
})

router.post('/bookTickets', async (req, res) => {
        //discuss what's actually being passed through so I know what to grab or if more helper functions are needed
        //needs: user email, seat Id, showtime id
        let id = '';
        await getId(req.body.email).then((data) => {
                if(data.length > 0) {
                        id = data[0].registeredUserID
                }
        });

        let roomID = '';
        await getShowtime(req.body.showtimeID).then((data) => {
                if(data.length > 0) {
                        roomID = data[0].roomID;
                        //console.log(roomID);
                }
        });
        console.log(req.body.seatName);
        let seatId = '';
        await getSeatId(req.body.seatName, roomID).then((data) => {
                if(data.length > 0) {
                        seatId = data[0].seatID;
                }
        })

        let sql = "INSERT INTO booking(userID, seatID, showtimeID) VALUES("
        + id + ", "
        + seatId + ", "
        + req.body.showtimeID + ")"

        let canBook = true;
        await getCustomerCreditCard(id).then((data) => {
                if(data.length < 1) {
                        canBook = false;
                }
        })
        if(canBook) {
                connection.query(
                        sql,
                        function(err, results, fields) {
                        //console.log(results);
                        console.log(results);
                        res.sendStatus(200);
                        }
                );
        } else {
                res.sendStatus(400);
        }

})

router.post('/fillSeatsAndRooms', async (req, res) => {
        let rows = "ABCDEF"
        for(let room = 1; room < 4; room++){
                for(let i = 0; i < rows.length; i++) {
                    for(let j = 1; j < 6; j++) {
                        //console.log(rows.charAt(i) + j + " room: " +room);
                        let seatName = rows.charAt(i) + j;
                        let sql = "INSERT INTO seat(roomID, seatName) VALUES("
                        + "\'" + room + "\'"
                        +", \'" + seatName + "\')";
                        console.log(sql); 
                        connection.query(
                                sql,
                                function(err, results, fields) {
                                  //console.log(results);
                                  console.log(results);
                                }
                        );
                    }
                
                }
        }
        res.sendStatus(200);
})

router.post('/addPromotion', async (req, res) => {
        let promotionMessage = req.body.promotion;
        let sql = 'SELECT * FROM registereduser WHERE isSubscribed = \'true\''
        connection.query(
                sql,
                function(err, results, fields) {
                  //console.log(results);
                  console.log(results);
                  for(let result of results) {
                        if(result.isSubscribed) {
                                sendEmail(result.email, promotionMessage);
                        }
                  }
                }
        );
}) 

router.post('/subscribeToPromotion', async(req, res) => {
        let id = '';
        await getId(req.body.email).then((data) => {
                if(data.length > 0) {
                        id = data[0].registeredUserID
                }
        });
        let sql = "UPDATE registereduser SET isSubscribed = \'true\' WHERE registeredUserID = " + id;
        connection.query(
                sql,
                function(err, results, fields) {
                  //console.log(results);
                  console.log(results);
                }
        );

})

router.post('/unsubscribeToPromotion', async(req, res) => {
        let id = '';
        await getId(req.body.email).then((data) => {
                if(data.length > 0) {
                        id = data[0].registeredUserID
                }
        });
        let sql = "UPDATE registereduser SET isSubscribed = \'false\' WHERE registeredUserID = " + id;
        connection.query(
                sql,
                function(err, results, fields) {
                  //console.log(results);
                  console.log(results);
                }
        );

})

router.post('/activateUser', async (req, res) => {
        let user = req.query.id;
        console.log(user);
        console.log("email body")
        let sql = "UPDATE registereduser SET statusId = 2 WHERE registeredUserID = " + user;
        connection.query(
                sql,
                function(err, results, fields) {
                  //console.log(results);
                  console.log(results);
                }
        );
        res.redirect("http://localhost:3000/HomePage")
        //console.log(req);
})

router.post('/sendActivationLink', async(req, res) => {
        //let email = 'softwareengineeruga@gmail.com';
        let id = '';
        await getId(req.body.email).then((data) => {
                if(data.length > 0) {
                        id = data[0].registeredUserID
                }
        });
        //let actvationLink = '<html>Click <a href="http://localhost:8000/api/activateUser?email=hi">here</a> link to activate account: </html>'
        let link = 'http://localhost:8000/api/activateUser?id=' + id;
        let actvationLink = '<h3>Click below to activate account: </h3><br>' 
        +'<form method="post" class="inline" action="http://localhost:8000/api/activateUser?id='
        + id 
        +"\">"
         + '<input type="hidden" name="email" value=' + req.body.email + '>'
          +'<button type="submit" name="email" value='+ req.body.email +  'class="link-button">'
           + 'Activate Account'
          +'</button>'
        +'</form>'
        sendActivationEmail(req.body.email, actvationLink);
})

router.post('/getPaymentCards', async(req, res) => {
        let id = '';
        await getId(req.body.email).then((data) => {
                if(data.length > 0) {
                        id = data[0].registeredUserID
                }
        });
        let sql = "SELECT * FROM paymentcard WHERE userId = " + id;
        connection.query(
                sql,
                function(err, results, fields) {
                  //console.log(results);
                  console.log(results);
                  res.send(results);
                }
        );

})

router.post('/deletePaymentCard', async(req, res) => {
        let id = '';
        await getId(req.body.email).then((data) => {
                if(data.length > 0) {
                        id = data[0].registeredUserID
                }
        });

        let sql = "DELETE FROM paymentcard WHERE userId = " + id + " AND cardNumber = '" + req.body.cardNumber + "'"
        connection.query(
                sql,
                function(err, results, fields) {
                  //console.log(results);
                  //console.log(results);
                  res.send(results);
                }
        );
})

router,post('/sendBookingConfirmation', async(req, res) => {
        // let id = '';
        // await getId(req.body.email).then((data) => {
        //         if(data.length > 0) {
        //                 id = data[0].registeredUserID
        //         }
        // });

        let message = "Booking for " + req.body.movieName + " has been processed";
        sendEmail(req.body.email, message);
})



module.exports = router




/* 
booking in whole:
User selects a date on a movie.
The frontend sends the date and movieName to the backend.
The backend then sends the frontend the the showtime(s) tuple.
The User is presented the times. 
The user selects the time.
The frontend sends the backend the showtimeID.
The backend sends the frontend the seats.
The user selects the seats they want.
The frontend handles a faux checkout.
The frontend sends these seatIDs to the backend.
THe backend reserves these seats. 
*/


/*
Sendbookingconfirmation

getBookings
*/