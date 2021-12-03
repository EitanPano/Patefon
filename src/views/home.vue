<template>
  <section class="main-layout home-page">
    <h1>Home page</h1>
    <!-- <station-list :stations="showStations" /> -->
    <station-list v-if="showStations" :stations="showStations" />
      <youtube-vue :playListData="{station:currStation , song: currSong, idx:currSongIdx }"/>
  </section>
</template>

<script>
import { stationService } from "../services/station.service.js";
import stationList from "../components/station-list.vue";
import youtubeVue from "../components/youtubeVue.vue";
export default {
  name: "Home",
  components: {
    stationList,
    youtubeVue,
  },
  created() {
    this.setGuestUser();
    // this.$store.commit({type:'setInitalStation'});
  },
  data() {
    return {
      stations: [],
    };
  },
  methods: {
    setGuestUser() {
      sessionStorage.setItem('loggedInUser', JSON.stringify({name:'Patefon', imgUrl:'https://res.cloudinary.com/nir-cloudinary/image/upload/v1638375320/patefon_olzyeg.png' , id: '111'}));
    }
  },
  computed : {
    showStations () {
        return this.$store.getters.getStations;
    },

    currStation() {
      return this.$store.getters.currStation;
    },
    currSong () {
        return this.$store.getters.currSong;
    },
    currSongIdx () {
      return this.$store.getters.currSongIdx;
  },
  }
};
</script>
