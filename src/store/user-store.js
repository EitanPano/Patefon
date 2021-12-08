import { stationService } from "../services/station.service.js";
import { userService } from "../services/user.service.js";
import {authService} from "../services/auth.service.js"

export const userStore = {
    state: {
        loggedUser:null,
        // likedSongs:[],
        // searchHistory: [],
    },
    getters:{
        loggedUser(state) {
            return state.loggedUser;
        },
        likedSongs(state) {
            console.log('liked songs from store:',state.loggedUser.likedSongs);
            return state.loggedUser.likedSongs
            // return JSON.parse(JSON.stringify(state.likedSongs)) ;
        },
        searchHistory(state) {
            console.log('search history from store:',state.loggedUser.searchHistory);
            return state.loggedUser.searchHistory
            // console.log('search history from store',state.searchHistory);
            // return state.searchHistory;
        },
    },
    mutations:{
      setUser(state,{loggedUser}){
          state.loggedUser=loggedUser
          console.log('loggedUser from setUser in user store:',state.loggedUser);
      },
      updateUser(state,{updatedUser}){
          state.loggedUser=updatedUser
      }
    //   setLikedSongs(state, { likedSongs }) {
    //     state.likedSongs = likedSongs;
    //   },
    //   setSearchHistory(state, { searchHistory }) {
    //     state.searchHistory = searchHistory;
    //   },
    },
    actions:{
        async setInitialLogin({commit}){
            try{
                let loggedUser = await authService.initialLogin();
                console.log('initial login from store:',loggedUser);
                commit({type:'setUser',loggedUser})
                return loggedUser
            }catch(err){
                console.log(err);
            }
        },
     async setLogin({commit} ,{user}){
         try{
            console.log('from user store:',user);
            let loggedUser= await authService.login(user)
            console.log('logged User from action in user store:',loggedUser);
            commit({type:'setUser',loggedUser})
            return loggedUser
         }catch(err){
             console.log(err);
         }
     },
     async setSignup({commit},{newUserData}){
         try{
             console.log('userData from store,',newUserData);
             let newUser = await authService.signup(newUserData)
             commit({type:'setUser',newUser})
             return newUser
         }catch(err){
             console.log(err);
         }
     },
    async setLogout({commit}){
        //   await authService.logout()
          let loggedUser = await authService.loginGuestUser()
              commit({type:'setUser',loggedUser})
            // .then((msg)=> {
            //   const user = userService.getEmptyUser()
            //   commit({type:'setUser',user})
            //   return msg
            // })
     },
     async updateUser({ commit }, { action }) {
        try {
            const updatedUser = await userService.updateDetails(action);
            console.log(updatedUser,'Updated user?');
            commit({ type: "updateUser", updatedUser });
            // if(action.type==="history")
            // commit({type:"setSearchHistory", searchHistory:updatedUser.searchHistory})
            // else if(action.type==='like')
            // commit({type:"setLikedSongs",likedSongs:updatedUser.likedSongs})
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    },
    modules: {

    },

};