// import { set } from "core-js/core/dict";

import { stationService } from "../services/station.service.js";
import { userService } from "../services/user.service.js";

export const stationStore = {
  state: {
    loggedUser: {},
    // likedSongs: [],
    currStation: null,
    currSong: null,
    currSongIdx: 0,
    expandedStations: [],
    stations: [],
    searchHistory: [],
    filterBy: "",
    isClickedOnce: false,
  },
  getters: {
    getStations(state) {
      return state.stations;
    },
    getExpandedStations(state) {
      console.log("state.expandedStations", state.expandedStations);
      return state.expandedStations;
    },
    currStation(state) {
      return state.currStation;
    },
    currSong(state) {
      return state.currSong;
    },
    currSongIdx(state) {
      return state.currSongIdx;
    },
    // likedStation(state) {
    //   return state.likedStation;
    // },
    searchHistory(state) {
      return state.loggedUser.searchHistory;
    },
    getLoggedUser(state) {
      return state.loggedUser;
    },
    isLikedStation(state) {
      return state.filterBy.isLiked ? true : false;
    },
    getLikedSongs(state) {
      return state.loggedUser.likedSongs;
      // return state.likedSongs;
    },
    isClicked(state) {
      return state.isClickedOnce;
    },
    // getSearchHistory(state) {
    //     if(state.searchHistory.length)
    // },
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
    addStation(state, { addedStation }) {
      state.stations.push(addedStation);
    },
    setExpandedStations(state, { stations }) {
      state.expandedStations = stations;
    },
    setSearchHistory(state, { song }) {
      console.log(state.searchHistory);
      if (state.searchHistory.length <= 10) {
        state.searchHistory.push(song);
        console.log(state.searchHistory);
        stationService.saveHistoryDB(state.searchHistory);
      } else {
        // stationService.saveHistoryDB(song);
        // state.searchHistory.push(song);
        // state.searchHistory.splice(1, state.searchHistory.length - 1);
      }
      console.log("Search History:", state.searchHistory);
    },
    updateStation(state, { updatedStation }) {
      const idx = state.stations.findIndex(
        (currStation) => currStation._id === updatedStation._id
      );
      state.stations.splice(idx, 0, updatedStation);
    },
    clearSearch(state) {
      console.log("hello again");
      state.expandedStations = "";
    },
    setHistorySongs(state, { historySongs }) {
      state.searchHistory = historySongs;
      console.log("songs", historySongs);
      console.log(state.searchHistory);
    },
    updateUser(state, { updatedUser }) {
      state.loggedUser = updatedUser;
      console.log("updated user", state.loggedUser);
    },
    songToPlayer(state, { song, idx, station }) {
      state.currSong = song;
      state.currSongIdx = idx;
      state.currStation = station;
    },
    setLoggedUser(state, { user }) {
      state.loggedUser = user;
      console.log("user from set", state.loggedUser);
    },
    setLikedSongs(state, { user }) {
      state.likedSongs = user.likedSongs;
    },
    // setInitalStation(state) {
    //   state.currStation = state.stations[0];
    //   state.currSong = state.stations[0].songs[0];
    // }
    setClicked(state, { boolState }) {
      state.isClickedOnce = boolState;
    },
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
          filterBy && filterBy.txt ? "setExpandedStations" : "setStations";
        commit({ type, stations });
        commit({ type: "setFilter", filterBy });
        // if (filterBy.txt) type = "setExpandedStations";
        // console.log("filterBy", filterBy);
        // console.log("filterBy.txt", filterBy.txt);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async loadUser({ commit }) {
      try {
        let user = await userService.getLoggedinUser();
        console.log(user);
        commit({ type: "setLoggedUser", user });
        commit({ type: "setLikedSongs", user });
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    async loadHistorySearch({ commit }) {
      const historySongs = await stationService.getHistoryDB();
      // historySongs = new Set();
      console.log(historySongs);
      commit({ type: "setHistorySongs", historySongs });
    },
    setFilter({ commit, dispatch }, { filterBy }) {
      commit({ type: "setFilter", filterBy });
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
    async updateStationAfterRemoveSong({ commit }, { station }) {
      try {
        const updatedStation = await stationService.save(station);
        commit({ type: "updateStation", updatedStation });
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async likeSong({ commit }, { action }) {
      try {
        const updatedUser = await userService.addSong(action);
        commit({ type: "updateUser", updatedUser });
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },

  modules: {},
};
