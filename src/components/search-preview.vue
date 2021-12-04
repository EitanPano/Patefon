<template>
  <section class="search-preview">
    <img :src="youtubeItem.snippet.thumbnails.default.url" />
    <div>{{ youtubeItem.snippet.title }}</div>
    <div>{{ youtubeItem.duration }}</div>
    <button @click="addSong(youtubeItem)">ADD</button>
  </section>
</template>

<script>

export default {
  props: ["youtubeItem"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    addSong(youtubeItem) {
      const song = {
        id: youtubeItem.id.videoId,
        youtubeId: youtubeItem.id.videoId,
        title: youtubeItem.snippet.title,
        imgUrl: youtubeItem.snippet.thumbnails.default.url,
        duration: youtubeItem.duration,
      };
      this.$emit("addSong", song);
    },
  },
  computed: {},
};
</script>

<style>
</style>
  
