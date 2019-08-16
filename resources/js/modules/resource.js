/*
|-------------------------------------------------------------------------------
| VUEX modules/resource.js
|-------------------------------------------------------------------------------
| The Vuex data store for the resource
*/

import ResourceAPI from '../api/resource';

export const resource = {
    state: {
        resources: [],
        rPagination: {},
        resourcesLoadStatus: 0,
        addResourceLoadStatus: 0,
        addResourceResult: {
            success: 0
        },
        deleteResourceLoadStatus: 0,
        deleteResourceResult: {}
    },
    actions: {
        getResources({ commit }, data) {
            commit('setResourcesLoadStatus', 1);

            ResourceAPI.getResources(
                data.url
            ).then(function (response) {
                commit('setResourcesLoadStatus', 2);
                commit('setResources', response.data);
                commit('setRPagination', {
                    meta: response.data.meta,
                    links: response.data.links
                });
            }).catch(function () {
                commit('setResourcesLoadStatus', 3);
                commit('setResources', []);
            });
        },

        addResource({ commit }, data) {
            commit('setAddResourceLoadStatus', 1);

            ResourceAPI.addResource(
                data.title,
				data.file
            ).then(function(response) {
                commit('setAddResourceLoadStatus', 2);
                commit('setAddResourceResult', response.data);
            }).catch(function() {
                commit('setAddResourceLoadStatus', 3);
                commit('setAddResourceResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        deleteResource({ commit }, data) {
            commit('setDeleteResourceLoadStatus', 1);

            ResourceAPI.deleteResource(
                data.id
            ).then(function(response) {
                commit('setDeleteResourceLoadStatus', 2);
                commit('setDeleteResourceResult', response.data);
            }).catch(function() {
                commit('setDeleteResourceLoadStatus', 3);
                commit('setDeleteResourceResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        }
    },
    mutations: {
        setResourcesLoadStatus(state, status) {
            state.resourcesLoadStatus = status;
        },

        setResources(state, resources) {
            state.resources = resources;
        },

        setRPagination(state, data) {
            let meta = data.meta;
            let links = data.links;

            let pagination = {
                current_page: meta.current_page,
                last_page: meta.last_page,
                to: meta.to,
                total: meta.total,
                next_page_url: links.next,
                prev_page_url: links.prev
            };
        
            state.rPagination = pagination;
        },

        setAddResourceLoadStatus(state, status) {
            state.addResourceLoadStatus = status;
        },

        setAddResourceResult(state, result) {
            state.addResourceResult = result;
        },

        setDeleteResourceLoadStatus(state, status) {
            state.deleteResourceLoadStatus = status;
        },

        setDeleteResourceResult(state, result) {
            state.deleteResourceResult = result;
        }
    },
    getters: {
        getResourcesLoadStatus(state) {
            return state.resourcesLoadStatus;
        },

        getResources(state) {
            return state.resources;
        },

        getRPagination(state) {
            return state.rPagination;
        }, 

        getAddResourceLoadStatus(state) {
            return state.addResourceLoadStatus;
        },

        getAddResourceResult(state) {
            return state.addResourceResult;
        },

        getDeleteResourceLoadStatus(state) {
            return state.deleteResourceLoadStatus;
        },

        getDeleteResourceResult(state) {
            return state.deleteResourceResult;
        }
    }
};
