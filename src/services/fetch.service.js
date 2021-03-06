// import Axios from 'axios'; var axios = Axios.create({ withCredentials: true, });
import Axios from 'axios'; var axios = Axios.create();

export const fetchService = {
    fetchYoutubeVideos,
    fetchYoutubeDuration
};


async function fetchYoutubeVideos(input) {
        try {
            const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&type=video&q=${input}&key=AIzaSyAKwr9TBCz-rA1NOUbslW5YHmLYG2IZXpg`);
            return res.data;
      }
        catch(err) {
            console.log(err)
            throw err;
        }
}

async function fetchYoutubeDuration(input) {
    try {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${input}&part=contentDetails&key=AIzaSyAKwr9TBCz-rA1NOUbslW5YHmLYG2IZXpg`);
         const duration = res.data.items[0].contentDetails.duration;
            const idxMin = duration.indexOf('M');
            const idxSec = duration.indexOf('S');
            const min = duration.slice(2,idxMin);
            const sec = duration.slice(idxMin+1,idxSec);
            const computedDuration = ((min.length === 1)?'0'+min:min) + ':' + ((sec.length === 1)?'0'+sec:sec);
          this.durationSearch  = computedDuration;
          return computedDuration;
  }
    catch(err) {
        console.log(err)
        throw err;
    }
}









