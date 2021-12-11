<template>
    <article
        class="song-preview"
        @mouseleave="isHover = false"
        @mouseover="isHover = true"
    >
        <button
            v-if="isHover"
            @click="songToPlayer(song, idx)"
            class="size-btn first play"
        >
            ▶
        </button>
        <p v-else class="first song-idx">{{ idx + 1 }}</p>
        <div class="song-details">
            <img :src="song.imgUrl" />
            <p class="song-title">{{ song.title }}</p>
        </div>
        <p v-if="fixedGrid">{{ showSongCreatedAt }}</p>
        <div class="last song-actions">
            <button
                class="btn btn-like"
                @click="likeSong"
                v-bind:class="{ liked: isLiked }"
            >
                ❤
            </button>
            <p v-if="!isOpenRemoveModal">{{ song.duration }}</p>
            <button
                @click="openRemoveModal"
                v-if="isHover && !isSearch && !isLiked && !isOpenRemoveModal"
                class="btn btn-delete"
            >
                ✖
            </button>
            <div class="removeModal" v-if="isOpenRemoveModal">
                Are You Sure? <button @click="removeSong(song.id)">🗑</button>
            </div>
        </div>
        <!-- && !isLikedStation -->
    </article>
</template>

<script>
import { showMsg } from "../services/event-bus.service.js";
export default {
    props: [
        "song",
        "idx",
        "isSearch",
        "isSearchHistory",
        "isLikedPage",
        "fixedGrid",
    ],
    data() {
        return {
            isHover: false,
            isOpenRemoveModal: false,
        };
    },
    methods: {
        removeSong(songId) {
            this.$emit("removeSong", songId);
            showMsg(this.song.title + " has been removed");
        },
        songToPlayer(song, idx) {
            this.$emit("songToPlayer", song, idx, this.isSearchHistory);
            if (this.isSearch) {
                this.$emit("saveToHistory", {
                    song: this.song,
                    type: "history",
                });
            }
        },
        likeSong() {
            this.$emit("likeSong", { song: this.song, type: "like" });
        },
        checkIfSongLiked(likedSongs) {
            var idx = likedSongs.findIndex(
                (likedSong) => likedSong.id === this.song.id
            );
            if (idx < 0) return false;
            return true;
        },
        openRemoveModal() {
            this.isOpenRemoveModal = true;
            setTimeout(() => {
                this.isOpenRemoveModal = false;
            }, 2000);
        },
    },
    computed: {
        isLiked() {
            let likedSongs = this.$store.getters.likedSongs;
            if (likedSongs && likedSongs.length)
                return this.checkIfSongLiked(likedSongs);
            else return false;
        },
        user() {
            return this.$store.getters.getLoggedUser;
        },
        showSongCreatedAt() {
            if (Date.now() - this.song.createdAt < 1000 * 60 * 5)
                return "Just Now";
            else if (Date.now() - this.song.createdAt < 1000 * 60 * 60)
                return "Last Hour";
            else if (Date.now() - this.song.createdAt < 1000 * 60 * 60 * 24)
                return "Today";
            else if (Date.now() - this.song.createdAt < 1000 * 60 * 60 * 24 * 2)
                return "Yesturday";
            else if (Date.now() - this.song.createdAt < 1000 * 60 * 60 * 24 * 7)
                return "Week Ago";
            else if (
                Date.now() - this.song.createdAt <
                1000 * 60 * 60 * 24 * 28
            )
                return "Month Ago";
            else if (
                Date.now() - this.song.createdAt >
                1000 * 60 * 60 * 24 * 28
            )
                return "Long Time";
        },
    },
};
</script>

<style>
</style>

