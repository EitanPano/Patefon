<template>
  <aside class="top-bar" :style="'background-color:' + topBar">
    <!-- <h1>TOP BAR</h1> -->
    <div class="header-btns">
      <button @click="goBack()">
        <span class="arrow-backward material-icons"> arrow_back_ios </span>
      </button>
      <button
        :disabled="isDisabled"
        v-bind:class="{ disabled: isDisabled }"
        @click="goNext()"
      >
        <span class="arrow-forward material-icons"> arrow_forward_ios </span>
      </button>
      <!-- <div class="library-bar flex" v-if="isLibrary"></div> -->
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
    <div @click="isUserMenu = !isUserMenu" class="account-menu">
      <button class="account-btn clear-btn flex justify-center align-center">
        <template v-if="loggedUser">
          <img src="" v-if="loggedUser.imgUrl" />
          <span class="user-icon material-icons" v-else> account_circle </span>
          <p class="highlight small">{{ fullName }}</p>
        </template>
        <template v-else>
          <span class="user-icon material-icons"> account_circle </span>
          <p class="highlight small">Guest</p>
        </template>
        <span class="arrow-down material-icons">⏷</span>
      </button>
    </div>

    <transition name="fade">
      <div @click="isUserMenu = false" class="user-menu" v-if="isUserMenu">
        <router-link to="/auth" v-if="loggedUser.username === 'guest'"
          >Sign In</router-link
        >
        <a v-else @click="logout">Log Out</a>
        <router-link to="/about">About</router-link>
      </div>
    </transition>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      isUserMenu: false,
      isSearch: false,
      scrollOffsetY: null,
      currPage: null,
      isDisabled: false,
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
      return this.$store.getters.loggedUser;
    },
    fullName() {
      const username = this.loggedUser.username;
      return username[0].toUpperCase() + username.slice(1);
    },
    topBar() {
      if (this.scrollOffsetY < 60) return "transparent; box-shadow: none;";
      else if (this.scrollOffsetY < 120)
        return "rgba(50,50,50,0.5); box-shadow: none;";
      else
        return "rgba(50,50,50,0.97); box-shadow: inset 8em 0 3em 0 rgb(20, 20, 20);";
    },
  },
  methods: {
    goBack() {
      console.log("hello");
      this.$router.go(-1);
    },
    goNext() {
      console.log("hello?");
      switch (this.currPage) {
        case "Home":
          this.$router.push("/search");
          break;
        case "Search":
          this.$router.push("/library");
          break;
        case "Library":
          this.$router.push("/");
          break;
      }
    },
    handleScroll() {
      this.scrollOffsetY = window.scrollY;
    },
    logout() {
      this.$store.dispatch({ type: "setLogout" });
    },
    async filterSongs() {
      if (this.filterBy.txt === "") {
        this.$store.commit({ type: "clearSearch" });
      }
      try {
        await this.$store.dispatch({
          type: "loadStations",
          filterBy: this.filterBy,
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    setCurrPage() {
      this.$store.commit({
        type: "setCurrPage",
        link: this.$route.params,
      });
    },
  },
  watch: {
    $route: {
      async handler() {
        try {
          this.currPage = this.$route.name;
          this.isSearch = (this.currPage === 'Search')
          this.isDisabled = (
            this.currPage !== 'Search' &&
            this.currPage !== 'Home' &&
            this.currPage !== 'Library'
            )
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