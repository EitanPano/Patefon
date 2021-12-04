<template>
  <section class="main-layout home-page">
    <h1>Search View</h1>
    <div class="songs-preview-search">
      <h1>Songs</h1>
      <song-list :songs="songs" @songToPlayer="songToPlayer" />
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
  created() {
    // eventBusService.$on("getStations", (stations) => {
    //   this.stations = stations;
    // });
  },
  methods: {
         songToPlayer(song,idx) {
             this.$store.commit({type:'songToPlayer', song,idx,station:{songs :JSON.parse(JSON.stringify(this.songs))}})
        }
  },
  computed: {
    stations() {
      // console.log(this.$store.getters.getStations);
      return this.$store.getters.getExpandedStations.stations;
    },
    songs() {
      // console.log(this.$store.getters.getStations.songs);
      return this.$store.getters.getExpandedStations.songs;
    },
    relatedSongs() {
      //   return this.$store.getters.getStations.relatedSongs;
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
