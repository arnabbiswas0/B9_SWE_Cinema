import axios from 'axios';

export default class MovieProxy {
    // validate YouTube URL format before extracting ID
    validateYouTubeVideoUrl(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[1].length == 11); 
    }
    // extract the ID from the YouTube URL
    async extractVideoId(trailer) {
        const index_start = trailer.indexOf("=");
        const index_end = trailer.indexOf("&")
        console.log(trailer);
        return trailer.substring(index_start+1, index_end);
    }
    // call YouTube API to valid YouTube video via it's ID
    async validYouTubeVideo(videoId) {
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
            console.log('Error: Invalid YouTube URL!')
            return 'unavailable';
        } 
        // send POST request to back-end to create new Movie (domain class) w/ valid trailer
         const response = await axios.post('http://localhost:8080/api/movies', movieData);
        console.log(response.data);
        return response.data;
    }
}