// simple data holder representing a Movi
class Movie {
    constructor(movieData) {
        this.title = movieData.title;
        this.category = movieData.category;
        this.rating = movieData.rating;
        this.director = movieData.director;
        this.producer = movieData.producer;
        this.cast = movieData.cast;
        this.synopsis = movieData.synopsis;
        this.reviews = movieData.reviews;
        this.poster = movieData.poster;
        this.trailer = movieData.trailer;
    }
}
module.exports = Movie;