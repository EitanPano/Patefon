<template>
    <div id="app">
        <landing-page v-if="isLanding" @explore="isLanding = !isLanding" />
        <user-msg />
        <app-header />
        <side-nav />
        <play-bar />
        <router-view />
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
