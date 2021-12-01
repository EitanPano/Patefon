<template>
  <aside class="top-bar">
    <!-- <h1>TOP BAR</h1> -->
    <div class="header-btns">
      <button>
        <span class="material-icons"> arrow_back_ios </span>
      </button>
      <button>
        <span class="material-icons"> arrow_forward_ios </span>
      </button>
    </div>

    <form>
      <input type="search" placeholder="Search" v-if="isSearch" />
      <!-- <div class="library-bar flex" v-if="isLibrary"></div> -->
    </form>

    <div class="account-menu">
      <button class="account-btn clear-btn flex justify-center align-center">
        <template v-if="loggedUser">
          <img src="" v-if="loggedUser.imgUrl" />
          <span class="user-icon material-icons" v-else> account_circle </span>
          <p>{{ loggedUser.name }}</p>
        </template>
        <template v-else>
          <span class="user-icon material-icons"> account_circle </span>
          <p>Guest</p>
        </template>
        <span class="arrow-down material-icons"> keyboard_arrow_down </span>
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      isSearch: "search",
      loggedUser: {
        name: "Mark Fishman",
      },
    };
  },
watch: {
    $route: {
      async handler() {
        try {
          console.log(this.$route);
          if (this.$route.name === "Search") this.isSearch = true;
          else this.isSearch = false;
        } catch (err) {
          console.log(err);
        }
      },
      immediate: true,
    },
}
};
</script>

<style>
</style>