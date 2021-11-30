// Guidlines:
// *. no need for song store, it is part of the station

// Pages, Cmps:
// HomePage render 2 stations => link StationDetails
// Add station
// AppPlayer (initially rendered at StationDetails, later in footer)
//   Smart omponent - connected to store:
//   -. stationModule.currentlyPlayingUrl
//   -. stationModule.dispatch(nextSong)
// Filtering
// StationList, StationPreview
// StationDetails - Make it amazing
// D & D Later....

var station = {
  "_id": "5c09",
  "name": "Funky Monks",
  "tags": [
    "Pop",
    "Rock"
  ],
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
}

// var artist = {
//   "_id": '',
//   "fullname": '',
  
//   "songs": [
//     {

//     }
//   ]
// }

const user = {}
