<template>
  <section class="station-song-list">
    <ul>
      <li v-for="song in songs" :key="song._id">
        <station-song-preview :song="song" @remove="remove" @update="update" />
      </li>
    </ul>
  </section>
</template>

<script>
import stationSongPreview from "./station-song-preview.vue";
export default {
  components: {
    stationSongPreview,
  },
  props: ["songs"],
  data() {
    return {
      
    };
  },

  created() {},

  methods: {
    remove(songId) {
      this.$emit("remove", songId);
    },
    update(song) {
      this.$emit("update", song);
    },
  },
  computed: {},
};
</script>

<style>
</style>