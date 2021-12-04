<template>
    <!-- @mouseleave="isHover = false" @mouseover="isHover = true" -->
    <article class="song-preview" @mouseleave="isHover = false" @mouseover="isHover = true">
        <!-- <iframe
            width="100"
            height="100"
            :src="`https://www.youtube.com/embed/${song.youtubeId}`"
        ></iframe> -->
          <button v-if="isHover" class="size-btn first">▶</button>
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
    props: ["song", "idx"],
    data() {
        return {
          isHover: false
        };
    },
    created() {},
    methods: {
        removeSong (songId) {
            if (confirm('Remove Song?')) this.$emit('removeSong', songId)
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

