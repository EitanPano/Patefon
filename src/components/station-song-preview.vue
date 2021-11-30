<template>
  <section class="station-song-preview">
    <p>{{ song.title }}</p>
    <img :src="song.imgUrl">
    <iframe width="300" height="300" :src=" `https://www.youtube.com/embed/${song.url}`"></iframe>
  </section>
</template>

<script>
export default {
  props: ["song"],
  data() {
    return {};
  },
  created() {},
  methods: {

  },
  computed: {

  },
};
</script>

<style>
</style>

