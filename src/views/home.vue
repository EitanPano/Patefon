<template>
    <section class="main-layout home-page">
        <h1 class="highlight">Good Evening</h1>
        <div class="station-list-container" v-for="(stations, genre) in stationsByGenre" :key="genre">
            <div class="flex space-between">
                <h2 class="title">{{ genre }}</h2>
                <button class="btn-blend bold" @click="goToGenrePage(genre)">SEE ALL</button>
            </div>
            <station-list
                v-if="stationsByGenre"
                :stations="stations.slice(0, 8)"
            />
        </div>
    </section>
</template>

<script>
import { stationService } from "../services/station.service.js";
import stationList from "../components/station-list.vue";
export default {
    name: "Home",
    components: {
        stationList,
    },
    created() {
        // this.setGuestUser();
        // this.$store.commit({type:'setInitalStation'});
    },
    data() {
        return {
            stations: [],
            genre: "",
        };
    },
    methods: {
        setGuestUser() {
            sessionStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    name: "Patefon",
                    imgUrl: "https://res.cloudinary.com/nir-cloudinary/image/upload/v1638375320/patefon_olzyeg.png",
                    id: "111",
                })
            );
        },
        goToGenrePage(genre) {
            this.$router.push(`/genre/${genre}`);
        },
    },
    computed: {
        stationsByGenre() {
            return this.$store.getters.stationsByGenre;
        },
    },
};
</script>
