<template>
    <div id="app">
        <landing-page v-if="!isLanded && isLanding" @explore="land" />
        <user-msg />
        <app-header />
        <side-nav />
        <play-bar />
        <transition name="page">
        <router-view />
        </transition>
    </div>
</template>

<script>
import landingPage from "./components/landing.vue";
import userMsg from "./components/user-msg.vue";
import appHeader from "./components/app-header.vue";
import sideNav from "./components/side-nav.vue";
import playBar from "./components/play-bar.vue";
export default {
    data() {
        return {
            isLanding: true
        };
    },
    components: {
        landingPage,
        appHeader,
        sideNav,
        playBar,
        userMsg,
    },
    methods: {
        land() {
            this.isLanding = false
            sessionStorage.setItem('isLanded', true)
        }
    },
    computed: {
        isLanded() {
            return JSON.parse(sessionStorage.getItem('isLanded'))
        }
    }
};
</script>


<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
