<template>
  <section class="player-grid youtube-vue">
    <youtube
      class="youTubePlayer"
      :video-id="videoId"
      ref="youtube"
      @playing="playing"
      hidden
    ></youtube>
    <div class="player-left flex">
      <img :src="playingSong.imgUrl" v-if="playingSong" />
      <div class="overflow-hidden">
        <p v-if="playingSong">{{ playingSong.title }}</p>
        <p v-if="playingSong && playListData">
          {{ playListData.station.name }}
        </p>
      </div>
      <button
        v-if="playingSong"
        v-bind:class="{ liked: isLiked }"
        @click="likeSong"
      >
        <span class="material-icons">favorite</span>
      </button>
    </div>
    <div class="player-main">
      <div class="actions">
        <button @click="shuffle">
          <span class="material-icons">shuffle</span>
        </button>
        <button @click="goPrevSong">
          <span class="material-icons">skip_previous</span>
        </button>
        <button v-if="isPlayed" @click="pauseVideo" class="btn btn-play">
          <span class="material-icons">pause</span>
        </button>
        <button v-else @click="play" class="btn btn-play">
          <span class="material-icons">play_arrow</span>
        </button>
        <button @click="goNextSong">
          <span class="material-icons">skip_next</span>
        </button>
        <button @click="loop"><span class="material-icons">loop</span></button>
        <button @click="share">Share</button>
      </div>
      <div class="durations flex space-between">
        <p>00:00</p>
        <input
          @change="seekTo"
          type="range"
          v-model="currentTime"
          min="0"
          :max="SongDuration"
          :title="currentTime"
        />
        <p>00:00</p>
      </div>
    </div>
    <div class="player-right">
      <button @click="mute">
        <span class="material-icons">{{ volumeIcon }}</span>
      </button>

      <input
        @input="setVolume"
        type="range"
        v-model="songVolume"
        min="0"
        max="100"
        :title="songVolume"
      />
    </div>
  </section>
</template>


<script>
import { socketService } from "../services/socket.service.js";
export default {
  props: ["playListData"],
  data() {
    return {
      videoId: "lG0Ys-2d4MA",
      currentTime: 0,
      SongDuration: 0,
      songVolume: 20,
      isShuffling: false,
      isLooping: false,
      isMute: false,
      currTimeInterval: null,
      playingSong: null,
      isPlayed: false,
      songIdx: 0,
      playList: [],
      socketCounterToTopics: null,
    };
  },
  created() {
    // socketService.emit('chat topic', this.currStation._id)

    socketService.on("get share-listen", (playerData) => {
      this.player.loadPlaylist({
        //  playlist: [playerData.playList],
        playlist: playerData.playList,

        index: playerData.songIdx,
        startSeconds: playerData.currentTime,
      });
      // this.songVolume = playerData.songVolume;
      this.currentTime = playerData.currentTime;
      // this.playingSong =  this.playListData.station.songs[index]
      // this.player.playVideoAt(playerData.currentTime);
      this.playVideo();
    });

    //      socketService.on('get socketCounterToTopics', (socketCounterToTopics) => {
    //       //  console.log(socketCounterToTopics)
    //        if (this.socketCounterToTopics && socketCounterToTopics[this.playListData.station._id] > this.socketCounterToTopics[this.playListData.station._id] )
    //       //  console.log('bigger')
    //         this.play();
    //        this.socketCounterToTopics = socketCounterToTopics;
    // })

    socketService.on("get socketCounterToTopics", (msg) => {
      this.play();
    });
  },
  destroyed() {
    if (this.currTimeInterval) clearInterval(this.currTimeInterval);
  },
  methods: {
    play() {
      const playerData = {
        songIdx: this.songIdx,
        playList: this.playList,
        playingSong: this.playingSong,
        currentTime: this.currentTime,
        songVolume: this.songVolume,
      };
      socketService.emit("send share-listen", playerData);
      this.playVideo();
    },
    playVideo() {
      // this.player.getPlayerState().then(state=> console.log(state))
      this.player.setVolume(this.songVolume);
      if (this.currTimeInterval) clearInterval(this.currTimeInterval);
      this.player.playVideo();
      this.isPlayed = true;
      this.currTimeInterval = setInterval(() => {
        this.playing();
      }, 1000);
    },
    pauseVideo() {
      this.player.pauseVideo();
      console.log(this.player);
      if (this.currTimeInterval) clearInterval(this.currTimeInterval);
      this.isPlayed = !this.isPlayed;

      // this.player.getPlayerState().then(state=> console.log(state))
      // this.player.getIframe().then(state=> console.log(state))
      // console.log(this.songIdx);
      // console.log(this.playList);
      // console.log(this.playingSong);
      // console.log(this.currentTime);
      // console.log(this.songVolume);
    },
    seekTo() {
      this.player.seekTo(this.currentTime);
      this.play();
    },
    loadPlayList() {
      let songIds = this.playListData.station.songs.map(
        (song) => song.youtubeId
      );
      this.player.loadPlaylist({
        // playlist: [songIds],
        playlist: songIds,
        index: this.playListData.idx,
        startSeconds: 0,
      });
      this.playVideo();
      setTimeout(() => {
        this.play();
      }, 1000);
    },
    playing() {
      // console.log("o/ we are watching!!!");
      // all Promises from get are listed here, palying() is recalled when something is the song player changes
      this.player
        .getDuration()
        .then((duration) => (this.SongDuration = duration));
      this.player
        .getCurrentTime()
        .then((currTime) => (this.currentTime = currTime));
      this.player
        .getPlaylistIndex()
        .then(
          (idx) => (this.playingSong = this.playListData.station.songs[idx])
        );
      this.player.getPlaylistIndex().then((idx) => (this.songIdx = idx));
      this.player.getPlaylist().then((playList) => (this.playList = playList));
    },

    goNextSong() {
      this.player.nextVideo();
      setTimeout(() => {
        this.play();
      }, 1000);
    },
    goPrevSong() {
      this.player.previousVideo();
      setTimeout(() => {
        this.play();
      }, 1000);
    },
    setVolume() {
      this.player.setVolume(this.songVolume);
    },
    shuffle() {
      if (this.isShuffling) this.player.setShuffle(false);
      else this.player.setShuffle(true);
      this.isShuffling = !this.isShuffling;
    },
    loop() {
      // console.log(this.isLooping);
      if (this.isLooping) this.player.setLoop(false);
      else this.player.setLoop(true);
      this.isLooping = !this.isLooping;
    },
    mute() {
      if (this.isMute) this.player.unMute();
      else this.player.mute();
      this.isMute = !this.isMute;
    },
    likeSong() {
      this.$emit("likeSong", { song: this.playListData.song, type: "like" });
    },
    share() {
      socketService.emit("send announcements", this.playListData.station._id);
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    volumeIcon() {
      if (this.isMute) return "volume_off";
      else {
        if (this.songVolume >= 66) return "volume_up";
        else if (this.songVolume >= 25) return "volume_down";
        else return "volume_mute";
      }
    },
    isLiked() {
      let likedSongs = this.$store.getters.likedSongs;
      console.log("song:", this.playListData.song);
      console.log("liked songs", likedSongs);
      if (likedSongs.includes(this.playListData.song)) {
        console.log("does");
        return true;
      } else {
        console.log("doesnt");
        return false;
      }
    },
  },
  watch: {
    playListData: {
      handler() {
        // console.log(this.playListData)
        if (this.playListData) this.loadPlayList();

        // else if (this.playListData.song) {
        //   this.videoId = this.playListData.song.youtubeId;
        //   this.playVideo();
        // }
      },
      // immediate: true,
    },
  },
};
</script>

<style>
</style>