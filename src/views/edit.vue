<template>
  <section class="edit main-layout station">
    <main>
      <img-upload
        :passedImgUrl="emptyStation.imgUrl"
        class="station-img"
        @imageSaved="saveImageUrl"
      />
      <div class="flex column">
        <div>
          <p class="highlight small">PLAYLIST</p>
          <button class="btn btn-edit big" @click="isModalOpen = true">
            <span>✎</span>
          </button>
        </div>
        <h1 @click="isModalOpen = true">My playlist</h1>
        <div class="flex space-between">
          <span class="highlight small">Guest</span>
          <button
            class="btn-create"
            @click="saveStation"
            :disabled="!emptyStation.songs.length"
          >
            CREATE
          </button>
        </div>
      </div>
    </main>

    <div v-if="!emptyStation.songs.length" class="options">
      <button @click="testLog()" class="btn-options btn-blend">
        <span>•••</span>
      </button>
      <hr class="margin-0 pl-1" />
    </div>

    <song-list
      v-if="emptyStation.songs.length"
      :songs="emptyStation.songs"
      @removeSong="removeSong"
      @songToPlayer="songToPlayer"
    />
    <youtube-search @addSong="addSong" />

    <!-- Modal Start -->
    <transition name="fade">
      <div
        @click="isModalOpen = false"
        v-if="isModalOpen"
        class="modal-wrapper"
      >
        <div @click.stop v-if="isModalOpen" class="modal-edit flex column">
          <div class="mb-1 flex space-between align-center">
            <h2>Edit Details</h2>
            <button @click="isModalOpen = false" class="btn btn-close">
              ✖
            </button>
          </div>
          <div class="flex space-between mb-1">
            <img-upload
              :passedImgUrl="emptyStation.imgUrl"
              class="edit-img"
              @imageSaved="saveImageUrl"
            />

            <div class="edit-details">
              <label
                ><input
                  class="edit-title"
                  type="text"
                  v-model="emptyStation.name"
                  placeholder="My Playlist #"
              /></label>

              <div class="selects-box">
                <!-- <select @change="addTag" v-model="tag">
                                    <option value="" disabled>
                                        Choose Tags
                                    </option>
                                    <option
                                        v-for="tag in tags"
                                        :key="tag"
                                        :value="tag"
                                    >
                                        {{ tag }}
                                    </option>
                                </select> -->

                <v-select
                  v-model="emptyStation.tags"
                  id="mySelect"
                  class="style-chooser select-multiple"
                  :options="tags"
                  placeholder="Choose Tags"
                  multiple
                ></v-select>

                <v-select
                  v-model="emptyStation.genre"
                  id="mySelect"
                  class="style-chooser"
                  :options="genres"
                  placeholder="Genre"
                ></v-select>
                <!-- <select v-model="emptyStation.genre">
                                    <option value="" disabled>
                                        Choose Genres
                                    </option>
                                    <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
                                </select> -->
              </div>
              <textarea
                v-model="emptyStation.description"
                class="edit-description"
                placeholder="Add an optional description"
              />
            </div>
          </div>
          <div class="mb-1 flex space-between">
            <!-- v-if="emptyStation.tags.length" -->
            <p>
              Tags :
              <span v-for="tag in emptyStation.tags" :key="tag"
                >{{ tag }},
              </span>
            </p>
            <button class="btn-save-details" @click="isModalOpen = false">
              SAVE
            </button>
          </div>
          <p class="p-small">
            By proceeding, you agree to give Patefon access to the image you
            choose to upload. Please make sure you have the right to upload the
            image.
          </p>
        </div>
      </div>
    </transition>
    <!-- Modal End -->
  </section>
</template>

<script>
import { showMsg } from "../services/event-bus.service.js";
import SongList from "../components/song-list.vue";
import youtubeSearch from "../components/youtube-search.vue";
import { stationService } from "../services/station.service";
import imgUpload from "../components/img-upload.vue";
import vSelect from "vue-select";

export default {
  components: {
    youtubeSearch,
    SongList,
    imgUpload,
    vSelect,
  },
  data() {
    return {
      emptyStation: null,
      tag: "",
      isModalOpen: false,
      genres: [
        "Hip Hop",
        "Rock",
        "Pop",
        "Classic",
        "Jazz",
        "Mix",
        "Israeli",
        "Electronic",
        "Latin",
        "Hits",
        "Prog",
        "Raggae",
      ],
      tags: [
        "Cool",
        "Chill",
        "Happy",
        "Broadcast",
        "Sad",
        "Original",
        "Fantastic",
        "Curious",
      ],
    };
  },
  created() {
    this.emptyStation = stationService.getEmptystation();
    // this.emptyStation.createdBy = this.$store.getters.loggedUser.username;
  },
  methods: {
    testLog() {
      alert("N/A");
    },
    addSong(song) {
      // console.log(song)
      song.isLiked = false;
      song.createdAt = Date.now();
      this.emptyStation.songs.push(song);
      showMsg(song.title+" has been added");
    },
    addTag() {
      if (this.emptyStation.tags.includes(this.tag)) return;
      this.emptyStation.tags.push(this.tag);
      this.tag = "";
    },
    saveImageUrl(imgUrl) {
      this.emptyStation.imgUrl = imgUrl;
    },
    removeSong(songId) {
      const idx = this.emptyStation.songs.findIndex(
        (song) => song.id === songId
      );
      this.emptyStation.songs.splice(idx, 1);
    },
    async saveStation() {
      const user = JSON.parse(sessionStorage.getItem("user"));
      this.emptyStation.createdBy = {
        userId : user._id,
        name : user.username.charAt(0).toUpperCase() + user.username.slice(1,user.username.length),
      }
      this.emptyStation.imgUrl = this.emptyStation.imgUrl
        ? this.emptyStation.imgUrl
        : "https://res.cloudinary.com/nir-cloudinary/image/upload/v1638537772/upload.1be8b030_yhazsy.svg";

      console.log(this.emptyStation);
      try {
        let addedStation = await this.$store.dispatch({
          type: "addStation",
          newStation: this.emptyStation,
        });
        console.log("added station", addedStation);
        await this.$store.dispatch({
          type: "updateUserCreatedStations",
          station: addedStation,
        });
        this.emptyStation = stationService.getEmptystation();
        this.$router.push("/library");
        showMsg("Station has been added");
      } catch (err) {
        console.log(err);
      }
    },
    songToPlayer(song, idx) {
      this.$store.commit({
        type: "songToPlayer",
        song,
        idx,
        station: {
          songs: JSON.parse(JSON.stringify(this.emptyStation.songs)),
        },
      });
    },
  },
};
</script>

<style>
.style-chooser.select-multiple {
  width: 55%;
  height: 3em;
}

.style-chooser {
  width: 40%;
  height: 3em;
}

.style-chooser .vs__actions {
  position: absolute;
  right: 0;
  height: 100%;
  z-index: 20;

  background: #3f3f3f;
}

#mySelect .vs__dropdown-toggle {
  height: 100%;
}
.style-chooser .vs__search,
.style-chooser span.vs__selected {
  color: white;
  white-space: nowrap;
  font-size: 0.9em;
  height: 3em;
  /* font-weight: bold; */
}
.select-multiple .vs__selected-options {
  overflow: hidden;
  height: 80%;
  /* margin-top: -2px; */
  max-width: 90%;
}

.select-multiple .vs__selected-options .vs__selected {
  font-size: 0.8em;
  color: black;
  font-weight: bold;
  height: 50%;
}
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #3f3f3f;
  border: none;
  color: #fff;
}

.style-chooser .vs__dropdown-menu {
  margin: 0.25em 0;
  font-size: 0.9em;
  overflow-y: auto;
  width: 100%;
  max-height: 15em;
}

.style-chooser .vs__dropdown-option {
  /* background-color: ; */
  /* width: fit-content; */
  max-width: 10em;
  color: white;
  padding: 0.2em 0.5em;
  margin: 0 auto;
  width: 100%;
}

.style-chooser .vs__dropdown-option--highlight {
  background-color: #5f5f5f;
  color: white;
  font-weight: bold;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #ffffff;
}
</style>
