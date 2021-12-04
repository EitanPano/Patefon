<template>
  <aside class="top-bar">
    <!-- <h1>TOP BAR</h1> -->
    <div class="header-btns">
      <button><span class="arrow-backward material-icons"> arrow_back_ios </span></button>
      <button><span class="arrow-forward material-icons"> arrow_forward_ios </span></button>
      
        <!-- <div class="library-bar flex" v-if="isLibrary"></div> -->
      
    </div>
        <form>
          <label><input class="search-local" type="search" placeholder="Search" v-if="isSearch" @input="filterSongs" v-model="filterBy.txt" /></label>
        </form>



    <div class="account-menu">
      <button class="account-btn clear-btn flex justify-center align-center">
        <template v-if="loggedUser">
          <img src="" v-if="loggedUser.imgUrl" />
          <span class="user-icon material-icons" v-else> account_circle </span>
          <p class="highlight small">{{ loggedUser.name }}</p>
        </template>
        <template v-else>
          <span class="user-icon material-icons"> account_circle </span>
          <p class="highlight small">Guest</p>
        </template>
        <span class="arrow-down material-icons">⏷</span>
      </button>
    </div>
  </aside>
</template>

<script>
// import func from "vue-editor-bridge";
import { eventBusService } from "../services/event-bus.service.js";
export default {
  data() {
    return {
      isSearch: false,
      loggedUser: {
        name: "Guest",
      },
      filterBy: {
        txt: "",
      },
    };
  },
  methods: {
    async filterSongs() {
      if (this.filterBy.txt === "") {
        console.log("hello");
        this.$store.commit({ type: "clearSearch" });
      }
      console.log(this.filterBy.txt, "from appheader cmp");
      try {
        var stations = await this.$store.dispatch({
          type: "loadStations",
          filterBy: this.filterBy,
        });
        // eventBusService.$emit("getStations", stations);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  watch: {
    $route: {
      async handler() {
        try {
          // console.log(this.$route);
          if (this.$route.name === "Search") this.isSearch = true;
          else this.isSearch = false;
        } catch (err) {
          console.log(err);
        }
      },
      immediate: true,
    },
  },
  components: {
    eventBusService,
  },
};
</script>

<style>
</style>