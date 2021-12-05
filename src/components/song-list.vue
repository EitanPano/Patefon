<template>
  <section class="song-list">
    <div class="actions">
      <button class="btn btn-play" @click="songToPlayer">
        <span class="material-icons">play_arrow</span>
      </button>
    </div>
    <div class="sort-bar" v-if="!isSearch">
      <p>#</p>
      <p>TITLE</p>
      <p>DATE ADDED</p>
      <p class="last"><img src="@/assets/icons/time.svg" alt="" /></p>
    </div>
    <ul>
      <li v-for="(song, idx) in songs" :key="song._id">
        <song-preview
          :song="song"
          :idx="idx"
          @removeSong="removeSong"
          @songToPlayer="songToPlayer"
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
  created() {
    console.log("is search from song list", this.isSearch);
  },
  methods: {
    removeSong(songId) {
      this.$emit("removeSong", songId);
    },
    songToPlayer(song, idx) {
      this.$emit("songToPlayer", song, idx);
    },
  },
  computed: {},
};
</script>

<style>
</style>