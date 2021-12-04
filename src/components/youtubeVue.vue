<template>
  <section class="youtube-vue">
    <youtube
      class="youTubePlayer"
      :video-id="videoId"
      ref="youtube"
      @playing="playing"
    ></youtube>
    <img :src="playingSong.imgUrl" v-if="playingSong" />
    <p v-if="playingSong">{{ playingSong.title }}</p>
    <button @click="playVideo">play</button>
    <button @click="stopVideo">stop</button>
    <button @click="goPrevSong">Prev</button>
    <button @click="goNextSong">Next</button>
    <button @click="shuffle">Shuffle</button>
    <button @click="loop">Loop</button>
    <button @click="mute">Mute</button>
    <div>
      <input
        @change="seekTo"
        type="range"
        v-model="currentTime"
        min="0"
        :max="SongDuration"
        :title="currentTime"
      />
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
    };
  },
  destroyed() {
    if (this.currTimeInterval) clearInterval(this.currTimeInterval);
  },
  methods: {
    playVideo() {
      this.player.setVolume(this.songVolume);
      if (this.currTimeInterval) clearInterval(this.currTimeInterval);
      this.player.playVideo();
      this.currTimeInterval = setInterval(() => {
        this.playing();
      }, 1000);
    },
    stopVideo() {
      this.player.stopVideo();
      console.log(this.player);
      if (this.currTimeInterval) clearInterval(this.currTimeInterval);
    },
    seekTo() {
      this.player.seekTo(this.currentTime);
    },
    loadPlayList() {
      let songIds = this.playListData.station.songs.map(
        (song) => song.youtubeId
      );
      this.player.loadPlaylist({
        playlist: [songIds],
        index: this.playListData.idx,
        startSeconds: 0,
      });
      this.playVideo();
    },
    playing() {
      console.log("o/ we are watching!!!");
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
    },
    goNextSong() {
      this.player.nextVideo();
    },
    goPrevSong() {
      this.player.previousVideo();
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
      console.log(this.isLooping);
      if (this.isLooping) this.player.setLoop(false);
      else this.player.setLoop(true);
      this.isLooping = !this.isLooping;
    },
    mute() {
      if (this.isMute) this.player.unMute();
      else this.player.mute();
      this.isMute = !this.isMute;
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
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