<template>
  <article
    @mouseleave="isHover = false"
    @mouseenter="isHover = true"
    @click="enterStation(station._id)"
    class="station-preview"
  >
    <div>
      <img :src="station.imgUrl" />
      <transition name="fade">
        <button class="btn btn-play" v-if="isHover">
          <span class="material-icons">play_arrow</span>
        </button>
      </transition>
    </div>
    <p>{{ station.name }}</p>
    <p>By {{ station.createdBy.name }}</p>
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

