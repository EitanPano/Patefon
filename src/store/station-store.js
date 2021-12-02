// import { set } from 'core-js/core/dict';

export { stationService } from "../services/station.service.js";

export const stationStore = {
  state: {
    likedStation: [],
    currStation: [],
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
    likedStation(state) {
      return state.likedStation;
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
    addStation(state, { addedStation }) {
      state.stations.push(addedStation);
    },
    setLikedStation(state, { stations }) {
      state.likedStation = stations;
    },
    setExpandedStations(state, { stations }) {
      state.expandedStations = stations;
    },
  },
  actions: {
    async getById({ commit }, { id }) {
      console.log(id);
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
        console.log("filterBy", filterBy);
        console.log("filterBy.txt", filterBy.txt);
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
  },

  modules: {},
};
