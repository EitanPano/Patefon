<template>
    <section class="player-bar">
        <!-- <iframe v-if="showCurrSong" width="500" height="40" :src="`https://www.youtube.com/embed/${showCurrSong.youtubeId}?autoplay=1`"></iframe> -->
        <youtube-vue :playListData="{station:currStation , song: currSong, idx:currSongIdx }"/>
    </section>
</template>

<script>
import youtubeVue from "../components/youtubeVue.vue";
export default {
    components: {
        youtubeVue,
    },
    data () {
        return {

        }
    },
    computed : {

    currStation() {
      return this.$store.getters.currStationForPlayer;
    },
    currSong () {
        return this.$store.getters.currSong;
    },
    currSongIdx () {
      return this.$store.getters.currSongIdx;
  },
    
    }
}
</script>

<style>

</style>