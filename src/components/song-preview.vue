<template>
  <section class="song-preview">
    <iframe width="100" height="100" :src=" `https://www.youtube.com/embed/${song.youtubeId}`"></iframe>
    <div>{{ song.title }}</div>
    <img :src="song.imgUrl">
    <div> {{song.duration}} </div>
    <button> Delete </button>

  </section>
</template>

<script>
export default {
  props: ["song"],
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
};
</script>

<style>
</style>

