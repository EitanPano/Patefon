<template>
  <div id="app">
    <app-header />
    <side-nav />
    <play-bar />
    <router-view />
  </div>
</template>

<script>
import appHeader from "./components/app-header.vue";
import sideNav from "./components/side-nav.vue";
import playBar from "./components/play-bar.vue";
export default {
  data() {
    return {};
  },
  components: {
    appHeader,
    sideNav,
    playBar,
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
