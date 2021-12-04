<template>
    <section class="edit main-layout station">
        <main>
            <img-upload :passedImgUrl="emptyStation.imgUrl" class="station-img" @imageSaved="saveImageUrl" />
            <div class="flex column">
                <div>
                    <p class="highlight small">PLAYLIST</p>
                    <button class="btn btn-edit big" @click="isModalOpen = true"><span>✎</span></button>
                </div>
                <h1 @click="isModalOpen = true">My playlist</h1>
                <div>
                    <span class="highlight small">Guest</span>
                    <button class="btn-save-details" @click="saveStation">Add +</button>
                </div>
            </div>
        </main>

        <transition name="fade">
        <!-- Modal Start -->
        <div @click="isModalOpen = false" v-if="isModalOpen" class="modal-wrapper">
            <div @click.stop v-if="isModalOpen" class="modal-edit flex column">

                <div class="mb-1 flex space-between align-center">
                    <h2>Edit Details</h2>
                    <button @click="isModalOpen = false" class="btn btn-close">✖</button>
                </div>
                <div class="flex space-between mb-1">
                    <img-upload :passedImgUrl="emptyStation.imgUrl" class="edit-img" @imageSaved="saveImageUrl" />

                    <div class="edit-details">
                        <label><input class="edit-title" type="text" v-model="emptyStation.name" placeholder="My Playlist #"/></label>

                        <div class="selects-box">
                            <select @change="addTag" v-model="tag">
                                <option value="" disabled>Choose Tags</option>
                                <!-- <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option -->

                                <option value="cool">Cool</option>
                                <option value="chill">Chill</option>
                                <option value="happy">Happy</option>
                                <option value="broadcast">Broadcast</option>
                                <option value="sad">Sad</option>
                            </select>

                            <select v-model="emptyStation.genre">
                                <option value="" disabled>Choose Genres</option>
                                <!-- <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option -->

                                <option value="hiphop">Hip Hop</option>
                                <option value="rock">Rock</option>
                                <option value="pop">Pop</option>
                                <option value="classic">Classic</option>
                                <option value="jazz">Jazz</option>
                            </select>
                        </div>
                        <textarea v-model="emptyStation.description" class="edit-description" placeholder="Add an optional description" />
                    </div>
                </div>
                <div class="mb-1 flex space-between">
                    <!-- v-if="emptyStation.tags.length" -->
                    <p>Tags : <span v-for="tag in emptyStation.tags" :key="tag">{{ tag }}, </span></p>
                    <button class="btn-save-details" @click="isModalOpen = false">SAVE</button>
                </div>
                <p class="p-small">By proceeding, you agree to give Patefon access to the image you choose to upload. Please make sure you have the right to upload the image.</p>

            </div>
        </div>
        <!-- Modal End -->
        </transition>


        <song-list v-if="emptyStation.songs.length" :songs="emptyStation.songs" @removeSong="removeSong" />

        <youtube-search @addSong="addSong" />
    </section>
</template>

<script>
import SongList from "../components/song-list.vue";
import youtubeSearch from "../components/youtube-search.vue";
import { stationService } from "../services/station.service";
import imgUpload from "../components/img-upload.vue";
export default {
    components: {
        youtubeSearch,
        SongList,
        imgUpload,
    },
    data() {
        return {
            emptyStation: null,
            tag: "",
            isModalOpen: false,

        };
    },
    created() {
        this.emptyStation = stationService.getEmptystation();
    },
    methods: {
        addSong(song) {
            // console.log(song)
            song.isLiked = false;
            this.emptyStation.songs.push(song);
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
            this.emptyStation.createdBy = JSON.parse(sessionStorage.getItem("loggedInUser"));
            this.emptyStation.imgUrl = (this.emptyStation.imgUrl)
            ? this.emptyStation.imgUrl
            : 'https://res.cloudinary.com/nir-cloudinary/image/upload/v1638537772/upload.1be8b030_yhazsy.svg'

            console.log(this.emptyStation);
            try {
                await this.$store.dispatch({
                    type: "addStation",
                    newStation: this.emptyStation,
                });
                this.emptyStation = stationService.getEmptystation();
                this.$router.push("/");
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>

<style>
</style>
