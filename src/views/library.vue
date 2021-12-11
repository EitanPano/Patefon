<template>
  <section class="main-layout layout-padding">
    <h1 class="full highlight">Playlists</h1>
    <div class="grid-container full">
      <aside @click="goLikedSongs" class="btn-liked-songs">
        <!-- <p v-for="song in likedSongs.slice(0, 4)" :key="song.id">
          <span class="inline">&nbsp;•{{ song.title }}&nbsp;• </span>
        </p> -->
        <p class="ease-bold">{{ likedSongsForPreview }}</p>
        <h2>Liked Songs</h2>
        <p v-if="likedSongs">
          <span>{{ likedSongs.length }}</span> liked songs
        </p>
      </aside>
      <template v-for="station in userStations">
        <station-preview :station="station" :key="station._id" />
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
      let idsArr = createdIds.concat(likedIds);
      let stationsArr = idsArr.map(async function (id) {
        try {
          let station = await stationService.getById(id);
          return station;
        } catch (err) {
          console.log(err);
        }
      });
      return stationsArr;
    },
  },
  computed: {
    stations() {
      return this.$store.getters.getStations;
    },
    userStations() {
      let stations = this.$store.getters.getStations;
      let filteredCreatedStations = stations.filter((station) => {
        return station.createdBy.userId === this.$store.getters.loggedUser._id;
      });
      let filteredLikedStations =
        this.$store.getters.loggedUser.likedStations.map((id) => {
          let filteredStations = stations.filter(
            (station) => station._id === id
          );
          return filteredStations[0];
        });
      let stationsForPreview = filteredCreatedStations.concat(
        filteredLikedStations
      );
      return stationsForPreview;
    },
    likedSongs() {
      return this.$store.getters.likedSongs;
    },
    likedSongsForPreview() {
      let songs = this.$store.getters.likedSongs.slice(0, 5);
      let titles = songs.map((song) => song.title);
      if (titles.join("•").length > 150) {
        titles = titles.join("•").slice(0, 150) + "...";
        return titles;
      }
      return titles.join("•") + "...";
    },
  },
  components: {
    stationPreview,
    stationService,
  },
};
</script>

<style>
.inline {
  display: inline-block;
}
.ease-bold {
  color: rgba(181, 207, 182, 0.842);
  font-weight: bold;
  font-size: 0.9em;
}
</style>