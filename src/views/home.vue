<template>
  <section class="main-layout layout-padding home-page">
    <div class="bg-animator"></div>
    <h1 class="highlight">Good Afternoon</h1>
    <div class="most-liked-station-container">
      <ul
        class="most-liked-station-list"
        v-if="mostLikedStations && mostLikedStations.length"
      >
        <li v-for="station in mostLikedStations" :key="station._id">
          <most-liked-preview
            :station="station"
          />
        </li>
      </ul>
    </div>
    <div
      class="station-list-container"
      v-for="(stations, genre) in stationsByGenre"
      :key="genre"
    >
      <div class="flex space-between">
        <h2 class="title mb-0">{{ genre }}</h2>
        <button class="btn-blend bold mt-1" @click="goToGenrePage(genre)">
          SEE ALL
        </button>
      </div>
      <station-list v-if="stationsByGenre" :stations="stations.slice(0, 8)" />
    </div>
  </section>
</template>

<script>
import { stationService } from "../services/station.service.js";
import stationList from "../components/station-list.vue";
import { socketService } from "../services/socket.service";
import mostLikedPreview from "../components/most-liked-preview.vue";
export default {
  name: "Home",
  components: {
    stationList,
    mostLikedPreview,
  },
  created() {
    // this.setGuestUser();
    // this.$store.commit({type:'setInitalStation'});
  },
  data() {
    return {
      stations: [],
      genre: "",
    };
  },
  methods: {
    findMostLikedStations(arr) {
      let mostLikedStations = [];
      while (mostLikedStations.length != 6) {
        const max = arr.reduce(function (prev, current) {
          return prev.likesCounter > current.likesCounter ? prev : current;
        }); //returns object
        let idx = arr.findIndex((val) => val === max);
        arr.splice(idx, 1);
        mostLikedStations.push(max);
      }
      return mostLikedStations;
    },
         goToGenrePage(genre) {
            this.$router.push(`/genre/${genre}`);
        },
  },
    computed: {
        stationsByGenre() {
            return this.$store.getters.stationsByGenre;
        },
    mostLikedStations() {
      let mostLikedStations = this.findMostLikedStations(
        this.$store.getters.getStations
      );
      console.log(mostLikedStations);
      return mostLikedStations;
    },
  },
};
</script>
