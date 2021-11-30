<template>
    <section>
    <h1>Station view</h1>
    <station-song-list :songs="songs"/>
    </section>
</template>

<script>
  import stationSongList from '../components/station-song-list.vue'
export default {
  
    components: {
stationSongList
    },
    data() {
        return  {
        songs :  [
    {
      "mini-artist": {
          "id": "ma101",
          "name": "Drake"
      },
      "id": "s1001",
      "title": "The Meters - Cissy Strut",
      "url": "youtube/song.mp4",
      "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
      "addedBy": '{minimal-user}'
    },
    {
      "id": "mUkfiLjooxs",
      "title": "The JB's - Pass The Peas",
      "url": "youtube/song.mp4",
      "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
      "addedBy": {}
    },
  ],
        }
    }

}
</script>

<style>

</style>