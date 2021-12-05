<template>
  <section class="main-layout home-page">
    <div class="songs-preview-search" v-if="songs">
      <h1>Songs</h1>
      <song-list :songs="songs" :isSearch="true" @songToPlayer="songToPlayer" />
    </div>
    <div class="search-history-preview" v-if="searchHistory && searchHistory.length">
      <h1>Recently Searched</h1>
      <song-list :songs="searchHistory" :isSearch="true" />
    </div>
    <div class="stations-preview-search">
      <h1>Stations</h1>
      <ul class="grid-container">
        <li v-for="station in stations" :key="station._id">
          <station-preview class="station-card" :station="station" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { eventBusService } from "../services/event-bus.service.js";
import songPreview from "../components/song-preview.vue";
import songList from "../components/song-list.vue";
import stationPreview from "../components/station-preview.vue";

export default {
  data() {
    return {
      stationsForPreview: [],
    };
  },
  created() {},
  methods: {
    songToPlayer(song, idx) {
      this.$store.commit({
        type: "songToPlayer",
        song,
        idx,
        station: { songs: JSON.parse(JSON.stringify(Array.from(this.songs))) },
      });
    },
  },
  destroyed() {
    this.$store.commit({ type: "setClicked", boolState: false });
  },
  computed: {
    stations() {
      console.log(this.$store.getters.getExpandedStations.stations, "stations");
      return this.$store.getters.getExpandedStations.stations;
    },
    songs() {
      console.log(this.$store.getters.getExpandedStations.songs, "songs");
      return this.$store.getters.getExpandedStations.songs;
    },
    searchHistory() {
      return this.$store.getters.searchHistory;
      // return this.$store.getters.getSearchHistory;
    },
  },
  components: {
    eventBusService,
    songPreview,
    songList,
    stationPreview,
  },
};
</script>
