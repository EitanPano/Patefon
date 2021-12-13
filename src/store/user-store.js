import { userService } from '../services/user.service.js';
import { authService } from '../services/auth.service.js';

export const userStore = {
    state: {
        loggedUser: {},
    },
    getters: {
        loggedUser(state) {
            return state.loggedUser;
        },
        likedSongs(state) {
            return state.loggedUser.likedSongs;
            // return JSON.parse(JSON.stringify(state.likedSongs)) ;
        },
        searchHistory(state) {
            return state.loggedUser.searchHistory;
            // return state.searchHistory;
        },
        createdStations(state) {
            return state.loggedUser.createdStations;
        },
        likedStations(state) {
            return state.loggedUser.likedStations;
        },
    },
    mutations: {
        setUser(state, { loggedUser }) {
            state.loggedUser = loggedUser;
        },
        updateUser(state, { updatedUser }) {
            state.loggedUser = updatedUser;
        },
    },
    actions: {
        async setInitialLogin({ commit }) {
            try {
                let loggedUser = await authService.initialLogin();
                commit({ type: 'setUser', loggedUser });
                return loggedUser;
            } catch (err) {
                console.log(err);
            }
        },
        async setLogin({ commit }, { user }) {
            try {
                let loggedUser = await authService.login(user);
                commit({ type: 'setUser', loggedUser });
                return loggedUser;
            } catch (err) {
                console.log(err);
            }
        },
        async setSignup({ commit }, { newUserData }) {
            try {
                let newUser = await authService.signup(newUserData);
                commit({ type: 'setUser', newUser });
                return newUser;
            } catch (err) {
                console.log(err);
            }
        },
        async setLogout({ commit }) {
            let loggedUser = await authService.loginGuestUser();
            commit({ type: 'setUser', loggedUser });
        },
        async updateUser({ commit }, { action }) {
            try {
                const updatedUser = await userService.updateDetails(action);
                commit({ type: 'updateUser', updatedUser });
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        async updateUserLikedStations({ commit }, { station }) {
            try {
                const updatedUser = await userService.updateUserLikedStations(
                    station
                );
                commit({ type: 'updateUser', updatedUser });
            } catch (err) {
                console.log(err);
            }
        },
        async updateUserCreatedStations({ commit }, { station }) {
            try {
                const updatedUser = await userService.updateUserCreatedStations(
                    station
                );
                commit({ type: 'updateUser', updatedUser });
            } catch (err) {
                console.log(err);
            }
        },
    },
};
