const mysql = require('mysql2');
class MovieDA {
    // connect to mysql 'movie' database
    async writeNewMovie(movie) {
        const connection = mysql.createConnection({
            host: 'localhost',
            password: 'cay80634',
            user: 'root',
            database: 'movies',
            port:3306
        });
        // attempt to connect to database: if no error -> log success to console. 
        connection.connect(function(err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            } console.log("successful database connection");
        });
        // sql command to insert data to "movie" database - NOTE: (?,?,....?) protects against SQL injection attacks.
        const sql = 
        "INSERT INTO movie(title, category, rating, director, producer, cast, synopsis, reviews, poster, trailer, date_time, room) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        const values = [movie.title, movie.category, movie.rating, movie.director, movie.producer, 
            movie.cast, movie.synopsis, movie.reviews, movie.poster, movie.trailer, movie.date_time, movie.room];
        // query to the database to insert new movie record
        connection.query(sql, values, function(err, results, fields) {
                if(err) {
                    console.error('Error (database): ', err.message );
                } else {
                    console.log("Movie created successfully");
                }
        });
    } 
}
module.exports = MovieDA;