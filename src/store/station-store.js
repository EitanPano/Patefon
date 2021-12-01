// import { set } from 'core-js/core/dict';

export { stationService } from '../services/station.service.js';

export const stationStore = {
    state: {
        likedStation: [],
        currStation: [],
        stations: [],
        filterBy: ''
    },
    getters: {
        getStations(state) {
            return state.stations
        },
        currStation(state) {
            return state.currStation
        },
        likedStation(state) {
            return state.likedStation;
        }
    },
    mutations: {
        setStations(state, { stations }) {
            state.stations = stations;
        },
        setCurrStation(state, {station}) {
            state.currStation = station;
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
        setLikedStation(state, {stations}){
            state.likedStation = stations
        }
    },
    actions: {
        async getById({commit}, {id}) {
            console.log(id);
            try{
                const station = stationService.getById(id);
                if (station) {
                    commit({type: 'setCurrStation', station})
                    return station
                }
            }
            catch{}
        },
        async loadStations({ commit }, { filterBy }) {
            try {
                const stations = await stationService.query(filterBy)
                const type = (filterBy && filterBy.isLiked)? 'setLikedStation': 'setStations'
                commit({ type, stations })
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        setFilter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy });
            dispatch({ type: 'loadStations', filterBy })
        }
    },
    modules: {
    },
};
