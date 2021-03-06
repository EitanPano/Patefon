import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../views/home.vue';

import search from '../views/search.vue';
import library from '../views/library.vue';
import edit from '../views/edit.vue';
import station from '../views/station.vue';
import genre from '../views/genre.vue';
import auth from '../views/user-auth.vue';
import liked from '../views/liked.vue';
import about from '../views/about.vue';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: home,
    },
    {
        path: '/search',
        name: 'Search',
        component: search,
        children: [
            {
                path: '/auth',
                name: 'Auth',
                component: auth,
            },
        ],
    },
    {
        path: '/library',
        name: 'Library',
        component: library,
    },
    {
        path: '/edit',
        name: 'Edit',
        component: edit,
    },
    {
        path: '/station/liked',
        name: 'likedStation',
        component: liked,
    },
    {
        path: '/station/:id?',
        name: 'Station',
        component: station,
    },
    {
        path: '/genre/:id',
        name: 'Genre',
        component: genre,
    },
    {
        path: '/about',
        name: 'About',
        component: about,
    },
];

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
});

export default router;
