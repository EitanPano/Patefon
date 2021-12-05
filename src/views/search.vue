<template>
  <section class="main-layout home-page">
    <div class="songs-preview-search" v-if="songs">
      <h1>Songs</h1>
      <song-list :songs="songs" :isSearch="true" @songToPlayer="songToPlayer" />
    </div>
    <div
      class="search-history-preview"
      v-if="searchHistory && searchHistory.length && !stations && !songs"
    >
      <h1>Recently Searched</h1>
      <song-list :songs="searchHistory" :isSearch="true" />
    </div>
    <div class="stations-preview-search" v-if="stations">
      <h1>Appears In</h1>
      <ul class="grid-container">
        <li v-for="station in stations" :key="station._id">
          <station-preview class="station-card" :station="station" />
        </li>
      </ul>
    </div>

    <div class="genres-preview-search" v-if="!stations && !songs">
      <h1>Browse By Genres</h1>
      <ul class="grid-container">
        <li v-for="(value, genre, idx) in stationsByGenre" :key="idx">
          <genre-preview :genre="genre" />
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
import genrePreview from "../components/genre-preview.vue";

export default {
  data() {
    return {
      stationsForPreview: [],
    };
  },
  created() {
    // console.log(this.searchHistory);
  },
  computed: {
    stations() {
      // console.log(this.$store.getters.getExpandedStations.stations, "stations");
      return this.$store.getters.getExpandedStations.stations;
    },
    songs() {
      // console.log(this.$store.getters.getExpandedStations.songs, "songs");
      return this.$store.getters.getExpandedStations.songs;
    },
    searchHistory() {
      // console.log('getters',this.$store.getters.searchHistory)
      return this.$store.getters.searchHistory;
      // return this.$store.getters.getSearchHistory;
    },
    stationsByGenre() {
      return this.$store.getters.stationsByGenre;
      // return Object.values(this.$store.getters.stationsByGenre);
    },
  },
  methods: {
    songToPlayer(song, idx) {
      this.$store.commit({
        type: "songToPlayer",
        song,
        idx,
        station: {
          songs: JSON.parse(JSON.stringify(Array.from(this.songs))),
        },
      });
    },
  },
  destroyed() {
    this.$store.commit({ type: "setClicked", boolState: false });
    this.$store.dispatch({
      type: "setFilter",
      filterBy: { txt: "" },
    });
    this.$store.commit({ type: "clearSearch" });
  },
  components: {
    eventBusService,
    songPreview,
    songList,
    stationPreview,
    genrePreview,
  },
};
</script>
