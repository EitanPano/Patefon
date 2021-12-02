<template>
  <section class="song-preview">
    <iframe width="100" height="100" :src=" `https://www.youtube.com/embed/${song.youtubeId}`"></iframe>
    <div>{{ song.title }}</div>
    <img :src="song.imgUrl">
    <div> {{song.duration}} </div>
    <button @click="removeSong(song.id)"> Remove </button>

  </section>
</template>

<script>
export default {
  props: ["song"],
  data() {
    return {};
  },
  created() {
    
  },
  methods: {
    removeSong (songId) {
      if (confirm('Remove Song?')) this.$emit('removeSong', songId)
    }
  },
  computed: {},
};
</script>

<style>
</style>

