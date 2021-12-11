<template>
    <header class="side-nav">
        <div class="logo-container">
        <img src="img/logo/patefon.png" alt="patefon">
        <h1><a class="logo" href="">Patefon</a></h1>
        </div>
        <nav>
            <ul class="main-nav" :class="menuOpen" @click="toggleMenu">
                <div class="main-links">
                    <router-link to="/"><span class="icon-home material-icons">home</span>Home</router-link>
                    <router-link to="/search"><span class="icon-search material-icons">search</span>Search</router-link>
                    <router-link to="/library"><span class="icon-library">📚</span>{{libraryName}}</router-link>
                </div>
                <router-link to="/edit"><span class="icon-plus material-icons">add</span>{{ createPlaylistName }}</router-link>
                <router-link class="nav-liked" to="/station/liked"><span class="icon-heart material-icons">favorite</span>{{ likedSongsName }}</router-link>

                <div class="share-listen">
                    <button v-if="widthOutput >= 768 || $route.name !== 'Search'" class="btn-share-listen" @click="share"> Share Listening </button>
                    <announcements />
                </div>
            </ul>
              
        </nav>
    </header>
</template>

<script>
import announcements from '../components/announcements.vue';
import {socketService} from '../services/socket.service.js';
import { showMsg } from "../services/event-bus.service.js";
export default {
    components : {
announcements
    },
    data() {
        return {
            isMenuOpen: false,
            widthOutput: null,
            user : JSON.parse(sessionStorage.getItem('user')),
        }
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
           share () {
        if (this.currStationForPlayer.length === 0) {
        showMsg("Please play a song, from a playlist");
        return
      }
         socketService.emit('send announcements', {stationId: this.currStationForPlayer._id, from:this.user.username});
    }
    },
    created() {
        this.widthOutput = window.innerWidth;
        window.addEventListener("resize", () => {
            this.widthOutput = window.innerWidth;
        });
        console.log('currPath',this.$route.name);
    },
    computed: {
        menuOpen() {
            return this.isMenuOpen ? "menu-open" : "";
        },
        libraryName() {
            return (this.widthOutput > 768) ? 'Your Library' : 'Library'
        },
        createPlaylistName() {
            return (this.widthOutput > 768) ? 'Create Playlist' : 'Playlist'
        },
        likedSongsName() {
            return (this.widthOutput > 768) ? 'Liked Songs' : 'Liked'
        },
        currStationForPlayer() {
            return this.$store.getters.currStationForPlayer;
        }
        
    },

};
</script>

<style>
</style>
