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
    updateDetails
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
    // return axios.get(USER_URL, { withCredentials: true })
    //     .then(res => res.data)
    //     .then((users)=> {
    //         console.log('got Users:',users);
    //         return users
    //     })
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
    sessionStorage.setItem(USER_URL, JSON.stringify(user))
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
        likedStations:[],
        following:[]
    
    }
}

async function updateDetails(action){
    console.log(action);
    let user =  await getLoggedinUser();
    // console.log(user,'after await');
    // console.log(user.searchHistory,'searchHistory');
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
        // console.log("pushing history boyz");
        if (user.searchHistory.length > 5) {
            user.searchHistory.splice(user.searchHistory.length - 1, 1);
        }
    } else if (action.type === "like") {
        var idx = utilService.checkDuplicate(user.likedSongs, action.song.id);
        if (idx || idx === 0) user.likedSongs.splice(idx, 1);
        else user.likedSongs.push(action.song);
    }
   let updatedUser=await update(user);
//    console.log('updatedUser from service,',updatedUser);
   return updatedUser
}