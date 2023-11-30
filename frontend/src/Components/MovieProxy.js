import axios from 'axios';

export default class MovieProxy {
    // validate YouTube URL format before extracting ID
    validateYouTubeVideoUrl(url) {
        //var regExp = /^.*(youtu.be\/|youtube.com\/v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;  
        var regExp = /^.*(youtu.be\/|youtube.com\/(v\/|u\/\w\/|embed\/|watch\?v=|\?v=|&v=))([^#&?]*).*/;
        var match = url.match(regExp);
        //console.log(match);
        //console.log(match && match[3].length === 11);     // also was [1].length
        //console.log((url !== "") && match && match[3].length === 11)
        return ((url !== "") && match && match[3].length === 11); 
    }
    // extract the ID from the YouTube URL
    async extractVideoId(trailer) {
        const index_start = trailer.indexOf("="); // "v="
        // extract end_of_token: IF (ends with "&") -> additional info provided ELSE -> ID is at end of link
        const index_end = trailer.indexOf("&") > -1 ? trailer.indexOf("&") : trailer.length;
        //console.log(trailer);
        console.log(index_start+1, index_end);
        return trailer.substring(index_start+1, index_end);
    }
    // call YouTube API to valid YouTube video via it's ID
    async validYouTubeVideo(videoId) {
        //console.log(videoId)
        try {
            const trailer_response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'snippet',
                    id: videoId,
                    key: 'AIzaSyDxqM4YKG5TTDViN09vfsD4qOV7g5NGG3c' 
                },
            });
            return trailer_response.data.items.length > 0;// if video exists YouTube API returns ONE ITEM
        } catch (error) {
            console.error('Error: ', error.message);
            return false;                                 // YOUTUBE API returns EMPTY LIST
        }
    }
    // validate scheduled movie (date_time): 2 movies cannot have same schedule!------------------------------------------------------------
    async validateSchedule(date_time) {
       // console.log("(schedule) date_time: " + date_time);
        const response = await axios.get(`http://localhost:8080/api/movies/${date_time}`);
        // return size of response ?
        console.log("retrieved data: " + "\ndata size: " + response.data.length);
        console.log(response);
        if (response.data.length > 0) {
            return 'invalidSchedule'
        }
        return 'validSchedule'
        //return 1;
    }

    // attempt to create Movie instance by validating URL
    async createNewMovie(movieData) {
        // check if YouTube URL format itself is valid:
        if (!this.validateYouTubeVideoUrl(movieData.trailer)) {
            console.log('Error: Invalid YouTube URL')
            return 'unavailable'; 
        }
        const video_id = await this.extractVideoId(movieData.trailer);  // extract the YouTube video ID
        const valid_video = await this.validYouTubeVideo(video_id);     // validate existence of YouTube video
        if(!valid_video) {
            console.log('Error: Invalid YouTube Video!')
            return 'unavailable';
        } 
        // before sending movie data to backend for db -> check if date and time is valid! 
        /* ASSUMMING ALL ATTRIBUTES ARE GIVEN
        * 1. extract date_time 
        * 2. compare this to any record with same date_time
        * 3. if another record not found -> createMovie Else -> output alert
        */
       //console.log("------------------" + movieData.date_time);
       const schedule = await this.validateSchedule(movieData.date_time);
       if (schedule === 'invalidSchedule') { // if schedule > 0? 
            console.log('Error: Invalid Movie Schedule (date&time)!');//------------------debugging purposes
            // alert("Error: Invalid Movie Schedule!");
            return schedule;//------------------------------------------------------------
       }

        // send POST request to back-end to create new Movie (domain class) w/ valid trailer
        console.log("after invalid schedule");
        const response = await axios.post('http://localhost:8080/api/movies', movieData);
        console.log(response.data);
        return response.data;
    }
}