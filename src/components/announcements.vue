<template>
<section class="announcements">
    <!-- {{chatMsgs}} -->
    <p v-for="(StationIdsAndName,idx) in StationIdsAndNames" :key="StationIdsAndName.id+idx" @click="goToStation(StationIdsAndName.id)" > Listen With Me: {{StationIdsAndName.stationName}}!!! </p>
    <!-- <p v-html="chatMsgs"> </p> -->
    </section>
</template>

<script>
import { socketService } from '../services/socket.service'
export default {
  props : ['currStation']
  ,
    data() {
        return {
      StationIdsAndNames : [],
      newMsg : null,
        }
    },
    created () {
        socketService.on('get announcements', msg => {
        this.newMsg = msg
        const stationName = this.getStations.find(station=> station._id === msg).name;
          this.StationIdsAndNames.unshift({id:msg,stationName});
      })
 
    },
    methods : {
      goToStation(stationId) {
        this.$router.push('/station/' + stationId);
         socketService.emit('chat topic', stationId)
        this.newMsg = null;
      }
    },
    computed: {
      getStations() {
      return this.$store.getters.getStations;
      }
    
    }
}
</script>

<style>

</style>