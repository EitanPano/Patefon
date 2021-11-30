<template>
  <section class="station-song-preview">
    <p>{{ song.title }}</p>
    <img :src="song.imgUrl">
  </section>
</template>

<script>
export default {
  props: ["song"],
  data() {
    return {};
  },
  created() {},
  methods: {

  },
  computed: {

  },
};
</script>

<style>
</style>

{
  "_id": "5c09",
  "name": "Funky Monks",
  "tags": [
    "Pop",
    "Rock"
  ],
  "createdAt": 1541652422,
  "createdBy": {
    "_id": "u101",
    "fullname": "Puki Ben David",
    "imgUrl": "http://some-photo/"
  },
  "participants": [
    {
      "_id": "u101",
      "fullname": "Puki Ben David",
      "imgUrl": "http://some-photo/"
    }
  ],
  "likedByUsers": [
    "{minimal-user}",
    "{minimal-user}"
  ],
  "songs": [
    {
      "mini-artist": {
        "id": "ma101",
        "name": "Drake"
      },
      "id": "s1001",
      "title": "The Meters - Cissy Strut",
      "url": "youtube/song.mp4",
      "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
      "addedBy": "{minimal-user}"
    },
    {
      "id": "mUkfiLjooxs",
      "title": "The JB's - Pass The Peas",
      "url": "youtube/song.mp4",
      "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
      "addedBy": {}
    }
  ],
  "msgs": [
    {
      "id": "m101",
      "from": "{mini-user}",
      "txt": "Manish?"
    }
  ]
}