<template>
  <aside class="top-bar" :style="'background-color:' + topBar">
    <!-- <h1>TOP BAR</h1> -->
    <div class="header-btns">
      <button @click="goBack()">
        <span class="arrow-backward material-icons"> arrow_back_ios </span>
      </button>
      <button @click="goNext()">
        <span class="arrow-forward material-icons"> arrow_forward_ios </span>
      </button>
      <!-- <div class="library-bar flex" v-if="isLibrary"></div> -->
    </div>
    <div
      class="login-signup-btn flex justify-center align-center"
      v-if="!loggedUser"
    >
      <button class="">Continue As Guest</button> |
      <button class="" @click="goToLoginPage">Login</button>
    </div>
    <form>
      <label
        ><input
          class="search-local"
          type="search"
          placeholder="Search"
          v-if="isSearch"
          @input="filterSongs"
          v-model="filterBy.txt"
      /></label>
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
      scrollOffsetY: null,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    filterBy() {
      return JSON.parse(JSON.stringify(this.$store.getters.filterBy));
    },

    loggedUser() {
      // console.log(this.$store.getters.loggedUser);
      return this.$store.getters.loggedUser;
    },
    fullName() {
      var strArr = this.loggedUser.fullname.split(" ");
      var capitalizeArr = strArr.map((name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
      });
      return capitalizeArr.join(" ");
    },
    topBar() {
      if (this.scrollOffsetY < 60) return "transparent";
      else if (this.scrollOffsetY < 120) return "rgba(50,50,50,0.5)";
      else return "rgba(50,50,50,0.97)";
    },
  },
  methods: {
    handleScroll() {
      this.scrollOffsetY = window.scrollY;
    },
    async filterSongs() {
      if (this.filterBy.txt === "") {
        console.log("hello");
        this.$store.commit({ type: "clearSearch" });
      }
      // console.log(this.filterBy.txt, "from appheader cmp");
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
    goBack() {
      console.log("back");
    },
    goNext() {
      console.log("next");
    },
    setCurrPage() {
      this.$store.commit({
        type: "setCurrPage",
        link: this.$route.params,
      });
    },
    setNextPage() {},
    goToLoginPage() {
      this.$router.push(`/auth`);
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
};
</script>

<style>
</style>