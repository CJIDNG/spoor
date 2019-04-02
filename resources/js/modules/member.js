/*
|-------------------------------------------------------------------------------
| VUEX modules/member.js
|-------------------------------------------------------------------------------
| The Vuex data store for the member
*/

import MemberAPI from '../api/member.js';
 
export const member = {
    state: {
        members: [],
        membersLoadStatuts: 0,
        memberPagination: {},
        member: {},
        memberLoadStatus: 0,
        addMemberLoadStatus: 0,
        addMemberResponse: {},
        updateMemberLoadStatus: 0,
        updateMemberResponse: {},
        deleteMemberLoadStatus: 0,
        deleteMemberResponse: {}
    },
    actions: {
        loadMembers({commit}, data) {
            commit('setMembersLoadStatus', 1);

            MemberAPI.index(
                data.url
            ).then(function(response) {
                commit('setMembersLoadStatus', 2);
                commit('setMembers', response.data.data);
                commit('setMemberPagination', {
                    meta: response.data.meta,
                    links: response.data.links
                });
            }).catch(function() {
                commit('setMembersLoadStatus', 3);
                commit('setMembers', []);
            });
        },
        loadMember({commit}, data) {
            commit('setMemberLoadStatus', 1);

            MemberAPI.show(
                data.id
            ).then(function(response) {
                commit('setMemberLoadStatus', 2);
                commit('setMember', response.data.data);
            }).catch(function() {
                commit('setMemberLoadStatus', 3);
                commit('setMember', {});
            });
        },
        addMember({commit}, data) {
            commit('setAddMemberLoadStatus', 1);

            MemberAPI.store(
                data.full_name,
                data.country,
                data.designation,
                data.bio,
                data.thumbnail
            ).then(function(response) {
                commit('setAddMemberLoadStatus', 2);
                commit('setAddMemberResponse', response.data);
            }).catch(function() {
                commit('setAddMemberLoadStatus', 3);
                commit('setAddMemberResponse', {});
            });
        },
        updateMember({commit}, data) {
            commit('setUpdateMemberLoadStatus', 1);

            MemberAPI.update(
                data.id,
                data.full_name,
                data.country,
                data.designation,
                data.bio,
                data.thumbnail
            ).then(function(response) {
                commit('setUpdateMemberLoadStatus', 2);
                commit('setUpdateMemberResponse', response.data);
            }).catch(function() {
                commit('setUpdateMemberLoadStatus', 3);
                commit('setUpdateMemberResponse', {});
            });
        },
        deleteMember({commit}, data) {
            commit('setDeleteMemberLoadStatus', 1);

            MemberAPI.destroy(
                data.id
            ).then(function(response) {
                commit('setDeleteMemberLoadStatus', 2);
                commit('setDeleteMemberResponse', response.data);
            }).catch(function() {
                commit('setDeleteMemberLoadStatus', 3);
                commit('setDeleteMemberResponse', {});
            });
        }
    }, 
    mutations: {
        setMembers(state, members) {
            state.members = members;
        },
        setMembersLoadStatus(state, status) {
            state.membersLoadStatuts = status;
        },
        setMemberPagination(state, data) {
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
        
            state.memberPagination = pagination;
        },
        setMember(state, member) {
            state.member = member;
        },
        setMemberLoadStatus(state, status) {
            state.memberLoadStatus = status;
        },
        setAddMemberLoadStatus(state, status) {
            state.addMemberLoadStatus = status;
        },
        setAddMemberResponse(state, response) {
            state.addMemberResponse = response;
        },
        setUpdateMemberLoadStatus(state, status) {
            state.updateMemberLoadStatus = status;
        },
        setUpdateMemberResponse(state, response) {
            state.updateMemberResponse = response;
        },
        setApprovememberLoadStatus(state, status) {
            state.approvememberLoadStatus = status;
        },
        setApprovememberResponse(state, response) {
            state.approvememberResponse = response;
        },
        setDeleteMemberLoadStatus(state, status) {
            state.deleteMemberLoadStatus = status;
        },
        setDeleteMemberResponse(state, response) {
            state.deleteMemberResponse = response;
        }
    },
    getters: {
        getMembers(state) {
            return state.members;
        },
        getMembersLoadStatus(state) {
            return state.membersLoadStatuts;
        },
        getMemberPagination(state) {
            return state.memberPagination;
        },
        getMember(state) {
            return state.member;
        },
        getMemberLoadStatus(state) {
            return state.memberLoadStatus;
        },
        getAddMemberLoadStatus(state) {
            return state.addMemberLoadStatus;
        },
        getAddMemberResponse(state) {
            return state.addMemberResponse;
        },
        getUpdateMemberLoadStatus(state) {
            return state.updateMemberLoadStatus;
        },
        getUpdateMemberResponse(state) {
            return state.updateMemberResponse;
        },
        getDeleteMemberLoadStatus(state) {
            return state.deleteMemberLoadStatus;
        },
        getDeleteMemberResponse(state) {
            return state.deleteMemberResponse;
        }
    }
};