/*
|-------------------------------------------------------------------------------
| VUEX modules/investigation.js
|-------------------------------------------------------------------------------
| The Vuex data store for the investigation
*/

import InvestigationAPI from '../api/investigation.js';
 
export const investigation = {
    state: {
        investigations: [],
        investigationsLoadStatuts: 0,
        investigationPagination: {},
        investigation: {},
        investigationLoadStatus: 0,
        addInvestigationLoadStatus: 0,
        addInvestigationResponse: {},
        updateInvestigationLoadStatus: 0,
        updateInvestigationResponse: {},
        deleteInvestigationLoadStatus: 0,
        deleteInvestigationResponse: {}
    },
    actions: {
        loadInvestigations({commit}, data) {
            commit('setInvestigationsLoadStatus', 1);

            InvestigationAPI.index(
                data.url
            ).then(function(response) {
                commit('setInvestigationsLoadStatus', 2);
                commit('setInvestigations', response.data.data);
                commit('setInvestigationPagination', {
                    meta: response.data.meta,
                    links: response.data.links
                });
            }).catch(function() {
                commit('setInvestigationsLoadStatus', 3);
                commit('setInvestigations', []);
            });
        },
        loadInvestigation({commit}, data) {
            commit('setInvestigationLoadStatus', 1);

            InvestigationAPI.show(
                data.id
            ).then(function(response) {
                commit('setInvestigationLoadStatus', 2);
                commit('setInvestigation', response.data.data);
            }).catch(function() {
                commit('setInvestigationLoadStatus', 3);
                commit('setInvestigation', {});
            });
        },
        addInvestigation({commit}, data) {
            commit('setAddInvestigationLoadStatus', 1);

            InvestigationAPI.store(
                data.title,
                data.thumbnail,
                data.tags
            ).then(function(response) {
                commit('setAddInvestigationLoadStatus', 2);
                commit('setAddInvestigationResponse', response.data);
            }).catch(function() {
                commit('setAddInvestigationLoadStatus', 3);
                commit('setAddInvestigationResponse', {});
            });
        },
        updateInvestigation({commit}, data) {
            commit('setUpdateInvestigationLoadStatus', 1);

            InvestigationAPI.update(
                data.id,
                data.title,
                data.thumbnail,
                data.tags
            ).then(function(response) {
                commit('setUpdateInvestigationLoadStatus', 2);
                commit('setUpdateInvestigationResponse', response.data);
            }).catch(function() {
                commit('setUpdateInvestigationLoadStatus', 3);
                commit('setUpdateInvestigationResponse', {});
            });
        },
        deleteInvestigation({commit}, data) {
            commit('setDeleteInvestigationLoadStatus', 1);

            InvestigationAPI.destroy(
                data.id
            ).then(function(response) {
                commit('setDeleteInvestigationLoadStatus', 2);
                commit('setDeleteInvestigationResponse', response.data);
            }).catch(function() {
                commit('setDeleteInvestigationLoadStatus', 3);
                commit('setDeleteInvestigationResponse', {});
            });
        }
    }, 
    mutations: {
        setInvestigations(state, investigations) {
            state.investigations = investigations;
        },
        setInvestigationsLoadStatus(state, status) {
            state.investigationsLoadStatuts = status;
        },
        setInvestigationPagination(state, data) {
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
        
            state.investigationPagination = pagination;
        },
        setInvestigation(state, investigation) {
            state.investigation = investigation;
        },
        setInvestigationLoadStatus(state, status) {
            state.investigationLoadStatus = status;
        },
        setAddInvestigationLoadStatus(state, status) {
            state.addInvestigationLoadStatus = status;
        },
        setAddInvestigationResponse(state, response) {
            state.addInvestigationResponse = response;
        },
        setUpdateInvestigationLoadStatus(state, status) {
            state.updateInvestigationLoadStatus = status;
        },
        setUpdateInvestigationResponse(state, response) {
            state.updateInvestigationResponse = response;
        },
        setApproveinvestigationLoadStatus(state, status) {
            state.approveinvestigationLoadStatus = status;
        },
        setApproveinvestigationResponse(state, response) {
            state.approveinvestigationResponse = response;
        },
        setDeleteInvestigationLoadStatus(state, status) {
            state.deleteInvestigationLoadStatus = status;
        },
        setDeleteInvestigationResponse(state, response) {
            state.deleteInvestigationResponse = response;
        }
    },
    getters: {
        getInvestigations(state) {
            return state.investigations;
        },
        getInvestigationsLoadStatus(state) {
            return state.investigationsLoadStatuts;
        },
        getInvestigationPagination(state) {
            return state.investigationPagination;
        },
        getInvestigation(state) {
            return state.investigation;
        },
        getInvestigationLoadStatus(state) {
            return state.investigationLoadStatus;
        },
        getAddInvestigationLoadStatus(state) {
            return state.addInvestigationLoadStatus;
        },
        getAddInvestigationResponse(state) {
            return state.addInvestigationResponse;
        },
        getUpdateInvestigationLoadStatus(state) {
            return state.updateInvestigationLoadStatus;
        },
        getUpdateInvestigationResponse(state) {
            return state.updateInvestigationResponse;
        },
        getDeleteInvestigationLoadStatus(state) {
            return state.deleteInvestigationLoadStatus;
        },
        getDeleteInvestigationResponse(state) {
            return state.deleteInvestigationResponse;
        }
    }
};