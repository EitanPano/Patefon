<template>
  <section class="song-preview">
    <iframe
      width="100"
      height="100"
      :src="`https://www.youtube.com/embed/${song.url}`"
    ></iframe>
    <div>{{ song.title }}</div>
    <img :src="song.imgUrl" />
    <button>Delete</button>
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

