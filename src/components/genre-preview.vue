<template>
  <article
    @click="enterGenre"
    class="genre-preview"
    :style="{ 'background-color': color }"
  >
    <!-- class="genre-preview" -->
    <p>{{ genre }}</p>
  </article>
</template>

<script>
export default {
  props: ["genre"],
  data() {
    return {
      isHover: false,
      colors: [
        "rgb(255, 175, 175)",
        "rgb(251, 255, 226)",
        "rgb(255, 235, 204)",
        "rgb(255, 153, 153)",
        "rgb(34, 87, 126)",
        "rgb(85, 132, 172)",
        "rgb(149, 209, 204)",
        "rgb(246, 242, 212)",
        "rgb(245, 136, 64)",
        "rgb(184, 82, 82)",
        "rgb(234, 222, 222)",
        "rgb(185, 131, 255)",
        "rgb(153, 254, 255)",
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