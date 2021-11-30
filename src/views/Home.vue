<template>
  <section>
    <h1>Home page</h1>

    <station-list :stations="stations"/>
    </section>
</template>

<script>
import stationList from '../components/station-list.vue';
export default {
  name: 'Home',
  components: {
    stationList
  },
  data() {
    return {
          stations: [{
  "_id": "5c09",
  "name": "Funky Monks",
  "tags": [
    "Pop",
    "Rock"
  ],
  "imgUrl" : "https://ichef.bbci.co.uk/news/976/cpsprodpb/7648/production/_120408203_gettyimages-1153762018.jpg",
  "createdAt": 1541652422,
  "createdBy": {
    "_id": "u101",
    "fullname": "Puki Ben David",
    "imgUrl": "http://some-photo/"
  },
  "participants": [
    {
      "_id": "u101",
      "fullname": "Puki Ben David",
      "imgUrl": "http://some-photo/"
    }
  ],
  "likedByUsers": ['{minimal-user}', '{minimal-user}'],
  "songs": [
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
  "msgs": [
    {
      id: 'm101',
      from: '{mini-user}',
      txt: 'Manish?'
    }
  ]
}],
    }
  }
}
</script>
