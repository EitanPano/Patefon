<template>
  <section class="search-preview">
    <iframe width="100" height="100" :src="`https://www.youtube.com/embed/${youtubeItem.id.videoId}`" ></iframe>
    <img :src="youtubeItem.snippet.thumbnails.default.url" />
    <div>{{ youtubeItem.snippet.title }}</div>
    <button @click="addSong(youtubeItem)">ADD</button>
  </section>
</template>

<script>
export default {
  props: ["youtubeItem"],
  data() {
    return {};
  },
  created() {},
  methods: {
    addSong(youtubeItem) {
      const song = {title:youtubeItem.snippet.title, videoId:youtubeItem.id.videoId, img:youtubeItem.snippet.thumbnails.default.url}
      this.$emit('addSong', song)
    },
  },
  computed: {},
};
</script>

<style>
</style>

