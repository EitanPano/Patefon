<template>
    <!-- @mouseleave="isHover = false" @mouseover="isHover = true" -->
    <article class="song-preview">
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
        }
    },
    computed: {
    },
}
</script>

<style>
</style>

