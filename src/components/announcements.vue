<template>
<section class="announcements">
    <!-- {{chatMsgs}} -->
    <h3 :style="{cursor: 'pointer'}" @click="isBroadcastsOpen = !isBroadcastsOpen" v-if="windowWidth > 768">BROADCASTS
      <span class="icon ml-05 material-icons">campaign</span>
      <span class="b-notifications" v-if="StationIdsAndNames.length">{{StationIdsAndNames.length}}</span>
    </h3>
    <h3 :style="{cursor: 'pointer'}" @click="isBroadcastsOpen = !isBroadcastsOpen" v-else>
            <span class="icon ml-0 material-icons">campaign</span>
      <span class="b-notifications" v-if="StationIdsAndNames.length">{{StationIdsAndNames.length}}</span>
    </h3>
    <transition name="fade">
      <div v-if="isBroadcastsOpen" class="broadcasts">
        <p v-for="(StationIdsAndName,idx) in StationIdsAndNames" :key="idx" @click="goToStation(StationIdsAndName.id)" >{{StationIdsAndName.from[0].toUpperCase() + StationIdsAndName.from.slice(1)}} - <span class="fake-btn">{{StationIdsAndName.stationName}}</span> </p>
      </div>
    </transition>
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
          isBroadcastsOpen: false,
      StationIdsAndNames: [],
      msgStationId : '',
      user : null,
        }
    },
    created () {
        socketService.on('get announcements', msg => {
        this.msgStationId = msg.stationId;
        this.user = msg.from;
        const stationName = this.getStations.find(station=> station._id === msg.stationId);
          this.StationIdsAndNames.unshift({id:this.msgStationId,stationName:stationName.name,from:this.user});
          setTimeout( () => {
            const idx = this.StationIdsAndNames.findIndex(StationIdsAndName => StationIdsAndName.id === this.msgStationId )
           this.StationIdsAndNames.splice(idx,1);
          },20000)
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
      },
      windowWidth() {
        return window.innerWidth
      }
    
    }
}
</script>

<style>
</style>