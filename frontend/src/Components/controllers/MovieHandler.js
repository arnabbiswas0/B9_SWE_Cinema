import MovieProxy from '../MovieProxy';

export default class MovieHandler {
    async createMovie(movieData) {
        // controller interacts with proxy first to check link usability
        const movieProxy = new MovieProxy()
        const availability = await movieProxy.createNewMovie(movieData); 
        if (availability === "unavailable") {
            console.log("unavailable from hanlder class!")
        }
        return availability;
    }
}