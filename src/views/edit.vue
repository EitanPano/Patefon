<template>
    <section class="main-layout">
        <section class="edit-page">
            
    <select @change="addTag" v-model="tag"> 
        <option value="cool">Cool</option>
        <option value="chill">Chill</option>
        <option value="happy">Happy</option>
        <option value="broadcast">Broadcast</option>
        <option value="sad">Sad</option>
    </select>

     <select v-model="emptyStation.genre"> 
        <option value="hiphop">Hip Hop</option>
        <option value="rock">Rock</option>
        <option value="pop">Pop</option>
        <option value="classic">Classic</option>
        <option value="jazz">Jazz</option>
    </select>


    <img-upload @imageSaved="saveImageUrl"/>

    <label> Name
    <input type="text" v-model="emptyStation.name">
    </label>

    <textarea v-model="emptyStation.description" />

    <button @click="saveStation"> Save </button>
    <song-list :songs="emptyStation.songs" />
    <youtube-search @addSong="addSong"/>

    </section>
    </section>
</template>

<script>
import SongList from '../components/song-list.vue';
import youtubeSearch from '../components/youtube-search.vue';
import { stationService } from '../services/station.service';
import imgUpload from '../components/img-upload.vue';
export default {
    components: {
        youtubeSearch,
        SongList,
        imgUpload
    },
    data() {
        return {
            emptyStation : null,
            tag : '',
          
        }
    },
       created() {
        this.emptyStation = stationService.getEmptystation();
    },
    methods : {
        addSong(song) {
            // console.log(song)
            song.isLiked = false;
            this.emptyStation.songs.push(song)
        },
        addTag() {
            this.emptyStation.tags.push(this.tag);
            this.tag = '';
        },
        saveImageUrl(imgUrl) {
            this.emptyStation.imgUrl = imgUrl;
        },
           async saveStation() {
               this.emptyStation.createdBy = JSON.parse(sessionStorage.getItem('loggedInUser'))
            try {
                await this.$store.dispatch({type:'addStation',newStation: this.emptyStation})
                this.emptyStation = stationService.getEmptystation();
                this.$router.push('/');
            }
          catch (err) {
              console.log(err);
          }
        },
    }
}
</script>

<style>

</style>
