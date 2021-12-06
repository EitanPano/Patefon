<template>
    <li class="search-preview">
        <div class="flex song-details first">
            <img :src="youtubeItem.snippet.thumbnails.default.url" />
            <p class="song-title">{{ youtubeItem.snippet.title }}</p>
        </div>

        <p class="second">{{ youtubeItem.duration }}</p>
        <button class="btn btn-add highlight last" @click="addSong(youtubeItem)">ADD</button>
    </li>
</template>

<script>
export default {
    props: ["youtubeItem"],
    methods: {
        addSong(youtubeItem) {
            const song = {
                id: youtubeItem.id.videoId,
                youtubeId: youtubeItem.id.videoId,
                title: youtubeItem.snippet.title,
                imgUrl: youtubeItem.snippet.thumbnails.default.url,
                duration: youtubeItem.duration,
            };
            this.$emit("addSong", song);
        },
    },
};
</script>

<style>
</style>
  
