<template>
        <!-- v-model="testArr" -->
    <draggable
        class="list-group"
        tag="ul"
        v-bind="dragOptions"
        @start="grab"
        @end="drop"
        @change="swapped($event.moved)"
    >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
            <li class="search-preview" :key="youtubeItem.snippet.title">
                <div class="flex song-details first">
                    <img :src="youtubeItem.snippet.thumbnails.default.url" />
                    <p class="song-title">{{ youtubeItem.snippet.title }}</p>
                </div>

                <p class="second">{{ youtubeItem.duration }}</p>
                <button
                    class="btn btn-add highlight last"
                    @click="addSong(youtubeItem)"
                >
                    ADD
                </button>
            </li>
        </transition-group>
    </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
    props: ["youtubeItem"],
    components: { draggable },
    data() {
        return {
            drag: false,
        };
    },
    methods: {
        addSong(youtubeItem, idx = null) {
            const song = {
                id: youtubeItem.id.videoId,
                youtubeId: youtubeItem.id.videoId,
                title: youtubeItem.snippet.title,
                imgUrl: youtubeItem.snippet.thumbnails.default.url,
                duration: youtubeItem.duration,
                idx
            };
            this.$emit("addSong", song);
        },
        grab() {
            this.drag = true;
        },
        drop(ev) {
            console.log(ev.to);
            this.addSong(this.youtubeItem, ev.newIndex)
            this.drag = false;
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
    },
};
</script>

<style>
</style>
  
