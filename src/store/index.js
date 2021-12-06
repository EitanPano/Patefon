import Vue from 'vue';
import Vuex from 'vuex';

import { stationStore } from './station-store.js';
import {userStore} from './user-store.js'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    strict: true,
    state: {},
    mutations: {},
    actions: {},
    modules: {
        stationStore,
        userStore
    },
});
