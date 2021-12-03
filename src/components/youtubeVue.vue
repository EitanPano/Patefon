<template>
  <section class="youtube-vue" v-if="playListData">
    <youtube :video-id="videoId" ref="youtube" @playing="playing"></youtube>
    <br>
    <button @click="playVideo">play</button>
    <button @click="stopVideo">stop</button>
    <button @click="seekTo">seek</button>
    <button @click="loadPlayList">playlist</button>
    <button @click="goPrevSong">Prev</button>
    <button @click="goNextSong">Next</button>
    <button @click="shuffle">Shuffle</button>
    <button @click="loop">Loop</button>
    <input @change="seekTo" type="range" v-model="currentTime" min="0" :max="SongDuration"/> {{ currentTime }}
    <input @input="setVolume" type="range" v-model="songVolume" min="0" max="100" /> {{ songVolume }}
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
      songVolume: 50,
      isShuffling: false,
      isLooping : false,
    };
  },
  created() {
    setInterval(()=> {
    this.playing();
    },10000)
  },
  methods: {
    playVideo() {
      this.player.playVideo();
    },
    stopVideo() {
      this.player.stopVideo();
        console.log(this.player);
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
    },
    playing() {
      console.log("o/ we are watching!!!");
      this.player.getDuration()
        .then((duration) => (this.SongDuration = duration));
      this.player.getCurrentTime()
      .then(currTime => this.currentTime = currTime)
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
      console.log(this.isLooping)
     if (this.isLooping) this.player.setLoop(false);
     else this.player.setLoop(true);
    this.isLooping = !this.isLooping;
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
  },
  watch: {
    playListData: {
      async handler() {
        console.log(this.playListData);
        if (this.playListData && this.playListData.station) this.loadPlayList();
        else if (this.playListData.song) {
          this.videoId = song.youtubeId;
          this.playVideo();
        }
      },
      // immediate: true,
    },
  },
};
</script>

<style>
</style>