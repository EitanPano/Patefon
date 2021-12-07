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
      <template v-for="station in stations">
        <station-preview :station="station" :key="station._id" />
      </template>
    </div>
  </section>
</template>

<script>
import stationPreview from "@/components/station-preview.vue";
export default {
  methods: {
    goLikedSongs() {
      this.$router.push("station/liked");
    },
  },
  created() {
    this.$store.dispatch({
      type: "loadStations",
      filterBy: { isLiked: false },
    });
  },
  computed: {
    stations() {
      return this.$store.getters.getStations;
    },
    likedSongs() {
      // console.log(this.$store.getters.likedSongs);
      return this.$store.getters.likedSongs;
    },
  },
  components: {
    stationPreview,
  },
};
</script>

<style>
</style>