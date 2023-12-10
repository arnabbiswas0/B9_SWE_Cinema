import MovieProxy from '../MovieProxy';

export default class MovieHandler {
    async createMovie(movieData) {
        // controller interacts with proxy first to check link usability
        const movieProxy = new MovieProxy()
        const availability = await movieProxy.createNewMovie(movieData); 
        if (availability === "unavailable") {//---------------------------debugging purposes
            console.log("unavailable from hanlder class!")
        } /*else if (availability === 'invalidSchedule') {
            console.log("(MovieHandler) movie schedule invalid!");
            alert("Cannot have two movies with same date and time!");
        }*/
        return availability;
    }
}