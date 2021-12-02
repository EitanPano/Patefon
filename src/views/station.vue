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
        <song-list v-if="station" :songs="station.songs" />
        <song-list v-if="likedSongs" :songs="likedSongs" />
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
    destroyed() {
        this.$store.dispatch({
            type: "setFilter",
            filterBy: {},
        });
    },
    computed: {
        currStation() {
            return this.$store.getters.currStation;
        },
        likedSongs() {
            return this.$store.getters.likedStation;
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