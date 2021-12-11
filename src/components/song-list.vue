<template>
  <section id="drop-zone" class="song-list" :class="searchList">
    <div v-if="!isSearch" class="flex actions">
      <button class="btn btn-play" @click="songToPlayer">
        <span class="material-icons">play_arrow</span>
      </button>
      <button
        @click="likeStation()"
        class="btn-blend btn-like"
        v-bind:class="{ liked: isLikedStation }"
      >
        <!-- v-if="notUsersStation" -->
        <span v-if="!isLikedStation" class="material-icons"
          >favorite_border</span
        >
        <span v-else class="material-icons">favorite</span>
      </button>
      <button @click="testLog()" class="btn-options btn-blend">
        <span>•••</span>
      </button>
    </div>
    <div class="sort-bar" v-if="!isSearch">
      <p>#</p>
      <p>TITLE</p>
      <p v-if="fixedGrid">DATE ADDED</p>
      <p class="last"><img src="@/assets/icons/time.svg" alt="" /></p>
    </div>

    <!-- <ul> -->
    <draggable
      :value="songs"
      class="drop-zone"
      tag="ul"
      v-bind="dragOptions"
      @start="grab"
      @end="drop"
      @change="swapped($event.moved)"
    >
      <!-- @change="testLog($event)" -->
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <li class="list-group-item" v-for="(song, idx) in songs" :key="idx">
          <song-preview
            :song="song"
            :idx="idx"
            @removeSong="removeSong"
            @songToPlayer="songToPlayer"
            @saveToHistory="saveToHistory"
            @likeSong="likeSong"
            :isSearch="isSearch"
            :isLikedPage="isLiked"
            :fixedGrid="fixedGrid"
          />
        </li>
      </transition-group>
    </draggable>
    <!-- </ul> -->
  </section>
</template>

<script>
import draggable from "vuedraggable";
import songPreview from "./song-preview.vue";
import { showMsg } from "../services/event-bus.service.js";

export default {
  components: {
    songPreview,
    draggable,
    showMsg,
  },
  display: "Transitions",
  props: ["songs", "isSearch", "isSearchHistory", "isLiked", "isLikedStation"],
  data() {
    return {
      drag: false,
      widthOutput: null,
    };
  },
  created() {
    this.widthOutput = window.innerWidth;
    window.addEventListener("resize", () => {
      this.widthOutput = window.innerWidth;
    });
  },
  methods: {
    testLog() {
      alert("N/A");
    },
    removeSong(songId) {
      this.$emit("removeSong", songId);
    },
    songToPlayer(song, idx) {
      this.$emit("songToPlayer", song, idx);
    },
    swapped(moved) {
      this.$emit("swapped", moved);
    },
    grab() {
      this.drag = true;
    },
    drop(ev) {
      this.drag = false;
      console.log(ev);
    },
    saveToHistory(action) {
      this.$emit("saveToHistory", action);
    },
    likeSong(action) {
      this.$emit("likeSong", action);
    },
    likeStation() {
      this.$emit("likeStation");
      if (this.isLikedStation) showMsg("Playlist Removed From Your Library");
      else showMsg("Playlist Added To Your Library");
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    notUsersStation() {
      let currStation = this.$store.getters.currStation;
      let usersCreatedStations = this.$store.getters.createdStations;
      let idx = usersCreatedStations.findIndex((id) => id === currStation._id);
      if (idx || idx === 0) return false;
      else return true;
    },
    searchList() {
      return this.isSearch ? "pl-0" : "";
    },
    fixedGrid() {
      return this.widthOutput <= 510 ? false : true;
    },
    // currStationSongs() {
    //     return this.$store.getters.currStation.songs;
    // },
  },
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #219760;
}
</style>