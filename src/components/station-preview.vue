<template>
  <section class="station-preview">
    <p>{{ station.name }}</p>
    <ul class="station-preview-tags">
      <li v-for="(tag, index) in station.tags" :key="index">{{ tag }}</li>
    </ul>
      <router-link :to="'/station/' + station._id">  <img :src="station.imgUrl" > </router-link>
  </section>
</template>

<script>
export default {
  props: ["station"],
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

