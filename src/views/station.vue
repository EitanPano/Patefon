<template>
    <section class="main-layout">
        <h1>Station view</h1>
        <song-list v-if="station" :songs="station.songs" />
        <!-- {{ currStation }} -->
    </section>
</template>

<script>
import songList from "../components/song-list.vue";
import { stationService } from "../services/station.service.js";
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