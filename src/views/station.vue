<template>
    <section class="main-layout">
        <h1>Station view</h1>
        <song-list v-if="station" :songs="station.songs" @removeSong="removeSong" />
        <!-- {{ currStation }} -->
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
    },
    watch: {
        "$route.params.id": {
            async handler(newVal) {
              console.log('newVal',newVal);
                try {
                    const id = this.$route.params.id;
                    const station = await this.$store.dispatch({
                        type: "getById",
                        id,
                    });
                    // const station = await stationService.getById(id);
                    if (!station && id === "liked") {
                      console.log('here');
                        this.$store.dispatch({type: "setFilter", filterBy: { isLiked: true }});
                        this.station = this.currStation;
                    }
                    // console.log(station || 'Liked station');
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