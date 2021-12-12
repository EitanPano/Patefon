<template>
<section class="announcements">
    <!-- {{chatMsgs}} -->
    <p v-for="(StationIdsAndName,idx) in StationIdsAndNames" :key="idx" @click="goToStation(StationIdsAndName.id)" >Listen With {{StationIdsAndName.from}} at: {{StationIdsAndName.stationName}} </p>
    <!-- <p v-if="StationIdsAndNames.length" @click="goToStation(StationIdsAndNames[0].id)" >Listen With {{StationIdsAndNames[0].from}} at: {{StationIdsAndNames[0].stationName}} </p> -->
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
      msgStationId : '',
      user : null,
        }
    },
    created () {
        socketService.on('get announcements', msg => {
        this.msgStationId = msg.stationId;
        // console.log(this.msgStationId)
        this.user = msg.from;
        const stationName = this.getStations.find(station=> station._id === msg.stationId);
          this.StationIdsAndNames.unshift({id:this.msgStationId,stationName:stationName.name,from:this.user});
          setTimeout( () => {
            const idx = this.StationIdsAndNames.findIndex(StationIdsAndName => StationIdsAndName.id === this.msgStationId )
           this.StationIdsAndNames.splice(idx,1);
          },8000)
      })
    },
    methods : {
      goToStation(stationId) {
        this.$router.push('/station/' + stationId);
         socketService.emit('chat topic', stationId)
        this.StationIdsAndNames = [];
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