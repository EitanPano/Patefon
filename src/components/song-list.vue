<template>
  <section class="song-list">
    <div class="actions">
      <button class="btn btn-play">▶</button>
    </div>
    <div class="sort-bar" v-if="!isSearch">
      <p>#</p>
      <p>TITLE</p>
      <p>DATE ADDED</p>
      <p>⏱</p>
    </div>
    <ul>
      <li v-for="(song, idx) in songs" :key="song._id">
        <song-preview
          :song="song"
          :idx="idx"
          @removeSong="removeSong"
          :isSearch="isSearch"
        />
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
  props: ["songs", "isSearch"],
  data() {
    return {};
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