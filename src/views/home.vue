<template>
    <section class="main-layout layout-padding home">
        <div class="bg-animator"></div>
        <h1 class="highlight ">{{ userGreet }}</h1>
        <ul class="top-stations" >
            <most-liked-preview
                v-for="station in fixedTopStations"
                :key="station._id"
                :station="station"
            />
        </ul>
        <div
            class="station-list-container"
            v-for="(stations, genre) in stationsByGenre"
            :key="genre"
        >
            <div class="flex space-between">
                <h2 class="title mb-0">{{ genre }}</h2>
                <button
                    class="btn-blend bold mt-1"
                    @click="goToGenrePage(genre)"
                >
                    SEE ALL
                </button>
            </div>
            <station-list
                v-if="stationsByGenre"
                :stations="stations.slice(0, 8)"
            />
        </div>
    </section>
</template>

<script>
import stationList from "../components/station-list.vue";
import mostLikedPreview from "../components/most-liked-preview.vue";

export default {
    name: "Home",
    components: {
        stationList,
        mostLikedPreview,
    },
    data() {
        return {
            stations: [],
            genre: "",
            widthOutput: null,
        };
    },
    created() {
        this.widthOutput = window.innerWidth;
        window.addEventListener("resize", () => {
            this.widthOutput = window.innerWidth;
        });
    },
    methods: {
        goToGenrePage(genre) {
            this.$router.push(`/genre/${genre}`);
        },
    },
    computed: {
        userGreet() {
            const currHour = new Date().getHours()
            if (currHour < 12) return 'Good Morning'
            else if (currHour < 18) return 'Good Afternoon'
            else return 'Good Evening'
        },
        stationsByGenre() {
            return this.$store.getters.stationsByGenre;
        },
        mostLikedStations() {
            let mostLikedStations = this.findMostLikedStations(
                this.$store.getters.getStations
            );
            return mostLikedStations;
        },
        fixedTopStations() {
            let topStation = this.$store.getters.getStations
            if (this.widthOutput <= 588) return topStation.sort((a, b) => b.likesCounter - a.likesCounter).slice(0, 2)
            if (this.widthOutput <= 768) return topStation.sort((a, b) => b.likesCounter - a.likesCounter).slice(0, 4)
            if (this.widthOutput <= 842) return topStation.sort((a, b) => b.likesCounter - a.likesCounter).slice(0, 2)
            if (this.widthOutput <= 1143) return topStation.sort((a, b) => b.likesCounter - a.likesCounter).slice(0, 4)
            if (this.widthOutput <= 1444) return topStation.sort((a, b) => b.likesCounter - a.likesCounter).slice(0, 6)
            if (this.widthOutput <= 1745) return topStation.sort((a, b) => b.likesCounter - a.likesCounter).slice(0, 8)
            if (this.widthOutput <= 2046) return topStation.sort((a, b) => b.likesCounter - a.likesCounter).slice(0, 10)
            if (this.widthOutput <= 2347) return topStation.sort((a, b) => b.likesCounter - a.likesCounter).slice(0, 12)
            if (this.widthOutput <= 2648) return topStation.sort((a, b) => b.likesCounter - a.likesCounter).slice(0, 14)
            if (this.widthOutput <= 2949) return topStation.sort((a, b) => b.likesCounter - a.likesCounter).slice(0, 16)
            else return topStation.sort((a, b) => b.likesCounter - a.likesCounter).slice(0, 16)
        },
    },
};
</script>
