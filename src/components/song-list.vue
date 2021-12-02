<template>
    <section class="song-list">
        <div class="actions">
            <button class="btn btn-play">▶</button>
        </div>
        <div class="sort-bar">
            <p>#</p>
            <p>TITLE</p>
            <p>DATE ADDED</p>
            <p>⏱</p>
        </div>
        <ul>
            <li v-for="(song, idx) in songs" :key="song._id">
                <song-preview :song="song" :idx="idx" @remove="remove" @update="update" />
            </li>
        </ul>
    </section>
</template>

<script>
import songPreview from "./song-preview.vue";
export default {
    components: {
        songPreview,
    },
    props: ["songs"],
    data() {
        return {};
    },

    created() {},

    methods: {
        remove(songId) {
            this.$emit("remove", songId);
        },
        update(song) {
            this.$emit("update", song);
        },
    },
    computed: {},
};
</script>

<style>
</style>