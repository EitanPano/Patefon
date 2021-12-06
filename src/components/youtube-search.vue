<template>
    <section class="global-search">
        <h2 class="highlight">Let's find something for your playlist</h2>
        <form action="" @submit.prevent="searchYoutube">
            <label for=""><span class="material-icons"> search</span><input type="search" v-model="searchInput" /></label>
        </form>
        <search-list :youtubeItems="youtubeItems" @addSong="addSong" />
    </section>
</template>

<script>
import { fetchService } from "../services/fetch.service.js";
import searchList from "./search-list.vue";
export default {
    components: {
        searchList,
    },
    data() {
        return {
            allYoutubeItems: [],
            youtubeItemsDurations: [],
            youtubeItems: [],
            searchInput: "",
        };
    },
    // destroyed() {
    //   this.allYoutubeItems= [];
    //     this.youtubeItemsDurations = [];
    //     this.youtubeItems= [];
    //     this.searchInput= "";
    // },
    methods: {
        async searchYoutube() {
            try {
                this.allYoutubeItems = await fetchService.fetchYoutubeVideos(
                    this.searchInput
                );
                let youtubeItems = this.allYoutubeItems.items;
                let prmDurations = [];
                for (var i = 0; i < youtubeItems.length; i++) {
                    const prm = fetchService.fetchYoutubeDuration(
                        youtubeItems[i].id.videoId
                    );
                    prmDurations.push(prm);
                }
                //    console.log(prmDurations)
                Promise.all(prmDurations).then((durations) => {
                    for (var i = 0; i < durations.length; i++) {
                        youtubeItems[i].duration = durations[i];
                    }
                    this.youtubeItemsDurations = youtubeItems;
                    this.youtubeItems = this.youtubeItemsDurations.slice(0, 5);
                });
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        addSong(song) {
            this.allYoutubeItems.items = this.allYoutubeItems.items.filter(
                (item) => item.id.videoId !== song.id
            );
            this.youtubeItems = this.allYoutubeItems.items.slice(0, 5);
            this.$emit("addSong", song);
        },
    },
};
</script>

<style>
</style>

