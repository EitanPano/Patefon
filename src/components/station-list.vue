<template>
    <ul class="station-list" v-if="stations && stations.length">
        <li v-for="station in fixedStations" :key="station._id">
            <station-preview :station="station" @remove="remove" @update="update" />
        </li>
    </ul>
</template>

<script>
import stationPreview from "./station-preview.vue";
export default {
    components: {
        stationPreview,
    },
    props: ["stations"],
    data() {
        return {
            widthOutput: null,
        };
    },

    created() {
        this.widthOutput = window.innerWidth;
        window.addEventListener("resize", () => {
            this.widthOutput = window.innerWidth;
        });
    },

    methods: {
        remove(stationId) {
            this.$emit("remove", stationId);
        },
        update(station) {
            this.$emit("update", station);
        },
    },
    computed: {
        fixedStations() {
            if (this.widthOutput <= 600) return this.stations.slice(0, 2);
            else if (this.widthOutput <= 850) return this.stations.slice(0, 3);
            else if (this.widthOutput <= 1050) return this.stations.slice(0, 3);
            else if (this.widthOutput <= 1250) return this.stations.slice(0, 4);
            else if (this.widthOutput <= 1450) return this.stations.slice(0, 5);
            else if (this.widthOutput <= 1650) return this.stations.slice(0, 6);
            else if (this.widthOutput <= 1850) return this.stations.slice(0, 7);
            else if (this.widthOutput <= 2050) return this.stations.slice(0, 8);
            else if (this.widthOutput <= 2250) return this.stations.slice(0, 9);
            else if (this.widthOutput <= 2450)
                return this.stations.slice(0, 10);
            // else if (this.widthOutput >= 1000) return this.stations.slice(0, 4)
        },
    },
};
</script>

<style>
</style>