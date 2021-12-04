<template>
    <section class="main-layout station">
        <main>
            <img v-if="!isLikedStation" class="station-img" :src="stationImg" alt="">
            <div class="station-img" v-else><span>❤</span></div>
            <!-- <img class="station-img" src="../assets/images/upload.svg" alt=""> -->
            <div class="flex column">
                <p class="highlight small">PLAYLIST</p>
                <h1>{{ stationName }}</h1>
                <!-- <h1>Liked Songs</h1> -->
                <div v-if="station || isLikedStation">
                    <!-- <img v-if="user" class="user-img" src="" alt=""> -->
                    <span class="user-icon material-icons">account_circle</span>
                    <p class="line-h-0 small" v-if="songsCount && songsCount.length"><span class="highlight">Guest</span>  •  {{ songsCount.length }} Songs</p>
                </div>
            </div>
        </main>
        <song-list v-if="station" @removeSong="removeSong" :songs="station.songs" />
        <song-list v-else-if="likedSongs && isLikedStation" :songs="likedSongs" />
    </section>
</template>

<script>
import songList from "../components/song-list.vue";
export default {
    components: {
        songList,
    },
    data() {
        return {
            station: null,
        };
    },
    created () {
        console.log(this.$route)
    },
    destroyed() {
        this.$store.dispatch({
            type: "setFilter",
            filterBy: {},
        });
    },
        methods : {
        async removeSong(songId) { 
            try {
            const idx = this.station.songs.findIndex(song=> song.id === songId);
            this.station.songs.splice(idx,1);
            this.$store.dispatch({type: 'updateStationAfterRemoveSong', station : this.station})
            }
            catch(err) {
                console.log(err);
            }
    },
    },
    computed: {
        currStation() {
            return this.$store.getters.currStation;
        },
        likedSongs() {
            return this.$store.getters.likedStation;
        },
        isLikedStation() {
            return this.$store.getters.isLikedStation;
        },
        stationName() {
            return (this.station) ? this.station.name : 'Liked Songs';
        },
        stationImg() {
            return (this.station && this.station.imgUrl) ? this.station.imgUrl : '../assets/images/upload.svg';
        },
        songsCount() {
            return (this.isLikedStation && this.likedSongs.length) ? this.likedSongs : this.station.songs;
        }
    },
    watch: {
        "$route.params.id": {
            async handler() {
            //   console.log('newVal',newVal);
                try {
                    const id = this.$route.params.id;
                    if (!station && id === "liked") {
                        this.$store.dispatch({type: "loadStations", filterBy: { isLiked: true }});
                        this.station = this.currStation;
                    }
                    const station = await this.$store.dispatch({ type: "getById", id });
                    this.station = station;
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