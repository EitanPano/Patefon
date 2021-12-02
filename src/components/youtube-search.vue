<template>
    <section class="youtube-search">
    <input type="text" v-model="searchInput"/> 
    <button @click="searchYoutube" > Search </button>
    <search-list :youtubeItems="youtubeItems.items" @addSong="addSong"/>
 
    </section>
</template>

<script>
import {fetchService} from '../services/fetch.service.js'
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
                let youtubeItems = await fetchService.fetchYoutubeVideos(this.searchInput);
                let prmDurations = [];
                for (var i = 0; i <5; i++ ) {
                    const prm = fetchService.fetchYoutubeDuration(youtubeItems.items[i].id.videoId)
                    prmDurations.push(prm);
                }
                //    console.log(prmDurations)
                Promise.all(prmDurations).then(durations => {
                    for (var i = 0; i<durations.length; i++) {
                        youtubeItems.items[i].duration = durations[i];
                    }    
                    this.youtubeItems = youtubeItems;
                    // console.log(this.youtubeItems)
                })
                 
            
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

