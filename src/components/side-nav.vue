<template>
    <header class="app-header">
        <h1><a class="logo" href=""></a></h1>
        <div class="logo"></div>
        <nav>
            <ul class="main-nav" :class="menuOpen" @click="toggleMenu">
                <router-link to="/">Home</router-link>
                <router-link to="/search">Search</router-link>
                <router-link to="/library">Library</router-link>

                <router-link to="edit">Create Playlist</router-link>
                <router-link to="station/liked">Liked Songs</router-link>







                <!-- <router-link to="/about">About</router-link> -->
                <!-- <li>
                    <router-link to="/" exact></router-link>
                </li>
                <li>
                    <router-link to="/about"></router-link>
                </li> -->
                <!-- <li>
                    <router-link to="/keep"></router-link>
                </li>
                <li>
                    <router-link to="/book"
                    ></router-link>
                </li>
                <li>
                    <router-link to="/about"></router-link>
                </li> -->
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
