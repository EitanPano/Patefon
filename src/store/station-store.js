// import { set } from 'core-js/core/dict';

export { stationService } from "../services/station.service.js";

export const stationStore = {
  state: {
    likedStation: [],
    currStation: null,
    currSong : null,
    currSongIdx: 0,
    expandedStations: [],
    stations: [],
    filterBy: "",
  },
  getters: {
    getStations(state) {
      // console.log(state.stations);
      return state.stations;
    },
    getExpandedStations(state) {
      return state.expandedStations;
    },
    currStation(state) {
      return state.currStation;
    },
    currSong (state) {
        return state.currSong;
    },
    currSongIdx (state) {
      return state.currSongIdx;
  },
    likedStation(state) {
      return state.likedStation;
    },
    isLikedStation(state) {
      return (state.filterBy.isLiked) ? true : false;
    }
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
    setLikedStation(state, { stations }) {
      state.likedStation = stations;
    },
    setExpandedStations(state, { stations }) {
      state.expandedStations = stations;
    },
    updateStation(state, {updatedStation}) {
        const idx = state.stations.findIndex(currStation=> currStation._id === updatedStation._id);
        state.stations.splice(idx,0,updatedStation);
    },
    songToPlayer(state,{song,idx,station}) {
        state.currSong = song;
        state.currSongIdx = idx;
        state.currStation = station;
    },
    // setInitalStation(state) {
    //   state.currStation = state.stations[0];
    //   state.currSong = state.stations[0].songs[0];
    // }
  },
  actions: {
    async getById({ commit }, { id }) {
      try {
        const station = stationService.getById(id);
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
          filterBy && filterBy.isLiked ? "setLikedStation" : "setStations";
        if (filterBy.txt) type = "setExpandedStations";
        commit({type: 'setFilter', filterBy})
        // console.log("filterBy", filterBy);
        // console.log("filterBy.txt", filterBy.txt);
        commit({ type, stations });
      } catch (err) {
        console.log(err);
        throw err;
      }
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
   async updateStationAfterRemoveSong({commit},{station}) {
        try {
         const updatedStation =  await stationService.save(station);
         commit({type:'updateStation',updatedStation})
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    }
  },

  modules: {},
};
