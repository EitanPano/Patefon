<template>
    <section class="main-layout">
    <h1>Edit View</h1>
    <button> Save </button>
    <song-list />
    <youtube-search @addSong="addSong"/>

    </section>
</template>

<script>
import SongList from '../components/song-list.vue';
import youtubeSearch from '../components/youtube-search.vue';
import { stationService } from '../services/station.service';
export default {
    components: {
        youtubeSearch,
        SongList
    },
    data() {
        return {
            emptyStation : null,
        }
    },
       created() {
        this.emptyStation = stationService.getEmptystation();
    },
    methods : {
        addSong(song) {
            // console.log(song)
            // this.emptyStation.songs.push(song)
        }
    }
}
</script>

<style>

</style>