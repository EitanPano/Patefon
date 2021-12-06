<template>
  <article
    @click="enterGenre"
    class="genre-preview"
    :style="{ 'background-color': color }"
  >
    <!-- class="genre-preview" -->
    <h2 class="highlight">{{ genre }}</h2>
    <img :src="imgUrl" alt="">
  </article>
</template>

<script>
export default {
  props: ["genre", "imgUrl"],
  data() {
    return {
      isHover: false,
      colors: [
        "#58ad6f",
        "#233469",
        "#a475bf",
        "#e81c6a",
        "#578596",
        "#d3eb7f",
        "#bf39a0",
        "#613c58",
        "#5795ab",
        "#5c3656",
        "#36942f",
        "#e03636",
        "#ffd152",
      ],
    };
  },
  methods: {
    enterGenre() {
      this.$router.push(`/genre/${this.genre}`);
    },
  },
  computed: {
    color() {
      var randNum = Math.floor(Math.random() * this.colors.length);
      return this.colors[randNum];
    },
  },
};
</script>