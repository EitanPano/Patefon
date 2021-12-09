<template>
  <section class="main-layout station" ref="stationRef">
    <main>
      <img class="station-img" :src="this.currStation.imgUrl" alt="" />
      <div class="flex column">
        <p class="highlight small">PLAYLIST</p>
        <h1>{{ currStation.name }}</h1>
        <div>
          <span class="user-icon material-icons">account_circle</span>
          <p class="line-h-0 small" v-if="songsCount && songsCount.length">
            <span class="highlight">Guest</span> • {{ songsCount.length }} Songs
          </p>
        </div>
      </div>
    </main>
      <chat-room :currStation="currStation" v-if="currStation" />
    <song-list
      :songs="currStation.songs"
      @removeSong="removeSong"
      @songToPlayer="songToPlayer"
      @swapped="swapIdxs"
      @likeSong="updateUser"
    />
  <!-- <div v-if="otherMouseCoords" class="socketMouse" :style="{left:otherMouseCoords.x + 'px', top:otherMouseCoords.y + 'px'}"> 🖱 {{otherMouseCoords.user}} </div> -->
  <div v-if="otherMouseCoords" class="socketMouse" :style="{left:otherMouseCoords.x + 'px', top:otherMouseCoords.y + 'px'}"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(-90deg);"><path fill-rule="evenodd" d="M14.082 2.182a.5.5 0 01.103.557L8.528 15.467a.5.5 0 01-.917-.007L5.57 10.694.803 8.652a.5.5 0 01-.006-.916l12.728-5.657a.5.5 0 01.556.103z" clip-rule="evenodd"></path></svg>{{otherMouseCoords.user}}</div>
  </section>
</template>

<script>
import songList from "../components/song-list.vue";
import chatRoom from "../components/chat-room.vue";
import shareListen from "../components/share-listen.vue";
import { socketService } from "../services/socket.service";

export default {
  components: {
    songList,
    chatRoom,
    shareListen,
  },
  data() {
    return {
      isLikedStation: null,
      mouseMoveInterval : null,
      myMouseCoords : null,
      otherMouseCoords : null,
    };
  },
  mounted() {
    // this.$refs.stationRef.addEventListener('mousemove', ev=> {
    //   console.log(ev.offsetX, ev.offsetY)
    // })
    const user = JSON.parse(sessionStorage.getItem('user'));
      window.addEventListener('mousemove', ev=> {
      //     console.log(ev);
      // console.log(ev.clientX, ev.clientY);
      // this.myMouseCoords = {x:ev.offsetX,y:ev.offsetY,user: user.username};
      this.myMouseCoords = {x:ev.clientX,y:ev.clientY,user: user.username};
    })
      this.mouseMoveInterval = setInterval ( ()=>{
        socketService.emit('send mousemove',this.myMouseCoords )
      },100)
      socketService.on('get mousemove',mouseCoords => {
        // console.log(mouseCoords)
        this.otherMouseCoords = mouseCoords;
      } )
  },
  methods: {
    async swapIdxs(moved) {
      try {
        const newStation = JSON.parse(JSON.stringify(this.currStation));
        newStation.songs.splice(moved.oldIndex, 1);
        newStation.songs.splice(moved.newIndex, 0, moved.element);
        // console.log('newStation', newStation);
        await this.$store.dispatch({
          type: "updateStation",
          station: newStation,
        });
      } catch (err) {
        console.log(err);
      }
    },
    async removeSong(songId) {
      try {
        const idx = this.currStation.songs.findIndex(
          (song) => song.id === songId
        );
        this.currStation.songs.splice(idx, 1);
        await this.$store.dispatch({
          type: "updateStation",
          station: this.currStation,
        });
      } catch (err) {
        console.log(err);
      }
    },
    songToPlayer(song, idx) {
      this.$store.commit({
        type: "songToPlayer",
        song,
        idx,
        station: this.currStation,
      });
    },
    updateUser(action) {
      console.log("updating");
      this.$store.dispatch({
        type: "updateUser",
        action,
      });
    },
    goToSearch() {
      console.log("searching...");
      this.$router.push(`/search`);
    },
    destroyed() {
      this.$store.dispatch({
        type: "updateStation",
        station: this.currStation,
      });
      this.$store.dispatch({
        type: "setFilter",
        filterBy: {},
      });
      socketService.off("get share-listen");
      clearInterval(this.mouseMoveInterval);
    },
  },
  computed: {
    currStation() {
      return this.$store.getters.currStation;
    },
    stationName() {
      return this.currStation.name;
    },
    songsCount() {
      return this.currStation.songs;
    },
  },
  watch: {
    "$route.params.id": {
      async handler() {
        try {
          const id = this.$route.params.id;
          await this.$store.dispatch({ type: "getById", id });
        } catch (err) {
          console.log(err);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>