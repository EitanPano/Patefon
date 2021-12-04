<template>
    <header class="side-nav">
        <div class="logo-container">
        <img src="img/logo/patefon.png" alt="patefon">
        <h1><a class="logo" href="">Patefon</a></h1>
        </div>
        <nav>
            <ul class="main-nav" :class="menuOpen" @click="toggleMenu">
                <div class="main-links">
                    <span class="material-icons">home</span>
                    <span class="material-icons">search</span>
                    <router-link to="/"><span>🏠</span>Home</router-link>
                    <router-link to="/search"><span>🔍</span>Search</router-link>
                    <router-link to="/library"><span>📚</span>Your Library</router-link>
                </div>
                <router-link to="/edit"><span class="span-create">➕</span>Create Playlist</router-link>
                <router-link class="nav-liked" to="/station/liked"><span>❤</span>Liked Songs</router-link>
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
