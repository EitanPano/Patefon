<template>
  <section class="main-layout home-page">
    <h1>Home page</h1>
    <station-list :stations="showStations" />
  </section>
</template>

<script>
import { stationService } from "../services/station.service.js";
import stationList from "../components/station-list.vue";
export default {
  name: "Home",
  components: {
    stationList,
  },
  created() {
    this.setGuestUser();
  },
  data() {
    return {
      stations: [],
    };
  },
  methods: {
    setGuestUser() {
      sessionStorage.setItem('logginUser', JSON.stringify({name:'Patefone', imgUrl:'https://res.cloudinary.com/nir-cloudinary/image/upload/v1638375320/patefon_olzyeg.png' , id: '111'}));
    }
  },
  computed : {
    showStations () {
        return this.$store.getters.getStations;
    }
  }
};
</script>
