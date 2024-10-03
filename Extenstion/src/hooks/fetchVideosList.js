import axios from 'axios';

export const fetchVideosList = async (playlistId) => {
    console.log('vidlist');
    // const API_KEY = process.env.YOUTUBE_DATA_API;
    const API_KEY = "jhbsdfvjhbjksbdfvjhbsjkdfvhbsdfv"; // this is random api text
    console.log(API_KEY);
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`;

    try {
        const response = await axios.get(url);
        console.log("response", response);
        const videoIds = response.data.items.map(item => item.snippet.resourceId.videoId);
        const playlistTitle = response.data.items[0].snippet.title;
        return { videoIds, playlistTitle }
    } catch (e) {
        console.log("Error fetching videos ", e);
        return null;
    }
}