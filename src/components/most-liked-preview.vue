<template>
  <article
    @mouseleave="isHover = false"
    @mouseenter="isHover = true"
    @click="enterStation(station._id)"
    class="most-liked-preview"
  >
    <div class="flex justify-center align-center space-between">
      <p>{{ station.name }}</p>
      <img :src="station.imgUrl" />
      <transition name="fade">
        <button class="btn btn-play" v-if="isHover">
          <span class="material-icons">play_arrow</span>
        </button>
      </transition>
    </div>
  </article>
</template>

<script>
export default {
  props: ["station"],
  data() {
    return {
      isHover: false,
    };
  },
  methods: {
    enterStation(stationId) {
      this.$router.push("/station/" + stationId);
    },
  },
  computed: {},
};
</script>

<style>
</style>

