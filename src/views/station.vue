<template>
    <section class="main-layout station">
        <main>
            <img class="station-img" :src="this.currStation.imgUrl" alt="" />
            <div class="flex column">
                <p class="highlight small">PLAYLIST</p>
                <h1>{{ currStation.name }}</h1>
                <div>
                    <span class="user-icon material-icons">account_circle</span>
                    <p class="line-h-0 small" v-if="songsCount && songsCount.length">
                        <span class="highlight">Guest</span> • {{ songsCount.length }} Songs
                    </p>
                </div>
            </div>
        </main>
        <song-list
            
            :songs="currStation.songs"
            @removeSong="removeSong"
            @songToPlayer="songToPlayer"
            @swapped="swapIdxs"
            @likeSong="updateUser"
        />

        <chat-room :currStation="currStation" v-if="currStation" />
        <!-- <share-listen
      :currStation="currStation"
      v-if="currStation"
      @songToPlayer="songToPlayer"
    /> -->
    </section>
</template>

<script>
import songList from "../components/song-list.vue";
import chatRoom from "../components/chat-room.vue";
import shareListen from "../components/share-listen.vue";
import { socketService } from "../services/socket.service";
export default {
    components: {
        songList,
        chatRoom,
        shareListen,
    },
    data() {
        return {
            isLikedStation: null,
        };
    },
    methods: {
        async swapIdxs(moved) {
            try {
                const newStation = JSON.parse(JSON.stringify(this.currStation));
                newStation.songs.splice(moved.oldIndex, 1);
                newStation.songs.splice(moved.newIndex, 0, moved.element);
                // console.log('newStation', newStation);
                await this.$store.dispatch({
                    type: "updateStation",
                    station: newStation,
                });
            } catch (err) {
                console.log(err);
            }
        },
        async removeSong(songId) {
            try {
                const idx = this.currStation.songs.findIndex(
                    (song) => song.id === songId
                );
                this.currStation.songs.splice(idx, 1);
                await this.$store.dispatch({
                    type: "updateStation",
                    station: this.currStation,
                });
            } catch (err) {
                console.log(err);
            }
        },
        songToPlayer(song, idx) {
            this.$store.commit({
                type: "songToPlayer",
                song,
                idx,
                station: this.currStation,
            });
        },
        updateUser(action) {
            console.log("updating");
            this.$store.dispatch({
                type: "updateUser",
                action,
            });
        },
        goToSearch() {
            console.log("searching...");
            this.$router.push(`/search`);
        },
        destroyed() {
            this.$store.dispatch({
                type: "updateStation",
                station: this.currStation,
            });
            this.$store.dispatch({
                type: "setFilter",
                filterBy: {},
            });
            socketService.off("get share-listen");
        },
    },
    computed: {
        currStation() {
            return this.$store.getters.currStation;
        },
        stationName() {
            return this.currStation.name;
        },
        songsCount() {
            return this.currStation.songs;
        },
    },
    watch: {
        "$route.params.id": {
            async handler() {
                try {
                    const id = this.$route.params.id;
                    await this.$store.dispatch({ type: "getById", id });
                } catch (err) {
                    console.log(err);
                }
            },
            immediate: true,
        },
    },
};
</script>

<style>
</style>