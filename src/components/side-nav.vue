<template>
    <header class="side-nav">
        <div class="logo-container">
        <img src="img/logo/patefon.png" alt="patefon">
        <h1><a class="logo" href="">Patefon</a></h1>
        </div>
        <nav>
            <ul class="main-nav" :class="menuOpen" @click="toggleMenu">
                <div class="main-links">
                    <router-link to="/">Home</router-link>
                    <router-link to="/search">Search</router-link>
                    <router-link to="/library">Library</router-link>
                </div>
                <router-link to="/edit">Create Playlist</router-link>
                <router-link to="/station/liked">Liked Songs</router-link>
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
