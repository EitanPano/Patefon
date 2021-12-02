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
          <button v-if="isHover" class="btn btn-delete">✖</button>
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
    methods: {},
    computed: {},
};
</script>

<style>
</style>

