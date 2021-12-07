<template>
  <section class="search main-layout layout-padding">
    <div class="songs-preview-search" v-if="songs">
      <h1 class="highlight">Songs</h1>
      <song-list
        :songs="songs"
        :isSearch="true"
        @songToPlayer="songToPlayer"
        @likeSong="updateUser"
        @saveToHistory="updateUser"
      />
    </div>

    <div class="no-result-msg" v-if="!songs && filterBy">
      <h1>No Result for "{{ filterBy }}"</h1>
    </div>

    <div
      class="search-history-preview"
      v-if="
        searchHistory &&
        searchHistory.length &&
        !stations &&
        !songs &&
        !filterBy
      "
    >
      <h2 class="highlight">Recently Searched</h2>
      <song-list
        :songs="searchHistory"
        @songToPlayer="songToPlayerHistory"
        :isSearch="true"
        @likeSong="updateUser"
      />
    </div>

    <div class="stations-preview-search" v-if="stations">
      <h2 class="highlight">Appears In</h2>
      <ul class="grid-container">
        <li v-for="station in stations" :key="station._id">
          <station-preview class="station-card" :station="station" />
        </li>
      </ul>
    </div>

    <div v-if="!stations && !songs">
      <h2 class="highlight">Browse By Genres</h2>
      <ul class="genre-container">
        <li
          class="genre-list"
          v-for="(value, genre, idx) in stationsByGenre"
          :key="idx"
        >
          <genre-preview :genre="genre" :imgUrl="value[0].imgUrl" />
        </li>
      </ul>
    </div>
    <div>
      <router-view></router-view>
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
      // console.log("getters", this.$store.getters.searchHistory);
      // console.log(this.$store.getters.searchHistory);
      return this.$store.getters.searchHistory;
      // return this.$store.getters.getSearchHistory;
    },
    stationsByGenre() {
      return this.$store.getters.stationsByGenre;
      // return Object.values(this.$store.getters.stationsByGenre);
    },
    isClicked() {
      return this.$store.getters.isClicked;
    },
    filterBy() {
      // console.log("filterBy.txt", this.$store.getters.filterBy.txt);
      return this.$store.getters.filterBy.txt;
    },
  },
  methods: {
    songToPlayerHistory(song, idx) {
      // console.log("song from player", song);
      this.$store.commit({
        type: "songToPlayer",
        song,
        idx,
        station: {
          songs: JSON.parse(JSON.stringify(Array.from(this.searchHistory))),
        },
      });
    },
    songToPlayer(song, idx) {
      // console.log("song from player", song);
      this.$store.commit({
        type: "songToPlayer",
        song,
        idx,
        station: {
          songs: JSON.parse(JSON.stringify(Array.from(this.songs))),
        },
      });
    },
    updateUser(action) {
      if (!this.isClicked && action.type === "history") {
        // console.log("history");
        this.$store.dispatch({
          type: "updateUser",
          action,
        });
        this.$store.commit({ type: "setClicked", boolState: true });
        return;
      }
      console.log("getting there anyway");
      this.$store.dispatch({
        type: "updateUser",
        action,
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
    // this.$store.commit({ type: "clearExpandedStations" });
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
