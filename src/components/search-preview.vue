<template>
  <section class="search-preview">
    <iframe width="100" height="100" :src="`https://www.youtube.com/embed/${youtubeItem.id.videoId}`" ></iframe>
    <img :src="youtubeItem.snippet.thumbnails.default.url" />
    <div>{{ youtubeItem.snippet.title }}</div>
    <div v-if="durationSearch"> {{durationSearch}} </div>
    <button @click="addSong(youtubeItem)">ADD</button>
  </section>
</template>

<script>
import Axios from 'axios'; var axios = Axios.create();
export default {
  props: ["youtubeItem"],
  data() {
    return {
      durationSearch : ''
    };
  },
  mounted() {
  },
  methods: {
    async addSong(youtubeItem) {
      try{
    const duration = await this.searchYoutubeDuration(youtubeItem);
       const song = {id:youtubeItem.id.videoId,youtubeId:youtubeItem.id.videoId,title:youtubeItem.snippet.title, imgUrl:youtubeItem.snippet.thumbnails.default.url,duration : duration}
      this.$emit('addSong', song)
      }
 catch(err) {
   console.log(err);
 }
   
    },
        async searchYoutubeDuration(youtubeItem) {
           try {
               const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${youtubeItem.id.videoId}&part=contentDetails&key=AIzaSyAomDP_lSwHk85kO2WgJnTRrKAlQ_jTxKM`);
                 const duration = res.data.items[0].contentDetails.duration;
                 const computedDuration = duration.charAt(2) + ':' + duration.charAt(4)+ duration.charAt(5);
                 this.durationSearch  = computedDuration;
                 return computedDuration;
         }
           catch(err) {
               console.log(err)
           }
        },
  },
  computed: {},
};
</script>

<style>
</style>
  
