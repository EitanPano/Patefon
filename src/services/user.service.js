import { httpService } from './http.service';
import { utilService } from "./util.service";
// import {storageService} from './async-storage.service'

// var gWatchedUser = null;
const STORAGE_KEY = 'user'
const USER_URL = 'user/'


// import Axios from 'axios'; 
// var axios = Axios.create({ withCredentials: true});

export const userService = {
    getEmptyUser,
    getUsers,
    update,
    remove,
    getLoggedinUser,
    getById,
    updateDetails,
    updateUserLikedStations,
    updateUserCreatedStations
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null')
}


async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`${USER_URL}${userId}`)
    // gWatchedUser = user;
    return user;
}

function getUsers() {
    return httpService.get(`user`)
}

async function update(user) {
    // await storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) 
    return _saveLocalUser(user)
    return user;
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`${USER_URL}${userId}`)
}


function getEmptyUser() {
    return {
        username:'',
        password:'',
        fullname:'',
        email:'',
        likedSongs:[],
        searchHistory:[],
        stations:[],
        likedStations:[],
        createdStations:[],
        following : [],
        isAdmin : false,
        
    }
}

async function updateDetails(action){
    let user =  await getLoggedinUser();
    if (
        action.type === "history" &&
        !user.searchHistory.includes(action.song)
    ) {
        var idx = utilService.checkDuplicate(
            user.searchHistory,
            action.song.id
        );
        if (idx || idx === 0) return user;
        user.searchHistory.unshift(action.song);
        if (user.searchHistory.length > 4) {
            user.searchHistory.splice(user.searchHistory.length - 1, 1);
        }
    } else if (action.type === "like") {
        var idx = utilService.checkDuplicate(user.likedSongs, action.song.id);
        if (idx || idx === 0) user.likedSongs.splice(idx, 1);
        else user.likedSongs.unshift(action.song);
    }
   let updatedUser=await update(user);
   return updatedUser
}

async function updateUserLikedStations(station){
    let user= await getLoggedinUser()
    let idx = utilService.checkDuplicateWith_id(
        user.likedStations,
        station._id
    );
    if (idx || idx === 0) user.likedStations.splice(idx, 1);
    else user.likedStations.unshift(station._id);
    let updatedUser=await update(user);
    return updatedUser;
}

async function updateUserCreatedStations(station){
    let user=await getLoggedinUser()
    user.createdStations.unshift(station._id);
    let updatedUser=await update(user);
    return updatedUser;
}