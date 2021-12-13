import { httpService } from './http.service';
import { userService } from './user.service';

const STORAGE_KEY = 'user';
const AUTH_URL = 'auth/';

export const authService = {
    login,
    logout,
    signup,
    initialLogin,
    loginGuestUser,
};

async function login(userCred) {
    try {
        const user = await httpService.post(`${AUTH_URL}login`, userCred);
        if (user) return _saveLocalUser(user);
    } catch (err) {
        console.log(err);
    }
}

async function initialLogin() {
    let user = userService.getLoggedinUser();
    if (!user) {
        user = await loginGuestUser();
        return user;
    } else return user;
}

async function loginGuestUser() {
    const guestUser = await login({ username: 'guest', password: '1234' });
    return guestUser;
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
    return await httpService.post(`${AUTH_URL}logout`);
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
}

async function signup(userCred) {
    const user = await httpService.post(`${AUTH_URL}signup`, userCred);
    return _saveLocalUser(user);
}
