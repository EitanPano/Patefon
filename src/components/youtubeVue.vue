<template>
    <section class="player-grid youtube-vue">
        <youtube
            class="youTubePlayer"
            :video-id="videoId"
            ref="youtube"
            @playing="playing"
            hidden
        ></youtube>
        <div class="player-left flex" :style="'background-color:' +playedSongBar">
            <img :src="playingSong.imgUrl" v-if="playingSong" />
            <div class="overflow-hidden">
                <p v-if="playingSong">{{ playingSong.title }}</p>
                <p v-if="playingSong && localPlayListData">
                    {{ localPlayListData.station.name }}
                </p>
            </div>
            <button
                v-if="playingSong"
                @click="likeSong"
                v-bind:class="{ liked: isLiked }"
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
                <button
                    v-if="isPlayed"
                    @click="pauseVideo"
                    class="btn btn-play"
                >
                    <span class="material-icons">pause</span>
                </button>
                <button v-else @click="play" class="btn btn-play">
                    <span class="material-icons">play_arrow</span>
                </button>
                <button @click="goNextSong">
                    <span class="material-icons">skip_next</span>
                </button>
                <button @click="loop">
                    <span class="material-icons">loop</span>
                </button>
            </div>
            <div class="durations flex space-between">
                <p>{{ this.showSongCurrentTime }}</p>
                <input
                    @change="seekTo"
                    type="range"
                    v-model="currentTime"
                    min="0"
                    :max="songDuration"
                    :title="currentTime"
                />
                <p>{{ this.showSongDuration }}</p>
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
import { showMsg } from "../services/event-bus.service.js";
import { socketService } from "../services/socket.service.js";
export default {
    props: ["playListData"],
    data() {
        return {
            videoId: "",
            currentTime: 0,
            songDuration: 0,
            songVolume: 20,
            isShuffling: false,
            isLooping: false,
            isMute: false,
            currTimeInterval: null,
            playingSong: null,
            isPlayed: false,
            songIdx: 0,
            playList: [],
            localPlayListData: null,

            scrollOffsetY: null,

        };
    },
    created() {
        socketService.on("get share-listen", (playerData) => {
            this.player.loadPlaylist({
                playlist: playerData.playList,
                index: playerData.songIdx,
                startSeconds: playerData.currentTime,
            });
            this.localPlayListData = playerData.localPlayListData;
            this.currentTime = playerData.currentTime;
            this.playVideo();
        });
        socketService.on("get socketCounterToTopics", (msg) => {
            this.play();
        });
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        if (this.currTimeInterval) clearInterval(this.currTimeInterval);
    },
    methods: {
        play() {
            if (!this.localPlayListData) {
                showMsg("Please play a song, from a playlist");
                return;
            }
            const playerData = {
                songIdx: this.songIdx,
                playList: this.playList,
                playingSong: this.playingSong,
                currentTime: this.currentTime,
                songVolume: this.songVolume,
                localPlayListData: this.localPlayListData,
            };
            socketService.emit("send share-listen", playerData);
            this.playVideo();
        },
        playVideo() {
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
            if (this.currTimeInterval) clearInterval(this.currTimeInterval);
            this.isPlayed = !this.isPlayed;
        },
        seekTo() {
            this.player.seekTo(this.currentTime);
            this.play();
        },
        loadPlayList() {
            const startTime = this.currentTime ? this.currentTime : 0;
            let songIds = this.localPlayListData.station.songs.map(
                (song) => song.youtubeId
            );
            this.player.loadPlaylist({
                playlist: songIds,
                index: this.localPlayListData.idx,
                startSeconds: startTime,
            });
            this.playVideo();
            setTimeout(() => {
                this.play();
            }, 1000);
        },
        playing() {
            this.player
                .getDuration()
                .then((duration) => (this.songDuration = duration));
            this.player
                .getCurrentTime()
                .then((currTime) => (this.currentTime = currTime));
            this.player
                .getPlaylistIndex()
                .then(
                    (idx) =>
                        (this.playingSong =
                            this.localPlayListData.station.songs[idx])
                );
            this.player.getPlaylistIndex().then((idx) => (this.songIdx = idx));
            this.player
                .getPlaylist()
                .then((playList) => (this.playList = playList));
        },
        goNextSong() {
            if (!this.localPlayListData) {
                showMsg("Please play a song, from a playlist");
                return;
            }
            this.player.nextVideo();
            setTimeout(() => {
                this.play();
            }, 1000);
        },
        goPrevSong() {
            if (!this.localPlayListData) {
                showMsg("Please play a song, from a playlist");
                return;
            }
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
            this.$emit("likeSong", {
                song: this.localPlayListData.song,
                type: "like",
            });
        },
        checkIfSongLiked(likedSongs) {
            var idx = likedSongs.findIndex(
                (likedSong) => likedSong.id === this.playListData.song.id
            );
            if (idx < 0) return false;
            return true;
        },
        handleScroll() {
            this.scrollOffsetY = window.scrollY;
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
            if (likedSongs && likedSongs.length) {
                let song = likedSongs.find(song=> song.id === this.localPlayListData.song.id)
                if (song) return true;
                else return false;
            } else return false;
                // return this.checkIfSongLiked(likedSongs);
            // else return false;
        },
        showSongDuration() {
            let min = parseInt(this.songDuration / 60);
            if (min < 10) min = "0" + min;
            let sec = parseInt(this.songDuration % 60);
            if (sec < 10) sec = "0" + sec;
            return min + ":" + sec;
        },
        showSongCurrentTime() {
            let min = parseInt(this.currentTime / 60);
            if (min < 10) min = "0" + min;
            let sec = parseInt(this.currentTime % 60);
            if (sec < 10) sec = "0" + sec;
            return min + ":" + sec;
        },
        playedSongBar() {
            if (this.scrollOffsetY < 60) return "transparent; box-shadow: none;";
            else if (this.scrollOffsetY < 120) return "rgba(50,50,50,0.5); box-shadow: none;";
            else return "rgba(50,50,50,0.4); box-shadow: inset 8em 0 3em 0 rgb(20, 20, 20);";
        },
    },
    watch: {
        playListData: {
            handler() {
                if (this.playListData) {
                    this.localPlayListData = JSON.parse(
                        JSON.stringify(this.playListData)
                    );
                    this.loadPlayList();
                }
            },
        },
    },
};
</script>
<style>
</style>