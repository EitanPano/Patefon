import { httpService } from './http.service';
// import {storageService} from './async-storage.service'

const STORAGE_KEY = 'user'
const AUTH_URL = 'auth/'

// const axios = require('axios')
// import Axios from 'axios'; 
// var axios = Axios.create({ withCredentials: true});
// import Axios from 'axios'; var axios = Axios.create({ withCredentials: true, });
export const authService = {
    login,
    logout,
    signup,
}


async function login(userCred) {
    // const user = users.find(user => user.username === userCred.username)
    // return _saveLocalUser(user)
    try{
        console.log(userCred);
        const user = await httpService.post(`${AUTH_URL}login`, userCred)
        // socketService.emit('set-user-socket', user._id);
        // console.log('user from service',user);
        if (user) return _saveLocalUser(user)
        else console.log('Logging in have failed');
    }catch(err){
        console.log(err);

    }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY)
    return await httpService.post(`${AUTH_URL}logout`)

    // return axios.post(USER_URL + 'logout').then(()=> {
    //     return 'success lotOut'
    // })
}

// function signup(user) {
//     console.log(user);
//     return axios.post(AUTH_URL + 'signup',user)
//         .then(res => res.data)
//         .then((user)=>{
//             console.log('New user:', user);
//             sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
//             return user
//         })
// }

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
}

async function signup(userCred) {
    // userCred.score = 10000;
    // const user = await storageService.post('user', userCred)
    // console.log('user data from service before post',userCred);
    const user = await httpService.post(`${AUTH_URL}signup`, userCred)
    // socketService.emit('set-user-socket', user._id);
    console.log('new user signedUp',userCred);
    return _saveLocalUser(user)
}