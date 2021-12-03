<template>
    <section class="play-bar">
        <iframe v-if="showCurrSong" width="500" height="40" :src="`https://www.youtube.com/embed/${showCurrSong.youtubeId}?autoplay=1`"></iframe>
    </section>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    computed : {
        showCurrSong () {
        return this.$store.getters.currSong;
        },
          showCurrStation () {
        return this.$store.getters.currStation;
        }
    
    }
}
</script>

<style>

</style>