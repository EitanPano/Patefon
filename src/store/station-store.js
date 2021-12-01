// import { set } from 'core-js/core/dict';

export { stationService } from '../services/station.service.js';

export const stationStore = {
    state: {
        stations: [],
        filterBy: ''
    },
    getters: {
        getStations(state) {
            return state.stations
        }
    },
    mutations: {
        setStations(state, { stations }) {
            state.stations = stations;
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
        addStation(state, {addedStation}) {
            state.stations.push(addedStation)
        }
    },
    actions: {
        async loadStations({ commit }, { filterBy }) {
            try {
                const stations = await stationService.query(filterBy)
                commit({ type: 'setStations', stations })
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        setFilter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy });
            dispatch({ type: 'loadStations', filterBy })
        },
        async addStation ({commit}, {newStation}) {
            try {
                const addedStation = await stationService.save(newStation)
                commit({type:'addStation', addedStation})
            }
            catch(err) {
                console.log(err)
            }
        },

    },

    modules: {
    },
};
