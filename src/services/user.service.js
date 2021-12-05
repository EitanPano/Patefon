import { localStorageService } from "./local-storage.service";
import { storageService } from "./async-storage.service";

// TEST DATA
import { default as userDB } from "../data/userDB.json";
import { utilService } from "./util.service";
// import { util } from "vue/types/umd";
// import { search } from "core-js/library/fn/symbol";
const KEY = "userDB";

export const userService = {
    getLoggedinUser,
    addSong,
    //   removeSong,
    getById,
    _createUser,
};

function getLoggedinUser() {
    let user = JSON.parse(localStorage.getItem(KEY));
    if (!user) {
        _createUser();
    }
    return JSON.parse(localStorage.getItem(KEY) || null);
}

function _createUser() {
    var user = localStorageService.load(KEY);
    if (!user || !user.length) {
        user = userDB;
        localStorageService.store(KEY, user);
    }
}

function addSong(action) {
    console.log(action);
    let user = getLoggedinUser();

    if (
        action.type === "history" &&
        !user.searchHistory.includes(action.song)
    ) {
        var idx = utilService.checkDuplicate(
            user.searchHistory,
            action.song.id
        );
        if (idx || idx === 0) return;
        user.searchHistory.unshift(action.song);
        console.log("pushing history boyz");
        if (user.searchHistory.length > 5) {
            user.searchHistory.splice(user.searchHistory.length - 1, 1);
        }
    } else if (action.type === "like") {
        var idx = utilService.checkDuplicate(user.likedSongs, action.song.id);
        if (idx || idx === 0) user.likedSongs.splice(idx, 1);
        else user.likedSongs.push(action.song);
    }
    _saveUserToStorage(user);
    return Promise.resolve(user);
}
// function removeSong(action) {
//   const user = getLoggedinUser();
//   if (action.type === "history") {
//   }
// }

function _saveUserToStorage(user) {
    localStorage.setItem(KEY, JSON.stringify(user));
    // localStorageService(KEY, user);
}

function getById(userId) {
    return Promise.resolve(getLoggedinUser());
}
