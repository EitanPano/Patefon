<template>
  <section class="main-layout station">
    <main>
      <img
        v-if="!isLikedStation"
        class="station-img"
        :src="stationImg"
        alt=""
      />
      <div class="station-img" v-else><span>❤</span></div>
      <div class="flex column">
        <p class="highlight small">PLAYLIST</p>
        <h1 v-if="isLikedStation">Liked Songs</h1>
        <h1 v-else-if="currStation">{{ currStation.name }}</h1>
        <div v-if="currStation || isLikedStation">
          <span class="user-icon material-icons">account_circle</span>
          <p class="line-h-0 small" v-if="songsCount && songsCount.length">
            <span class="highlight">Guest</span> • {{ songsCount.length }} Songs
          </p>
        </div>
      </div>
    </main>
    <song-list
      v-if="currStation && !isLikedStation"
      :songs="currStation.songs"
      @removeSong="removeSong"
      @songToPlayer="songToPlayer"
      @swapped="swapIdxs"
      @likeSong="updateUser"
    />
    <song-list
      v-if="likedSongs && likedSongs.length && isLikedStation"
      :songs="likedSongs"
      @songToPlayer="likedSongToPlayer"
      @swapped="swapIdxs"
      @likeSong="updateUser"
    />
    <div
      class="start-exoloring-section"
      v-if="isLikedStation && !likedSongs.length"
    >
      <h1>No Liked Songs 💔</h1>
      <h2 @click="goToSearch" class="search-link">Start Exploring🔍</h2>
    </div>

    <chat-room :currStation="currStation" v-if="currStation" />
    <!-- <share-listen
      :currStation="currStation"
      v-if="currStation"
      @songToPlayer="songToPlayer"
    /> -->
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
    };
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
    likedSongToPlayer(song, idx) {
      this.$store.commit({
        type: "songToPlayer",
        song,
        idx,
        station: { songs: JSON.parse(JSON.stringify(this.likedSongs)) },
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
      this.isLikedStation = false;

      socketService.off("get share-listen");
    },
  },
  computed: {
    currStation() {
      return this.$store.getters.currStation;
    },
    stationName() {
      return this.currStation ? this.currStation.name : "Liked Songs";
    },
    stationImg() {
      return this.currStation && this.currStation.imgUrl
        ? this.currStation.imgUrl
        : "../assets/images/upload.svg";
    },
    songsCount() {
      return this.isLikedStation ? this.likedSongs : this.currStation.songs;
    },
    likedSongs() {
      console.log();
      return this.$store.getters.likedSongs;
      return this.$store.getters.getLoggedUser.songs;
    },
  },
  watch: {
    "$route.params.id": {
      async handler() {
        try {
          const id = this.$route.params.id;
          if (id === "liked") {
            this.isLikedStation = true;
            // console.log("id=liked");
            // await this.$store.dispatch({
            //   type: "loadUser",
            // });
          } else {
            await this.$store.dispatch({ type: "getById", id });
          }
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