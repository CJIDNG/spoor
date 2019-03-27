/*
|-------------------------------------------------------------------------------
| VUEX modules/postStatus.js
|-------------------------------------------------------------------------------
| The Vuex data store for the postStatus
*/

import PostStatusAPI from '../api/postStatus';

export const postStatus = {
    state: {
        postStatuses: [],
        postStatusesLoadStatus: 0
    },
    actions: {
        loadStatuses({commit}) {
            commit('setPostStatusesLoadStatus', 1);

            PostStatusAPI.index().then(function(response){
                commit('setPostStatusesLoadStatus', 2);
                commit('setPostStatuses', response.data.data);
            }).catch(function() {
                commit('setPostStatusesLoadStatus', 3);
                commit('setPostStatuses', {});
            });
        }
    }, 
    mutations: {
        setPostStatuses(state, statuses) {
            state.postStatuses = statuses;
        },
        setPostStatusesLoadStatus(state, status) {
            state.postStatusesLoadStatus = status;
        }
    },
    getters: {
        getPostStatuses(state) {
            return state.postStatuses;
        },
        getPostStatusesLoadStatus(state) {
            return state.postStatusesLoadStatus;
        }
    }
};