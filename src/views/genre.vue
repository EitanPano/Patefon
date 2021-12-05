<template>
 <section class="main-layout genre">
     <h1> {{genre}} </h1>
 <station-list v-if="genre" :stations="stationsByGenre[genre]" />
</section>
</template>

<script>
import stationList from "../components/station-list.vue";
export default {
     components: {
    stationList,
  },
data () {
    return {
        genre : '',
    }
},
created() {
   this.genre = this.$route.params.id;
},
computed : {
  stationsByGenre() {
      return this.$store.getters.stationsByGenre;
    },
},
}
</script>

<style>

</style>