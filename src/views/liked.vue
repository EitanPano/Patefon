<template>
  <section class="main-layout station grad-pink">
    <main>
      <div class="station-img"><span>❤</span></div>
      <div class="flex column">
        <p class="highlight small">PLAYLIST</p>
        <h1>Liked Songs</h1>
        <div>
          <span class="user-icon material-icons">account_circle</span>
          <p class="line-h-0 small">
            <span class="highlight">Guest</span> • {{ songsCount.length }} Songs
          </p>
        </div>
      </div>
    </main>
    <!--  -->
    <song-list
      @songToPlayer="songToPlayer"
      :songs="likedSongs"
      @swapped="swapIdxs"
      @likeSong="updateUser"
      :isLiked="true"
    />
    <div class="start-exoloring-section" v-if="!likedSongs.length">
      <h2>No Liked Songs...</h2>
      <router-link class="highlight small flex" to="/search"
        >Start Exploring <span class="material-icons">search</span></router-link
      >
    </div>

    <!-- <chat-room :currStation="currStation" v-if="currStation" /> -->
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
  methods: {
    async swapIdxs(moved) {
      try {
        const newStation = JSON.parse(JSON.stringify(this.currStation));
        newStation.songs.splice(moved.oldIndex, 1);
        newStation.songs.splice(moved.newIndex, 0, moved.element);
        await this.$store.dispatch({
          type: "updateStation",
          station: newStation,
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
        station: { songs: JSON.parse(JSON.stringify(this.likedSongs)) },
      });
    },
    updateUser(action) {
      this.$store.dispatch({ type: "updateUser", action });
    },
  },
  computed: {
    likedSongs() {
      console.log(this.$store.getters.likedSongs);
      return this.$store.getters.likedSongs;
      //     return this.$store.getters.getLoggedUser.songs;
    },
    songsCount() {
      return this.likedSongs;
    },
  },
};
</script>

<style>
</style>