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
      <!-- <img class="station-img" src="../assets/images/upload.svg" alt="" /> -->
      <div class="flex column">
        <p class="highlight small">PLAYLIST</p>
        <h1>{{ stationName }}</h1>
        <!-- <h1>Liked Songs</h1> -->
        <div v-if="currStation || isLikedStation">
          <!-- <img v-if="user" class="user-img" src="" alt="" /> -->
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
    />
    <song-list
      v-else-if="likedSongs && likedSongs.length"
      :songs="likedSongs"
      @songToPlayer="likedSongToPlayer"
    />
  </section>
</template>

<script>
import songList from "../components/song-list.vue";
export default {
  data() {
    return {
      isLikedStation: null,
    };
  },
  methods: {
    async removeSong(songId) {
      try {
        const idx = this.station.songs.findIndex((song) => song.id === songId);
        this.station.songs.splice(idx, 1);
      } catch (err) {
        console.log(err);
      }
    },
    songToPlayer(song, idx) {
      this.$store.commit({
        type: "songToPlayer",
        song,
        idx,
        station: this.station,
      });
    },
    likedSongToPlayer(song, idx) {
      this.$store.commit({
        type: "songToPlayer",
        song,
        idx,
        // station: { songs: JSON.parse(JSON.stringify(this.likedSongs)) },
      });
    },
    destroyed() {
      this.$store.dispatch({
        type: "updateStationAfterRemoveSong",
        station: this.station,
      });
      this.$store.dispatch({
        type: "setFilter",
        filterBy: {},
      });
      this.isLikedStation = false;
    },
  },
  computed: {
    currStation() {
      console.log("curr station is", this.$store.getters.currStation);
      return this.$store.getters.currStation;
    },
    stationName() {
      return this.station ? this.station.name : "Liked Songs";
    },
    stationImg() {
      return this.station && this.station.imgUrl
        ? this.station.imgUrl
        : "../assets/images/upload.svg";
    },
    songsCount() {
      // return this.isLikedStation && this.likedSongs.length
      //   ? this.likedSongs
      //   : this.currStation.songs;
    },
    likedSongs() {
      console.log("liked songs", this.$store.getters.getLikedSongs);
      return this.$store.getters.getLikedSongs;
      // return this.$store.getters.getLoggedUser.songs;
    },
  },
  watch: {
    "$route.params.id": {
      async handler() {
        try {
          const id = this.$route.params.id;
          console.log(id);
          if (id === "liked") {
            this.isLikedStation = true;
            console.log("id=liked");
            await this.$store.dispatch({
              type: "loadUser",
            });
            console.log(
              this.$store.getters.getLikedSongs,
              "liked songs in watch"
            );
          } else {
            console.log("elsing....");
            await this.$store.dispatch({ type: "getById", id });
            console.log(this.$store.getters.currStation);
          }
        } catch (err) {
          console.log(err);
        }
      },
      immediate: true,
    },
  },
  components: {
    songList,
  },
};
</script>

<style>
</style>