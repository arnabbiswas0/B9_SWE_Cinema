const mysql = require('mysql2');

const mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1156673',
    database: 'movies',
    port: 3306
});

// Define the SQL query for creating the bookings table
const createBookingsTableQuery = `
CREATE TABLE IF NOT EXISTS bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    user_id INT,  -- Optional: include if you're tracking the user who made the booking
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    seats VARCHAR(255) NOT NULL
    -- Add FOREIGN KEY constraints if necessary, based on your database schema
);
`;

mysqlconnection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');

    // Execute the query to create the bookings table
    mysqlconnection.query(createBookingsTableQuery, (error, results) => {
        if (error) {
            console.error('Error creating bookings table:', error);
            return;
        }
        console.log('Bookings table created or already exists.');
    });
});

exports.databaseConnection = mysqlconnection;
