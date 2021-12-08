// import { set } from "core-js/core/dict";

import { stationService } from "../services/station.service.js";
import { userService } from "../services/user.service.js";

export const stationStore = {
    state: {
        // loggedUser: null,
        // likedSongs: [],
        // searchHistory: [],
        currStation: [],
        currStationForPlayer: [],
        currSong: null,
        currSongIdx: 0,
        expandedStations: [],
        stations: [],
        filterBy: {
            txt: "",
        },
        isClickedOnce: false,
    },
    getters: {
        getStations(state) {
            return JSON.parse(JSON.stringify(state.stations));
        },
        getExpandedStations(state) {
            console.log('state.expandedStations',state.expandedStations);
            return state.expandedStations;
        },
        currStation(state) {
            return JSON.parse(JSON.stringify(state.currStation)) ;
        },
        currStationForPlayer(state) {
            return state.currStationForPlayer;
        },
        currSong(state) {
            return state.currSong;
        },
        currSongIdx(state) {
            return state.currSongIdx;
        },
        isLikedStation(state) {
            return state.filterBy.isLiked ? true : false;
        },
       
        isClicked(state) {
            return state.isClickedOnce;
        },
        stationsByGenre(state) {
            var genres = state.stations.reduce((acc, station) => {
                if (!acc[station.genre]) acc[station.genre] = [station];
                else acc[station.genre].push(station);
                return acc;
            }, {});
            return genres;
        },
        filterBy(state) {
            return state.filterBy;
        },
      
    },
    mutations: {
        setStations(state, { stations }) {
            state.stations = stations;
        },
        setCurrStation(state, { station }) {
            state.currStation = station;
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
        setFilterTxt(state, { txt }) {
            state.filterBy.txt = txt;
        },
        addStation(state, { addedStation }) {
            state.stations.push(addedStation);
        },
        setExpandedStations(state, { stations }) {
            state.expandedStations = stations;
        },
        updateStation(state, { updatedStation }) {
            // const idx = state.stations.findIndex(
            //     (currStation) => currStation._id === updatedStation._id
            // );
            // console.log(idx);
            // state.stations.splice(idx, 1, updatedStation);
            state.currStation = updatedStation
        },
        clearSearch(state) {
            // state.expandedStations = "";
            state.expandedStations = [];
        },
        songToPlayer(state, { song, idx, station }) {
            state.currSong = song;
            state.currSongIdx = idx;
            state.currStationForPlayer = station;
        },
        // setLoggedUser(state, { user }) {
        //     state.loggedUser = user;
        // },
       
        setClicked(state, { boolState }) {
            state.isClickedOnce = boolState;
        },
        updateSearchHistory(state,{searchHistory}){
            console.log(searchHistory.searchHistory);
            state.searchHistory=searchHistory.searchHistory
            console.log('state: searchHistory:',state.searchHistory);
        },
        updateLikedSongs(state,{likedSongs}){
            console.log(likedSongs.likedSongs);
            state.likedSongs=likedSongs.likedSongs
        },
        clearExpandedStations(state){
            state.expandedStations.stations=[]
            state.expandedStations.songs=[]
        }
    },
    actions: {
        async getById({ commit }, { id }) {
            try {
                const station = await stationService.getById(id);
                
                if (station) {
                    commit({ type: "setCurrStation", station });
                    return station;
                }
            } catch {}
        },
        async loadStations({ commit }, { filterBy }) {
            try {
                const stations = await stationService.query(filterBy);
                let type =
                    filterBy && filterBy.txt
                        ? "setExpandedStations"
                        : "setStations";
                commit({ type, stations });
                commit({ type: "setFilter", filterBy });
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        setFilter({ commit, dispatch }, { filterBy }) {
            commit({ type: "setFilter", filterBy });
            // console.log(filterBy, "filter FROM STRORE");
            dispatch({ type: "loadStations", filterBy });
        },
        async addStation({ commit }, { newStation }) {
            try {
                const addedStation = await stationService.save(newStation);
                commit({ type: "addStation", addedStation });
            } catch (err) {
                console.log(err);
            }
        },
        async updateStation({ commit }, { station }) {
            try {
                const updatedStation = await stationService.save(station);
                commit({ type: "updateStation", updatedStation });
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        async swapIdxs({commit, dispatch}, {moved}) {
            try {
                console.log(moved);
                moved.element
            }
            catch {}
        }
    },

    modules: {},
};
