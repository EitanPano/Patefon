<template>
    <section class="main-layout">
        <h1 class="full">Playlists</h1>
        <div class="grid-container full">
            <aside @click="goLikedSongs" class="btn-liked-songs">
                <p>Lorem ipsum dolor sit amet consectetur</p>
                <h2>Liked Songs</h2>
                <p><span>0</span> liked songs</p>
            </aside>
            <template v-for="station in stations">
                <station-preview :station="station" :key="station._id" />
            </template>
        </div>
    </section>
</template>

<script>
import stationPreview from '@/components/station-preview.vue'
export default {
    methods: {
        goLikedSongs() {
            this.$router.push('station/liked')
        }
    },
    computed: {
        stations() {
            return this.$store.getters.getStations
        }
    },
    components: {
        stationPreview
    }
}
</script>

<style>

</style>