<template>
    <!-- @mouseleave="isHover = false" @mouseover="isHover = true" -->
    <article class="song-preview">
        <div class="song-details">
          <button v-if="isHover" @click="songToPlayer(song,idx)">▶</button>
          <p v-else class="song-idx">{{ idx + 1 }}</p>
          <img :src="song.imgUrl" />
          <p class="song-title">{{ song.title }}</p>
        </div>
        <div class="song-actions">
          <button v-if="isHover" class="btn btn-like">❤</button>
          <p>{{ song.duration }}</p>
          <button @click="removeSong(song.id)" v-if="isHover" class="btn btn-delete">✖</button>
        </div>
    </article>
</template>

<script>
export default {
    props: ["song", "idx"],
    data() {
        return {
          isHover: true
        };
    },
    created() {},
    methods: {
        removeSong (songId) {
            if (confirm('Remove Song?')) this.$emit('removeSong', songId)
        },
        songToPlayer(song,idx) {
          this.$emit('songToPlayer', song,idx)
        }
    },
    computed: {
    },
}
</script>

<style>
</style>

