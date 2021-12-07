import { stationService } from "../services/station.service.js";
import { userService } from "../services/user.service.js";
import {authService} from "../services/auth.service.js"

export const userStore = {
    state: {
        loggedUser: null,
        likedSongs: [],
        searchHistory: [],
    },
    getters:{
        loggedUser(state) {
            return state.loggedUser;
        },
        getLikedSongs(state) {
            return JSON.parse(JSON.stringify(state.likedSongs)) ;
        },
    },
    mutations:{
      setUser(state,{loggedUser}){
          state.loggedUser=loggedUser
          console.log('loggedUser from setUser in user store:',state.loggedUser);
      }
    },
    actions:{
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
     setLogout({commit}){
            authService.logout()
            .then((msg)=> {
              const user = userService.getEmptyUser()
              commit({type:'setUser',user})
              return msg
            })
     },
     async updateUser({ commit }, { action }) {
        try {
            const updatedUser = await userService.updateDetails(action);
            console.log(updatedUser,'Updated user?');
            commit({ type: "updateUser", updatedUser });
            if(action.type==="history")
            commit({type:"updateSearchHistory", searchHistory:{searchHistory:updatedUser.searchHistory}})
            else if(action.type==='like')
            commit({type:"updateLikedSongs",likedSongs:{likedSongs:updatedUser.likedSongs}})
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    },
    modules: {

    },

};