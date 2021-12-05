// import { filter } from 'core-js/core/array';
import { storageService } from "./async-storage.service";
import { localStorageService } from "./local-storage.service";
import { utilService } from "./util.service";
// import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_station_UPDATED } from './socket.service'
// const STORAGE_KEY_LOGGEDIN_station = 'loggedinstation'
// var gWatchedstation = null;

// TEST DATA
import { default as stationsDB } from "../data/stationsDB.json";
// import { search } from "core-js/fn/symbol";
// import { filter } from 'core-js/core/array';

const KEY = "stationsDB";
const SEARCH_KEY = "historyDB";

_createStations();

export const stationService = {
    query,
    getById,
    remove,
    save,
    getEmptystation,
    getHistoryDB,
    saveHistoryDB,
};

// Debug technique
window.stationService = stationService;

async function query(filterBy = {}) {
    try {
        let stations = await storageService.query(KEY);
        if (filterBy.isLiked) {
            const likedSongs = [];
            stations.forEach((station) => {
                station.songs.forEach((song) =>
                    song.isLiked ? likedSongs.push(song) : null
                );
            });
            return likedSongs;
        }
        if (filterBy.txt) {
            let expandedStations = stations.reduce(
                (data, station) => {
                    //const regx = new RegExp(filterBy.txt, "i");
                    let songs =
                        station.songs.filter((song) =>
                            song.title
                                .toLowerCase()
                                .includes(filterBy.txt.toLowerCase())
                        ) || [];
                    //return regx.test(song.title)
                    if (songs.length) {
                        songs.forEach((song) => {
                            if (
                                station.songs.includes(song) &&
                                !data.stations.includes(station)
                            ) {
                                data.stations.push(station);
                            }
                            data.songs.push(song);
                        });
                    }
                    return data;
                },
                { songs: [], stations: [] }
            );
            expandedStations.songs = utilService.getExclusiveArr(
                expandedStations.songs
            );
            console.log(expandedStations.songs);

            if (expandedStations.songs.length > 1) {
                return expandedStations;
            } else if (expandedStations.songs.length === 1) {
                var artistName = expandedStations.songs[0].title;
                //with real data after having the artist name we can add more songs of the same artist to the expandedStations . with expandedStations.relatedSongs
                return expandedStations;
            }
        }
        return stations;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getById(stationId) {
    const station = await storageService.get(KEY, stationId);
    // const station = await httpService.get(`station/${stationId}`)
    // gWatchedStation = station;
    return station;
}
function remove(stationId) {
    return storageService.remove(KEY, stationId);
    // return httpService.delete(`station/${stationId}`)
}

async function save(station) {
    if (station._id) {
        const addedStation = await storageService.put(KEY, station);
        return addedStation;
    } else {
        const addedStation = await storageService.post(KEY, station);
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
        name: "",
        description: "",
        imgUrl: "",
        tags: [],
        genre: "",
        createdAt: Date.now(),
        createdBy: {},
        songs: [],
    };
}

function _createStations() {
    var stations = localStorageService.load(KEY);
    if (!stations || !stations.length) {
        stations = stationsDB;
        localStorageService.store(KEY, stations);
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
    };
}
/////////////////SEARCH HISTORY SUGSHEL CRUD/////////////////////////////
function saveHistoryDB(historySearch) {
    localStorageService.store(SEARCH_KEY, historySearch);
}
async function getHistoryDB() {
    try {
        let songs = await storageService.query(SEARCH_KEY);
        return songs;
        var searchHistory = await storageService.query(SEARCH_KEY);
        console.log(searchHistory);
        searchHistory = new Set();
        return searchHistory;
    } catch (err) {
        console.log(err);
        throw err;
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

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// function query(filterBy) {
//     return storageService.query(KEY)
//         .then(stations => {
//             if (filterBy) {
//                 console.log(filterBy.txt);
//                 var expandedStations = stations.reduce(function (data, station) {
//                     var songs = station.songs.filter(song => song.title.toLowerCase().includes(filterBy.txt.toLowerCase())) || []
//                     console.log('songs', songs);
//                     console.log('station', station);
//                     if (songs.length) {
//                         songs.forEach(song => {
//                             if (station.songs.includes(song) && !data.stations.includes(station)) {
//                                 data.stations.push(station);
//                             }
//                             if (data.songs.includes(song)) return
//                             data.songs.push(song);
//                             // console.log('went through If');
//                         })
//                     }
//                     console.log(data);
//                     return data
//                 }, { songs: [], stations: [] })

//                 if (expandedStations.songs.length > 1) {
//                     console.log('longer than 1');
//                     return expandedStations
//                 }
//                 else if (expandedStations.songs.length === 1) {
//                     var artistName = expandedStations.songs[0].title;
//                     console.log(artistName);
//                     //with real data after having the artist name we can add more songs of the same artist to the expandedStations . with expandedStations.relatedSongs
//                     return expandedStations
//                 }
//             }
//             return stations
//         })
// }
