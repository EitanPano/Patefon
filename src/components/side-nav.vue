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
                    <router-link to="/library"><span class="icon-library">📚</span>Your Library</router-link>
                </div>
                <router-link to="/edit"><span class="icon-plus material-icons">add</span>Create Playlist</router-link>
                <router-link class="nav-liked" to="/station/liked"><span class="icon-heart material-icons">favorite</span>Liked Songs</router-link>
            </ul>
        </nav>
        <div class="burger-menu" @click="toggleMenu" :class="menuOpen">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isMenuOpen: false,
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
    },
    computed: {
        menuOpen() {
            return this.isMenuOpen ? "menu-open" : "";
        },
    },
};
</script>

<style>
</style>
