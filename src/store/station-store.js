// import { set } from 'core-js/core/dict';

export { stationService } from '../services/station.service.js';

export const stationStore = {
    state: {
        stations: [],
        filterBy: ''
    },
    getters: {
        getStations(state) {
            console.log(state.stations);
            return state.stations
        }
    },
    mutations: {
        setStations(state, { stations }) {
            state.stations = stations;
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        }
    },
    actions: {
        async loadStations({ commit }, { filterBy }) {
            try {
                const stations = await stationService.query(filterBy)
                commit({ type: 'setStations', stations })
                return stations
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
