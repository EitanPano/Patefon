// import { filter } from 'core-js/core/array';
import { storageService } from './async-storage.service'
import { localStorageService } from './local-storage.service'
import { utilService } from './util.service';
// import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_station_UPDATED } from './socket.service'
// const STORAGE_KEY_LOGGEDIN_station = 'loggedinstation'
// var gWatchedstation = null;


// TEST DATA
import { default as stationsDB } from '../data/stationsDB.json';
// import { filter } from 'core-js/core/array';



const KEY = 'stationsDB';

_createStations();
export const stationService = {
    query,
    getById,
    remove,
    save,
    getEmptystation
}

// Debug technique
window.stationService = stationService


function query(filterBy) {
    return storageService.query(KEY)
        .then(stations => {
            if (filterBy) {
                console.log(filterBy.txt);
                var dataObjectMap = stations.reduce(function (data, station) {
                    var songs = station.songs.filter(song => song.title.toLowerCase().includes(filterBy.txt.toLowerCase())) || []
                    console.log('songs', songs);
                    console.log('station', station);
                    if (songs.length) {
                        songs.forEach(song => {
                            if (station.songs.includes(song) && !data.stations.includes(station)) {
                                data.stations.push(station);
                            }
                            if (data.songs.includes(song)) return
                            data.songs.push(song);
                            // console.log('went through If');
                        })
                    }
                    console.log(data);
                    return data
                }, { songs: [], stations: [] })

                if (dataObjectMap.songs.length > 1) {
                    console.log('longer than 1');
                    return dataObjectMap
                }
                else if (dataObjectMap.songs.length === 1) {
                    var artistName = dataObjectMap.songs[0].title;
                    console.log(artistName);
                    //with real data after having the artist name we can add more songs of the same artist to the dataObjectMap . with dataObjectMap.relatedSongs
                    return dataObjectMap
                }

            }
            return stations
        })
    // return httpService.get(`station`, filterBy)
}

async function getById(stationId) {
    const station = await storageService.get(KEY, stationId)
    // const station = await httpService.get(`station/${stationId}`)
    // gWatchedStation = station;
    return station;
}
function remove(stationId) {
    return storageService.remove(KEY, stationId)
    // return httpService.delete(`station/${stationId}`)
}

async function save(station) {
    if (station._id) {
        const addedStation = await storageService.put(KEY, station);
        return addedStation;
    } else {
        const addedStation = await storageService.post(KET, station);
        return addedStation;

    }

    // if (station._id) station = await httpService.put(`station/${station._id}`, station)
    // else station = await httpService.post(`station/`, station)

    // Handle case in which admin updates other station's details
    // console.log(station)
    // return station;
}

function getEmptystation() {
    return {
        name: '',
        imgUrl: '',
        createdAt: Date.now(),
        tags: [],
        songs: [],
    }
}
function _createStations() {
    var stations = localStorageService.load(KEY)
    if (!stations || !stations.length) {
        stations = stationsDB
        console.log(stations);
        // [
        //     _createStation('Rap Caviar','https://ichef.bbci.co.uk/news/976/cpsprodpb/7648/production/_120408203_gettyimages-1153762018.jpg',
        //      ['Rap', 'Pop'], [
        //         {
        //             _id: utilService.makeId(),
        //             title: 'Gods Plan',
        //             imgUrl: 'https://upload.wikimedia.org/wikipedia/en/9/90/Scorpion_by_Drake.jpg'
        //         },
        //         {
        //             _id: utilService.makeId(),
        //             title: 'ESCAPE PLAN',
        //             imgUrl: 'https://resources.tidal.com/images/6e6d7dd0/4f6b/4ff1/b599/cfb5bfef810b/640x640.jpg'
        //         },
        //         {
        //             id: utilService.makeId(),
        //             title: 'MAFIA',
        //             imgUrl: 'https://resources.tidal.com/images/6e6d7dd0/4f6b/4ff1/b599/cfb5bfef810b/640x640.jpg'
        //         },
        //         {
        //             id: utilService.makeId(),
        //             title: 'Praise God',
        //             imgUrl: 'https://www.genius-lyrics.com/wp-content/uploads/2021/07/Come-To-Life-Lyrics-Kanye-West-1.jpg'
        //         }
        //     ]
        //     ),
        //     _createStation('Rock Bands','https://media.pitchfork.com/photos/61322a5f38b5d9c727b0d17e/4:3/w_2364,h_1773,c_limit/Drake.jpg',
        //      ['Rock', 'Alternative', '80s'], [
        //         {
        //             _id: utilService.makeId(),
        //             title: 'Californication',
        //             imgUrl: 'https://pictures.abebooks.com/isbn/9780634012327-us.jpg'
        //         },
        //         {
        //             _id: utilService.makeId(),
        //             title: 'Colors',
        //             imgUrl: 'https://f4.bcbits.com/img/a4290355765_10.jpg'
        //         },
        //         {
        //             _id: utilService.makeId(),
        //             title: 'The Suburbs',
        //             imgUrl: 'https://img.discogs.com/c7ECdhQmb-AfJXVBNiDjNUP4ARc=/fit-in/600x534/filters:strip_icc():format(webp):mode_rgb():quality(90)/discogs-images/R-2751600-1301254396.jpeg.jpg'
        //         },
        //         {
        //             _id: utilService.makeId(),
        //             title: 'Do I Wanna Know',
        //             imgUrl: 'https://i1.sndcdn.com/artworks-000116476440-0klyjt-t500x500.jpg'
        //         },
        //     ])
        // ]
        localStorageService.store(KEY, stations)
    }
}

function _createStation(name, imgUrl, tags, songs) {
    return {
        _id: utilService.makeId(),
        name,
        imgUrl,
        createdAt: Date.now(),
        tags,
        songs,
    }
}


// (async ()=>{
//     await stationService.signup({fullname: 'Puki Norma', stationname: 'station1', password:'123',score: 10000, isAdmin: false})
//     await stationService.signup({fullname: 'Master Adminov', stationname: 'admin', password:'123', score: 10000, isAdmin: true})
//     await stationService.signup({fullname: 'Muki G', stationname: 'muki', password:'123', score: 10000})
// })();



// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
// var station = getLoggedinstation()
// Dev Helper: Listens to when localStorage changes in OTHER browser

// Here we are listening to changes for the watched station (comming from other browsers)
//     window.addEventListener('storage', async () => {
//         if (!gWatchedstation) return;
//         const freshstations = await storageService.query('station')
//         const watchedstation = freshstations.find(u => u._id === gWatchedstation._id)
//         if (!watchedstation) return;
//         if (gWatchedstation.score !== watchedstation.score) {
//             console.log('Watched station score changed - localStorage updated from another browser')
//             socketService.emit(SOCKET_EVENT_station_UPDATED, watchedstation)
//         }
//         gWatchedstation = watchedstation
//     })
// })();

// This is relevant when backend is connected
// (async () => {
//     var station = getLoggedinstation()
//     if (station) socketService.emit('set-station-socket', station._id)
// })();
