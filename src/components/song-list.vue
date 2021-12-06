<template>
    <section class="song-list">
        <div class="actions">
            <button class="btn btn-play" @click="songToPlayer">
                <span class="material-icons">play_arrow</span>
            </button>
        </div>
        <div class="sort-bar" v-if="!isSearch">
            <p>#</p>
            <p>TITLE</p>
            <p>DATE ADDED</p>
            <p class="last"><img src="@/assets/icons/time.svg" alt="" /></p>
        </div>

        <ul>
            <draggable
                class="list-group"
                tag="ul"
                :value="currStationSongs"
                v-bind="dragOptions"
                @start="grab"
                @end="drop"
                @change="swapped($event.moved)"
            >
                <!-- @change="testLog($event)" -->
                <transition-group
                    type="transition"
                    :name="!drag ? 'flip-list' : null"
                >
                    <li class="list-group-item" v-for="(song, idx) in songs" :key="idx">
                        <song-preview
                            :song="song"
                            :idx="idx"
                            @removeSong="removeSong"
                            @songToPlayer="songToPlayer"
                            :isSearch="isSearch"
                        />
                    </li>
                </transition-group>
            </draggable>
        </ul>
    </section>
</template>

<script>
import draggable from "vuedraggable";
import songPreview from "./song-preview.vue";
export default {
    components: {
        songPreview,
        draggable,
    },
    display: "Transitions",
    props: ["songs", "isSearch"],
    data() {
        return {
            drag: false
        };
    },
    created() {},
    methods: {
        removeSong(songId) {
            this.$emit("removeSong", songId);
        },
        songToPlayer(song, idx) {
            this.$emit("songToPlayer", song, idx);
        },
        swapped(moved) {
            this.$emit('swapped', moved)
        },
        grab() {
            this.drag = true
            console.log('holding');
        },
        drop() {
            this.drag = false
            console.log('dropping');
        }
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
        currStationSongs() {
            return this.$store.getters.currStation.songs ;
        },
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