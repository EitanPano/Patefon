<template>
  <section class="main-layout layout-padding">
    <h1 class="full highlight">Playlists</h1>
    <div class="grid-container full">
      <aside @click="goLikedSongs" class="btn-liked-songs">
        <p>Lorem ipsum dolor sit amet consectetur</p>
        <h2>Liked Songs</h2>
        <p>
          <span>{{ likedSongsCount }}</span> liked songs
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
    likedSongsCount() {
      return this.$store.getters.getLikedSongs.length;
    },
  },
  components: {
    stationPreview,
  },
};
</script>

<style>
</style>