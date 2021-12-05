 <template>
  <section class="main-layout">
    <h1 class="full highlight">{{ genre }}</h1>
    <div class="grid-container">
      <template v-for="station in stationsByGenre[genre]">
        <station-preview :station="station" :key="station._id" />
      </template>
    </div>
  </section>
</template>

<script>
import stationList from "../components/station-list.vue";
import stationPreview from "../components/station-preview.vue";
export default {
  components: {
    stationList,
    stationPreview,
  },
  data() {
    return {
      genre: "",
    };
  },
  created() {
    this.genre = this.$route.params.id;
  },
  computed: {
    stationsByGenre() {
      return this.$store.getters.stationsByGenre;
    },
  },
};
</script>

<style>
</style>