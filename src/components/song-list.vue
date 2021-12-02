<template>
  <section class="song-list">
    <ul>
      <li v-for="song in songs" :key="song._id">
        <song-preview
          :song="song"
          @remove="remove"
          @update="update"
          :isSearh="isSearch"
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