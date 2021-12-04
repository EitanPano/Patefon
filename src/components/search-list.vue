<template>
  <section class="search-list">
    <ul>
      <li v-for="youtubeItem in youtubeItems" :key="youtubeItem.id.videoId">
        <search-preview :youtubeItem="youtubeItem" @addSong="addSong" />
      </li>
    </ul>
  </section>
</template>

<script>
import searchPreview from "./search-preview.vue";
export default {
  components: {
    searchPreview,
  },
  props: ["youtubeItems"],
  data() {
    return {};
  },

  created() {},

  methods: {
    addSong(song) {
      this.$emit("addSong", song);
    },
  },
  computed: {},
};
</script>

<style>
</style>