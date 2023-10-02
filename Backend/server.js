
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 6001;

var cors = require('cors')

const app = express();
app.use(cors())


const mysql = require('mysql2');

/*Connect to database*/
const CONNECTION_STRING = `mongodb+srv://arnab:test@swe-project.ulhiyxf.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose
  .connect(CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port);
    console.log('Mongo DB connection successful');
  })
  .catch((error) => {
    console.log(`Error in DB connection:  ${error}`);
  });


let server = app.listen(6000, function () {
    console.log('Server is listening at port 6000...');
});

