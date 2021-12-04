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
_createUser();

function getLoggedinUser() {
  if (!localStorage.getItem(KEY)) {
    var user = userDB;
    console.log(user);
    localStorageService.store(KEY, user);
    _saveUserToStorage(user);
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

  if (action.type === "history" && !user.searchHistory.includes(action.song)) {
    user.searchHistory.push(action.song);
  } else if (action.type === "like") {
    var idx = utilService.checkDuplicate(user.savedSongs, action.song.id);
    if (idx || idx === 0) user.savedSongs.splice(idx, 1);
    else user.savedSongs.push(action.song);
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
  console.log("saving.....", user);
  // localStorage.setItem(KEY, JSON.stringify(user));
  localStorageService(KEY, user);
}

function getById(userId) {
  return Promise.resolve(getLoggedinUser());
}
