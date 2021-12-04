<template>
    <article class="song-preview" @mouseleave="isHover = false" @mouseover="isHover = true">
          <button v-if="isHover" @click="songToPlayer(song,idx)" class="size-btn first">▶</button>
          <p v-else class="first song-idx">{{ idx + 1 }}</p>
        <div class="song-details">
          <img :src="song.imgUrl" />
          <p class="song-title">{{ song.title }}</p>
        </div>
        <div class="last song-actions">
          <button class="btn btn-like">❤</button>
          <p>{{ song.duration }}</p>
          <button @click="removeSong(song.id)" v-if="isHover && !isLikedStation" class="btn btn-delete">✖</button>
        </div>
    </article>
</template>

<script>
export default {
    props: ["song", "idx","isSearch"],
    data() {
        return {
          isHover: false,
          isClickedOnce: false,
        };
    },
    created() {},
    methods: {
        removeSong (songId) {
            if (confirm('Remove Song?')) this.$emit('removeSong', songId)
        },
        songToPlayer(song,idx) {
          this.$emit('songToPlayer', song,idx)
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
    }
        
    },
    computed: {
        isLikedStation() {
            return this.$store.getters.isLikedStation;
        }
    },
  }
 
</script>

<style>
</style>

