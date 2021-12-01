<template>
    <section class="youtube-search">
    <h1>Edit View</h1>

    <input type="text" v-model="searchInput"/> 
    <button @click="searchYoutube" > Search </button>
    <search-list :youtubeItems="youtubeItems.items" @addSong="addSong"/>
 
    </section>
</template>

<script>
// import Axios from 'axios'; var axios = Axios.create({ withCredentials: true, });
import Axios from 'axios'; var axios = Axios.create();
import searchList from './search-list.vue';
export default {
    components : {
        searchList,
    },
    data() {
        return {
           youtubeItems : [],
           searchInput : ''
        }
    },
    methods : {
       async searchYoutube() {
           try {
               const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${this.searchInput}&key=AIzaSyAomDP_lSwHk85kO2WgJnTRrKAlQ_jTxKM`);
                // console.log(res.data);
                this.youtubeItems = res.data;
         }
           catch(err) {
               console.log(err)
           }
        },
         addSong (song) {
   this.$emit('addSong', song)
 }
    }
}
</script>

<style>

</style>