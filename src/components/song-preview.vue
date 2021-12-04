<template>
  <!-- @mouseleave="isHover = false" @mouseover="isHover = true" -->
  <article class="song-preview" @click="playSong">
    <iframe
      width="100"
      height="100"
      :src="`https://www.youtube.com/embed/${song.youtubeId}`"
    ></iframe>
    <div class="song-details">
      <button v-if="isHover">▶</button>
      <p v-else class="song-idx">{{ idx + 1 }}</p>
      <img :src="song.imgUrl" />
      <p class="song-title">{{ song.title }}</p>
    </div>
    <div class="song-actions">
      <button v-if="isHover" class="btn btn-like" @click="saveSong">❤</button>
      <p>{{ song.duration }}</p>
      <button
        @click="removeSong(song.id)"
        v-if="isHover"
        class="btn btn-delete"
      >
        ✖
      </button>
    </div>
  </article>
</template>

<script>
export default {
  props: ["song", "idx", "isSearch"],
  data() {
    return {
      isHover: true,
      isClickedOnce: false,
    };
  },
  created() {},
  methods: {
    playSong() {
      //אני יודע שזה עוד רחוק אבל אני צריך את הפונקצייה כרגע ובעתיד גם ככה תיהיה
      if (this.isSearch && !this.isClickedOnce) {
        this.$store.commit({ type: "setSearchHistory", song: this.song });
        this.isClickedOnce = true;
      }
    },
    saveSong() {
      this.$store.dispatch({
        type: "saveSong",
        action: { song: this.song, type: "like" },
      });
    },
    removeSong(songId) {
      if (confirm("Remove Song?")) this.$emit("removeSong", songId);
    },
  },
  computed: {},
};
</script>

<style>
</style>

