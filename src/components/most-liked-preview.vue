<template>
    <transition name="fade">
        <li
            @mouseleave="isHover = false"
            @mouseenter="isHover = true"
            @click="enterStation(station._id)"
            class="flex"
        >
                <img :src="station.imgUrl" />
                <p>{{ station.name }}</p>
                <transition name="fade">
                <button class="btn btn-play" v-if="isHover">
                    <span class="material-icons">play_arrow</span>
                </button>
                </transition>
        </li>
    </transition>
</template>

<script>
export default {
    props: ["station"],
    data() {
        return {
            isHover: false,
        };
    },
    methods: {
        enterStation(stationId) {
            this.$router.push("/station/" + stationId);
        },
    },
    computed: {},
};
</script>

<style>
</style>

