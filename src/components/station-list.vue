<template>
  <section class="station-list">
    <ul v-if="stations.length">
      <li v-for="station in stations" :key="station._id">
        <station-preview
          class="station-card"
          :station="station"
          @remove="remove"
          @update="update"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import stationPreview from "./station-preview.vue";
export default {
  components: {
    stationPreview,
  },
  props: ["stations"],
  data() {
    return {};
  },

  created() {},

  methods: {
    remove(stationId) {
      this.$emit("remove", stationId);
    },
    update(station) {
      this.$emit("update", station);
    },
  },
  computed: {},
};
</script>

<style>
</style>