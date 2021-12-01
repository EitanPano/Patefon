<template>
  <section class="main-layout">
    <h1>Station view</h1>
    <station-song-list :songs="station.songs" v-if="station" />
  </section>
</template>

<script>
import stationSongList from "../components/station-song-list.vue";
import { stationService } from "../services/station.service.js";
export default {
  components: {
    stationSongList,
  },
  data() {
    return {
      station: null,
    };
  },

  watch: {
    "$route.params.id": {
      async handler() {
        try {
          const id = this.$route.params.id;
          const station = await stationService.getById(id);
          console.log(station);
          this.station = station;
        } catch (err) {
          console.log(err);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>