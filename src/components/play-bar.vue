<template>
  <section class="player-bar">
    <!-- <iframe v-if="showCurrSong" width="500" height="40" :src="`https://www.youtube.com/embed/${showCurrSong.youtubeId}?autoplay=1`"></iframe> -->
    <youtube-vue
      :playListData="{ station: currStation, song: currSong, idx: currSongIdx }"
      @likeSong="updateUser"
    />
  </section>
</template>

<script>
import youtubeVue from "../components/youtubeVue.vue";
export default {
  components: {
    youtubeVue,
  },
  data() {
    return {};
  },
  methods: {
    updateUser(action) {
      this.$store.dispatch({
        type: "updateUser",
        action,
      });
    },
  },
  computed: {
    currStation() {
      return this.$store.getters.currStationForPlayer;
    },
    currSong() {
      return this.$store.getters.currSong;
    },
    currSongIdx() {
      return this.$store.getters.currSongIdx;
    },
  },
};
</script>

<style>
</style>