export default class Movie {
    constructor(title, rating, price, poster, trailer, playing) {
        this.title = title
        this.rating = rating
        this.price = price
        this.poster = poster
        this.trailer = trailer
        this.playing = playing
    }

    // getters
    getTitle() {
        return this.title
    }
    getRating() {
        return this.rating
    }
    getPrice() {
        return this.price
    }
    getPoster() {
        return this.poster
    }
    getTrailer() {
        return this.trailer
    }
    getPlaying() {
        return this.playing
    }


}