<template>
<section class="share-listen">
    <button @click="shareListen"> Share Listen </button>
    </section>
</template>

<script>
import { socketService } from '../services/socket.service'
export default {
  props : ['currStation']
  ,
    data() {
        return {
      // chatMsg : '',
      // chatMsgs : []
        }
    },
    created () {
  // socketService.emit('chat topic', this.currStation._id)
        socketService.on('get share-listen', (stationSongIdx) => {
          this.songToPlayer(stationSongIdx.station, stationSongIdx.idx)
      })
    },
    methods: {
         shareListen() {
           if (!this.currStationForPlayer) return;
           const stationSongIdx = {station :this.currStationForPlayer, idx:this.currSongIdx }
        socketService.emit('send share-listen',  stationSongIdx) 
    },
    songToPlayer(station,idx) {
      this.$emit('songToPlayer', station,idx)
    }
    },
    computed : {
      currStationForPlayer () {
        return this.$store.getters.currStationForPlayer
      },
      currSongIdx () {
       return this.$store.getters.currSongIdx
      }
    }
}
</script>

<style>

</style>