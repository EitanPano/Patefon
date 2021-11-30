import { storageService } from './async-storage.service'
import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_toy_UPDATED } from './socket.service'
const STORAGE_KEY_LOGGEDIN_toy = 'loggedintoy'
var gWatchedtoy = null;

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptytoy
}

// Debug technique
window.toyService = toyService


function query(filterBy) {
    // return storageService.query('toy')
    return httpService.get(`toy`,filterBy)
}

async function getById(toyId) {
    // const toy = await storageService.get('toy', toyId)
    const toy = await httpService.get(`toy/${toyId}`)
    gWatchedtoy = toy;
    return toy;
}
function remove(toyId) {
    // return storageService.remove('toy', toyId)
    return httpService.delete(`toy/${toyId}`)
}

async function save(toy) {
    // await storageService.put('toy', toy)
    if (toy._id) toy = await httpService.put(`toy/${toy._id}`, toy)
    else toy = await httpService.post(`toy/`,toy)
  
    // Handle case in which admin updates other toy's details
    // console.log(toy)
    return toy;
}

function getEmptytoy() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
        reviews: ['worth your money'],
        imgUrl: 'https://cdn-icons-png.flaticon.com/512/3082/3082060.png'
    }
}


// (async ()=>{
//     await toyService.signup({fullname: 'Puki Norma', toyname: 'toy1', password:'123',score: 10000, isAdmin: false})
//     await toyService.signup({fullname: 'Master Adminov', toyname: 'admin', password:'123', score: 10000, isAdmin: true})
//     await toyService.signup({fullname: 'Muki G', toyname: 'muki', password:'123', score: 10000})
// })();



// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
(async () => {
    // var toy = getLoggedintoy()
    // Dev Helper: Listens to when localStorage changes in OTHER browser

    // Here we are listening to changes for the watched toy (comming from other browsers)
    window.addEventListener('storage', async () => {
        if (!gWatchedtoy) return;
        const freshtoys = await storageService.query('toy')
        const watchedtoy = freshtoys.find(u => u._id === gWatchedtoy._id)
        if (!watchedtoy) return;
        if (gWatchedtoy.score !== watchedtoy.score) {
            console.log('Watched toy score changed - localStorage updated from another browser')
            socketService.emit(SOCKET_EVENT_toy_UPDATED, watchedtoy)
        }
        gWatchedtoy = watchedtoy
    })
})();

// This is relevant when backend is connected
// (async () => {
//     var toy = getLoggedintoy()
//     if (toy) socketService.emit('set-toy-socket', toy._id)
// })();

