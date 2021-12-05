<template>
  <article
    @mouseleave="isHover = false"
    @mouseenter="isHover = true"
    @click="enterStation(station._id)"
    class="station-preview"
  >
    <img :src="station.imgUrl" />
    <p>{{ station.name }}</p>
    <p>By {{ station.createdBy.name }}</p>
    <transition name="fade">
      <button class="btn btn-play" v-if="isHover">▶</button>
    </transition>
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
  created() {},
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

