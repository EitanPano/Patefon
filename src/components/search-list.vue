<template>
    <ul class="search-list">
        <search-preview
            v-for="youtubeItem in youtubeItems"
            :key="youtubeItem.id.videoId"
            :youtubeItem="youtubeItem"
            @addSong="addSong"
        />
    </ul>
</template>

<script>
import searchPreview from "./search-preview.vue";
export default {
    props: ["youtubeItems"],
    components: {
        searchPreview,
    },


    methods: {
        addSong(song) {
            this.$emit("addSong", song);
        },
    },
};
</script>