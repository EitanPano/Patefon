<template>
  <article class="song-preview" @mouseleave="isHover = false" @mouseover="isHover = true" >
    <button v-if="isHover" @click="songToPlayer(song, idx)" class="size-btn first play">▶</button>
    <p v-else class="first song-idx">{{ idx + 1 }}</p>
    <div class="song-details">
      <img :src="song.imgUrl" />
      <p class="song-title">{{ song.title }}</p>
    </div>
    <div class="last song-actions">
      <button
        v-if="user"
        class="btn btn-like"
        @click="likeSong"
        v-bind:class="{ liked: isLiked }"
      >
        ❤
      </button>
      <p>{{ song.duration }}</p>
      <button
        @click="removeSong(song.id)"
        v-if="isHover"
        class="btn btn-delete"
      >
        ✖
      </button>
    </div>
    <!-- && !isLikedStation -->
  </article>
</template>

<script>
export default {
  props: ["song", "idx", "isSearch"],
  data() {
    return {
      isHover: false,
    };
  },
  created() {},
  methods: {
    removeSong(songId) {
      if (confirm("Remove Song?")) this.$emit("removeSong", songId);
    },
    songToPlayer(song, idx) {
      this.$emit("songToPlayer", song, idx);
      console.log("isSearch", this.isSearch);
      console.log("isClicked", this.isClickedOnce);
      if (this.isSearch && !this.isClicked) {
        this.$store.dispatch({
          type: "likeSong",
          action: { song: this.song, type: "history" },
        });
        this.$store.commit({ type: "setClicked", boolState: true });
        
        //likeSong->>> BAD NAME FOR DYNAMIC FUNCTION //
        // this.isClickedOnce = true;
        // console.log("is clicked once?", this.isClickedOnce);
      }
    },
    likeSong() {
      this.$store.dispatch({
        type: "likeSong",
        action: { song: this.song, type: "like" },
      });
    },
    checkIfSongLiked(likedSongs) {
      var idx = likedSongs.findIndex(
        (likedSong) => likedSong.id === this.song.id
      );
      if (idx < 0) return false;
      return true;
    },
  },
  computed: {
    isLikedStation() {
      console.log(this.$store.getters.getLoggedinUser, "from song preview");
      return this.$store.getters.getLoggedinUser;
    },
    isLiked() {
      let likedSongs = this.$store.getters.getLikedSongs;
      return this.checkIfSongLiked(likedSongs);
    },
    isClicked() {
      return this.$store.getters.isClicked;
    },
    user() {
      return this.$store.getters.getLoggedUser;
    },
  },
};
</script>

<style>
</style>

