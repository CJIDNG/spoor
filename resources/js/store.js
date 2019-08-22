/*
|-------------------------------------------------------------------------------
| VUEX store.js
|-------------------------------------------------------------------------------
| Builds the data store from all of the modules for the ARewametoo app.
*/

/*
Adds the promise polyfill for IE 11
*/
require('es6-promise').polyfill();

/*
Imports Vue and Vuex
*/
import Vue from 'vue';
import Vuex from 'vuex';

/**
 * VueX persisted store
 * https://github.com/robinvdvleuten/vuex-persistedstate
 */
import createPersistedState from 'vuex-persistedstate'

/*
Initializes Vuex on Vue.
*/
Vue.use(Vuex);

/*
    Imports all of the modules used in the application to build the data store.
*/
import { user } from './modules/user.js';
import { misc } from './modules/misc';
import { member } from './modules/member';
import { config } from './modules/config';
import { incidentType } from './modules/incidentType';
import { incident } from './modules/incident';
import { state } from './modules/state';
import { localGovernment } from './modules/localGovernment';
import { resource } from './modules/resource';
import { newsletter } from './modules/newsletter';
import { post } from './modules/post';

/*
Exports our data store.
*/
export default new Vuex.Store({
    modules: {
        user,
        misc,
        member,
        config,
        incidentType,
        incident,
        state,
        localGovernment,
        resource,
        newsletter,
        post
    },
    plugins: [
        createPersistedState()
    ]
});