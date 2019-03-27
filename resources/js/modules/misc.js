/*
|-------------------------------------------------------------------------------
| VUEX modules/misc.js
|-------------------------------------------------------------------------------
| The Vuex data store for the misc
*/

import MiscAPI from '../api/misc';
 
export const misc = {
    state: {
        sendContactMailLoadStatus: 0,
        sendContactMailResponse: {},
        sendTellYourStoryMailLoadStatus: 0,
        sendTellYourStoryMailResponse: {}
    },
    actions: {
        sendContactMail({commit}, data) {
            commit('setSendContactMailLoadStatus', 1);

            MiscAPI.sendContactMail(
                data.first_name,
                data.last_name,
                data.email,
                data.subject,
                data.message
            ).then(function(response) {
                commit('setSendContactMailLoadStatus', 2);
                commit('setSendContactMailResponse', response);
            }).catch(function() {
                commit('setSendContactMailLoadStatus', 3);
                commit('setSendContactMailResponse', {});
            });
        },
        sendTellYourStoryMail({commit}, data) {
            commit('setSendTellYourStoryMailLoadStatus', 1);

            MiscAPI.sendTellYourStoryMail(
                data.full_name,
                data.phone,
                data.email,
                data.content
            ).then(function(response) {
                commit('setSendTellYourStoryMailLoadStatus', 2);
                commit('setSendTellYourStoryMailResponse', response);
            }).catch(function() {
                commit('setSendTellYourStoryMailLoadStatus', 3);
                commit('setSendTellYourStoryMailResponse', {});
            });
        }
    },
    mutations: {
        setSendContactMailLoadStatus(state, status) {
            state.sendContactMailLoadStatus = status;
        },
        setSendContactMailResponse(state, response) {
            state.sendContactMailResponse = response;
        },
        setSendTellYourStoryMailLoadStatus(state, status) {
            state.sendTellYourStoryMailLoadStatus = status;
        },
        setSendTellYourStoryMailResponse(state, response) {
            state.sendTellYourStoryMailResponse = response;
        }
    },
    getters: {
        getSendContactMailLoadStatus(state) {
            return state.sendContactMailLoadStatus;
        },
        getSendContactMailResponse(state) {
            return state.sendContactMailResponse;
        },
        getSendTellYourStoryMailLoadStatus(state) {
            return state.sendTellYourStoryMailLoadStatus;
        },
        getSendTellYourStoryMailResponse(state) {
            return state.sendTellYourStoryMailResponse;
        }
    }
}