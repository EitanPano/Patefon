<template>
  <section class="song-list">
    <ul>
      <li v-for="song in songs" :key="song._id">
        <song-preview :song="song" @removeSong="removeSong" />
      </li>
    </ul>
  </section>
</template>

<script>
import songPreview from "./song-preview.vue";
export default {
  components: {
    songPreview,
  },
  props: ["songs"],
  data() {
    return {
      
    };
  },

  created() {},

  methods: {
    removeSong(songId) {
      this.$emit("removeSong", songId);
    },
  },
  computed: {},
};
</script>

<style>
</style>