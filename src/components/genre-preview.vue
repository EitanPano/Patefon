<template>
  <article @click="enterGenre">
    <p>{{ genre }}</p>
  </article>
</template>

<script>
export default {
  props: ["genre"],
  data() {
    return {
      isHover: false,
    };
  },
  methods: {
    enterGenre() {
      this.$router.push(`/genre/${this.genre}`);
    },
  },
};
</script>