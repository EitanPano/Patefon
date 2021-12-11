<template>
  <section class="main-layout layout-padding">
    <h1 class="full highlight">Playlists</h1>
    <div class="grid-container full">
      <aside @click="goLikedSongs" class="btn-liked-songs">
        <p>Lorem ipsum dolor sit amet consectetur</p>
        <h2>Liked Songs</h2>
        <p v-if="likedSongs">
          <span>{{ likedSongs.length }}</span> liked songs
        </p>
      </aside>
      <template v-for="station in userStations">
        <station-preview :station="station[0]" :key="station._id" />
      </template>
      <!-- <pre>{{ userStations }}</pre> -->
    </div>
  </section>
</template>

<script>
import stationPreview from "@/components/station-preview.vue";
import { stationService } from "../services/station.service.js";
export default {
  created() {
    this.$store.dispatch({
      type: "loadStations",
      filterBy: { isLiked: false },
    });
  },
  methods: {
    goLikedSongs() {
      this.$router.push("station/liked");
    },
    convertIdsToStations(likedIds, createdIds) {
      console.log("hello");
      let idsArr = createdIds.concat(likedIds);
      let stationsArr = idsArr.map(async function (id) {
        try {
          let station = await stationService.getById(id);
          return station;
        } catch (err) {
          console.log();
        }
      });
      console.log(stationsArr);
      return stationsArr;
    },
  },
  computed: {
    stations() {
      return this.$store.getters.getStations;
    },
    userStations() {
      // let likedStationsIds = this.$store.getters.likedStations;
      // let createdStationsIds = this.$store.getters.createdStations;
      // console.log(likedStationsIds);
      // console.log(createdStationsIds);
      // var stationsArr = this.convertIdsToStations(
      //   likedStationsIds,
      //   createdStationsIds
      // );
      // return stationsArr;
      let stations = this.$store.getters.getStations;
      let filteredCreatedStations = stations.filter((station) => {
        // console.log(station.createdBy.userId);
        // console.log(this.$store.getters.loggedUser._id);
        return station.createdBy.userId === this.$store.getters.loggedUser._id;
      });

      let filteredLikedStations =
        this.$store.getters.loggedUser.likedStations.map((id) => {
          let filteredStations = stations.filter(
            (station) => station._id === id
          );
          return filteredStations;
        });
      let stationsForPreview = filteredCreatedStations.concat(
        filteredLikedStations
      );
      return stationsForPreview;
    },
    likedSongs() {
      // console.log(this.$store.getters.likedSongs);
      return this.$store.getters.likedSongs;
    },
  },
  components: {
    stationPreview,
    stationService,
  },
};
</script>

<style>
</style>