const mongoose = require("mongoose")

const movieSchema = mongoose.Schema({
    title: String, // String is shorthand for {type: String}
    rating: String,
    price: String,
    poster: String,
    trailer: String,
    playing: {type: Boolean},
  });

module.exports = mongoose.model("posts", movieSchema);


