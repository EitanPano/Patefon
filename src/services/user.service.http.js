import { httpService } from './http.service';
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
    getById
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
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
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
        fullname:''
    }
}