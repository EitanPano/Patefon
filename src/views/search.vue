<template>
    <section class="search main-layout layout-padding">
        <div class="no-result-msg" v-if="!songs && filterBy">
            <h2>No Result for "{{ filterBy }}"</h2>
        </div>

        <div
            class="search-history-preview"
            v-if="
                searchHistory &&
                searchHistory.length &&
                !stations &&
                !songs &&
                !filterBy
            "
        >
            <h2 class="highlight">Recently Searched</h2>
            <song-list :songs="searchHistory" @songToPlayer="songToPlayerHistory" :isSearch="true" @likeSong="updateUser" />
        </div>

        <div v-if="!stations && !songs">
            <h2 class="highlight">Browse By Genres</h2>
            <ul class="genre-container">
                <li class="genre-list" v-for="(value, genre, idx) in stationsByGenre" :key="idx"
                >
                    <genre-preview :genre="genre" :imgUrl="value[0].imgUrl" />
                </li>
            </ul>
        </div>

        <main class="main-container">
            <div v-if="songs" class="top-search-result">
                <h2 class="highlight">Top result</h2>
                <article @mouseleave="isHover = false" @mouseenter="isHover = true" >
                    <img :src="songs[0].imgUrl" alt="" />
                    <transition name="fade">
                        <button v-if="isHover" class="btn btn-play">
                            <span class="material-icons">play_arrow</span>
                        </button>
                    </transition>
                    <p class="highlight">{{ topResultName }}</p>
                </article>
            </div>

            <div class="songs-preview-search" v-if="songs">
                <h2 class="highlight">Songs</h2>
                <song-list :songs="songs.slice(0, 4)" :isSearch="true" @songToPlayer="songToPlayer" @likeSong="updateUser" @saveToHistory="updateUser" />
            </div>
        </main>

        <div class="stations-preview-search" v-if="stations">
            <h2 class="highlight">Appears In</h2>
            <ul class="grid-container">
                <li v-for="station in stations" :key="station._id">
                    <station-preview class="station-card" :station="station" />
                </li>
            </ul>
        </div>

        <div>
            <router-view></router-view>
        </div>
    </section>
</template>

<script>
import { eventBusService } from "../services/event-bus.service.js";
import songPreview from "../components/song-preview.vue";
import songList from "../components/song-list.vue";
import stationPreview from "../components/station-preview.vue";
import genrePreview from "../components/genre-preview.vue";

export default {
    data() {
        return {
            isHover: false,
            stationsForPreview: [],
        };
    },
    computed: {
        topResultName() {
            const text = this.songs[0].title;
            const pattern = new RegExp("^[^-]*[^ -]");
            return text.match(pattern).toString();
        },
        stations() {
            return this.$store.getters.getExpandedStations.stations;
        },
        songs() {
            return this.$store.getters.getExpandedStations.songs;
        },
        searchHistory() {
            return this.$store.getters.searchHistory;
        },
        stationsByGenre() {
            return this.$store.getters.stationsByGenre;
        },
        isClicked() {
            return this.$store.getters.isClicked;
        },
        filterBy() {
            return this.$store.getters.filterBy.txt;
        },
    },
    methods: {
        songToPlayerHistory(song, idx) {
            this.$store.commit({
                type: "songToPlayer",
                song,
                idx,
                station: {
                    songs: JSON.parse(
                        JSON.stringify(Array.from(this.searchHistory))
                    ),
                },
            });
        },
        songToPlayer(song, idx) {
            this.$store.commit({
                type: "songToPlayer",
                song,
                idx,
                station: {
                    songs: JSON.parse(JSON.stringify(Array.from(this.songs))),
                },
            });
        },
        updateUser(action) {

            if (!this.isClicked && action.type === "history") {
                this.$store.dispatch({
                    type: "updateUser",
                    action,
                });
                this.$store.commit({ type: "setClicked", boolState: true });
                return;
            }
            this.$store.dispatch({
                type: "updateUser",
                action,
            });
        },
    },
    destroyed() {
        this.$store.commit({ type: "setClicked", boolState: false });
        this.$store.dispatch({
            type: "setFilter",
            filterBy: { txt: "" },
        });
        this.$store.commit({ type: "clearSearch" });
    },
    components: {
        eventBusService,
        songPreview,
        songList,
        stationPreview,
        genrePreview,
    },
};
</script>
