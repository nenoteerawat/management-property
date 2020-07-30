import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users
    },
    state: {
        barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
        barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
        drawer: null,
    },
    mutations: {
        SET_BAR_IMAGE (state, payload) {
            state.barImage = payload
        },
        SET_DRAWER (state, payload) {
            state.drawer = payload
        },
    },
    actions: {
    
    },
});
