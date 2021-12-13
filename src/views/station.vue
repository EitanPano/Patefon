<template>
  <section :class="bgColor" class="main-layout station">
    <main>
      <img class="station-img" :src="this.currStation.imgUrl" alt="" />
      <div class="flex column">
        <p class="highlight small">PLAYLIST</p>
        <h1>{{ currStation.name }}</h1>
        <div>
          <span class="user-icon material-icons">account_circle</span>
          <p class="line-h-0 small" v-if="songsCount && songsCount.length">
            <span class="highlight">{{ currStation.createdBy.name }}</span> •
            {{ songsCount.length }} Songs
          </p>

          <p
            class="line-h-0 small"
            v-if="currStation && currStation.likesCounter"
          >
            <span> &nbsp;• {{ currStation.likesCounter }} Likes </span>
          </p>
        </div>
      </div>
    </main>
    <song-list
      :songs="currStation.songs"
      @removeSong="removeSong"
      @songToPlayer="songToPlayer"
      @swapped="swapIdxs"
      @likeSong="updateUser"
      @likeStation="updateUserLikedStations"
      :isLikedStation="isLikedStation"
    />
    <youtube-search @addSong="addSong" />
    <!-- <div v-if="otherMouseCoords" class="socketMouse" :style="{left:otherMouseCoords.x + 'px', top:otherMouseCoords.y + 'px'}"> :three_button_mouse: {{otherMouseCoords.user}} </div> -->
    <chat-room :currStation="currStation" v-if="currStation" />
    <div
      v-if="otherMouseCoords && otherMouseCoords.user && myMouseCoords && otherMouseRatio && myScreen"
      class="socketMouse"
      :style="{
        left: myScreen.x * otherMouseRatio.x + 'px',
        top: myScreen.y * otherMouseRatio.y + 'px',
      }"
    >
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 33 33"
        stroke="#fff"
        fill="#c365d6"
        enable-background="new 0 0 28 28"
        xml:space="preserve"
      >
        <polygon
          fill="#FFF"
          points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6 "
        />
        <polygon fill="#FFF" points="17.3,21.6 13.7,23.1 9,12 12.7,10.5 " />
        <rect
          x="12.5"
          y="13.6"
          transform="matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)"
          width="3"
          height="8"
        />
        <polygon points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 " />
      </svg>
      <p class="highlight cursor-text">
        {{
          otherMouseCoords.user[0].toUpperCase() +
          otherMouseCoords.user.slice(1)
        }}
      </p>
    </div>
  </section>
</template>
<script>
import songList from "../components/song-list.vue";
import chatRoom from "../components/chat-room.vue";
import shareListen from "../components/share-listen.vue";
import { socketService } from "../services/socket.service";
import youtubeSearch from "../components/youtube-search.vue";

export default {
  components: {
    songList,
    chatRoom,
    shareListen,
    youtubeSearch,
  },
  data() {
    return {
      // isLikedStation: null,
      user: null,
      mouseMoveInterval: null,
      myMouseCoords: { x: 200, y: 200 },
      otherMouseCoords: null,
      otherMouseRatio: null,
      myScreen: { x: 200, y: 200 },
      gradients: [
        "grad-red",
        "grad-sky",
        "grad-mint",
        "grad-orange",
        "grad-blue",
        "grad-pink",
        "grad-purple",
        "grad-green",
      ],
    };
  },
  created() {
    socketService.on("get update stations", (msg) => {
      window.location.reload();
    });
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    window.addEventListener("mousemove", this.getWindowOffset);
    this.mouseMoveInterval = setInterval(() => {
      this.myScreen = { x: window.innerWidth, y: window.innerHeight };
      socketService.emit("send mousemove", {
        mymouseCoords: this.myMouseCoords,
        ratio: {
          x: this.myMouseCoords.x / this.myScreen.x,
          y: this.myMouseCoords.y / this.myScreen.y,
        },
      });
    }, 50);
    socketService.on("get mousemove", (mouseCoords) => {
      this.otherMouseCoords = mouseCoords.mymouseCoords;
      this.otherMouseRatio = mouseCoords.ratio;
    });
  },
  methods: {
    async swapIdxs(moved) {
      try {
        const newStation = JSON.parse(JSON.stringify(this.currStation));
        newStation.songs.splice(moved.oldIndex, 1);
        newStation.songs.splice(moved.newIndex, 0, moved.element);
        await this.$store.dispatch({
          type: "updateStationDrag",
          station: newStation,
          moved,
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
      this.$store.dispatch({
        type: "updateUser",
        action,
      });
    },
    updateUserLikedStations() {
      this.$store.dispatch({
        type: "updateUserLikedStations",
        station: this.currStation,
      });
    },
    goToSearch() {
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
      socketService.off("get mousemove");
      clearInterval(this.mouseMoveInterval);
      window.removeEventListener("mousemove", this.getWindowOffset);
      this.otherMouseRatio = { x: 0, y: 0 };
    },
    checkIfStationLiked(likedStations) {
      var idx = likedStations.findIndex(
        (likedStation) => likedStation === this.currStation._id
      );
      if (idx < 0) {
        return false;
      } else {
        return true;
      }
    },
    getWindowOffset(ev) {
      this.myMouseCoords = {
        x: ev.clientX,
        y: ev.clientY,
        user: this.user.username,
      };
    },
    async addSong(song) {
      // let currStationCopy = JSON.parse(JSON.stringify(currStation));
      try {
        song.createdAt = Date.now();
        if (song.idx !== null || song.idx === 0) {
          this.currStation.songs.splice(song.idx, 0, song);
        } else this.currStation.songs.push(song);
        await this.$store.dispatch({
          type: "updateStation",
          station: this.currStation,
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    isLikedStation() {
      let likedStations = this.$store.getters.likedStations;
      if (likedStations && likedStations.length)
        return this.checkIfStationLiked(likedStations);
      else return false;
    },
    currStation() {
      return this.$store.getters.currStation;
    },
    stationName() {
      return this.currStation.name;
    },
    songsCount() {
      return this.currStation.songs;
    },
    bgColor() {
      const idx = Math.floor(Math.random() * this.gradients.length);
      return this.gradients[idx];
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