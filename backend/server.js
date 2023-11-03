require("dotenv").config()

const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT //|| 6001;
const { Schema } = mongoose;
const router = express.Router();
const { ObjectId } = require('mongodb');
const routes = require("./routes") // new



var cors = require('cors')

const app = express();
app.use(cors())


const mysql = require('mysql2');
/*
const CONNECTION_STRING = `mongodb+srv://arnab:test@swe-project.ulhiyxf.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose
  .connect(CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.use(express.json())
    app.listen(port);
    app.use("/api", routes)
    console.log('Mongo DB connection successful');
  })
  .catch((error) => {
    console.log(`Error in DB connection:  ${error}`);
  });
  */

  const mysqlconnection = mysql.createConnection({
    host: 'arnabbiswas1.ddns.net',
    password: 'Remote-password',
    user: 'remote_user',  
    database: 'movies',
    port:3306
  });

  

  app.use(express.json())
      app.listen(port);
      app.use("/api", routes)
      console.log('mysql DB connection successful');









