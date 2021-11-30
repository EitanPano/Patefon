<template>
    <section class="main-layout">
        <h1>Home page</h1>
        <station-list :stations="stations"/>
    </section>
</template>

<script>
import {stationService} from '../services/station.service.js'
import stationList from '../components/station-list.vue';
export default {
  name: 'Home',
  components: {
    stationList
  },
  created () {
this.loadStations()
  },
  data() {
    return {
          stations: [],
    }
  },
  methods: {
    async loadStations() {
     try {
  this.stations = await stationService.query()
     }
     catch (err) {
       console.log(err)
     }
  
    }
  }
}
</script>
