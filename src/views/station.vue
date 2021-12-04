<template>
    <section class="main-layout station">
        <main>
            <img class="station-img" src="" alt="">
            <div class="flex column">
                <p>PLAYLIST</p>
                <h1>Liked Songs</h1>
                <div class="">
                    <img class="user-img" src="" alt="">
                    <p><span>"Created By"</span>  •  {{ likedSongs.length }} Songs</p>
                </div>
            </div>
        </main>
        <song-list v-if="station" @removeSong="removeSong" :songs="station.songs" @songToPlayer="songToPlayer" />
        <song-list v-if="likedSongs && isLikedStation" :songs="likedSongs" @songToPlayer="likedSongToPlayer" />
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
         songToPlayer(song,idx) {
             this.$store.commit({type:'songToPlayer', song,idx,station:this.station})
        },
            likedSongToPlayer(song,idx) {
              this.$store.commit({type:'songToPlayer', song,idx,station:{songs :JSON.parse(JSON.stringify(this.likedSongs))}})
        }
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
        }
    },
    watch: {
        "$route.params.id": {
            async handler() {
            //   console.log('newVal',newVal);
                try {
                    const id = this.$route.params.id;
                    const station = await this.$store.dispatch({ type: "getById", id });
                    if (!station && id === "liked") {
                        this.$store.dispatch({type: "loadStations", filterBy: { isLiked: true }});
                        this.station = this.currStation;
                    }
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