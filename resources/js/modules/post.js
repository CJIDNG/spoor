/*
|-------------------------------------------------------------------------------
| VUEX modules/post.js
|-------------------------------------------------------------------------------
| The Vuex data store for the post
*/

import PostAPI from '../api/post.js';
 
export const post = {
    state: {
        posts: [],
        postsLoadStatuts: 0,
        postPagination: {},
        post: {},
        postLoadStatus: 0,
        addPostLoadStatus: 0,
        addPostResponse: {},
        updatePostLoadStatus: 0,
        updatePostResponse: {},
        approvePostLoadStatus: 0,
        approvePostResponse: {},
        deletePostLoadStatus: 0,
        deletePostResponse: {}
    },
    actions: {
        loadPosts({commit}, data) {
            commit('setPostsLoadStatus', 1);

            PostAPI.index(
                data.url,
                data.investigationId
            ).then(function(response) {
                commit('setPostsLoadStatus', 2);
                commit('setPosts', response.data.data);
                commit('setPostPagination', {
                    meta: response.data.meta,
                    links: response.data.links
                });
            }).catch(function() {
                commit('setPostsLoadStatus', 3);
                commit('setPosts', []);
            });
        },
        loadLatestPosts({commit}, data) {
            commit('setPostsLoadStatus', 1);

            PostAPI.latestPosts(
                data.count
            ).then(function(response) {
                commit('setPostsLoadStatus', 2);
                commit('setPosts', response.data.data);
            }).catch(function() {
                commit('setPostsLoadStatus', 3);
                commit('setPosts', []);
            });
        },
        loadPost({commit}, data) {
            commit('setPostLoadStatus', 1);

            PostAPI.show(
                data.id
            ).then(function(response) {
                commit('setPostLoadStatus', 2);
                commit('setPost', response.data.data);
            }).catch(function() {
                commit('setPostLoadStatus', 3);
                commit('setPost', {});
            });
        },
        addPost({commit}, data) {
            commit('setAddPostLoadStatus', 1);

            PostAPI.store(
                data.author,
                data.title,
                data.content,
                data.thumbnail,
                data.tags,
                data.investigations
            ).then(function(response) {
                commit('setAddPostLoadStatus', 2);
                commit('setAddPostResponse', response.data);
            }).catch(function() {
                commit('setAddPostLoadStatus', 3);
                commit('setAddPostResponse', {});
            });
        },
        updatePost({commit}, data) {
            commit('setUpdatePostLoadStatus', 1);

            PostAPI.update(
                data.id,
                data.author,
                data.title,
                data.content,
                data.thumbnail,
                data.tags,
                data.investigations
            ).then(function(response) {
                commit('setUpdatePostLoadStatus', 2);
                commit('setUpdatePostResponse', response.data);
            }).catch(function() {
                commit('setUpdatePostLoadStatus', 3);
                commit('setUpdatePostResponse', {});
            });
        },
        approvePost({commit}, data) {
            commit('setApprovePostLoadStatus', 1);

            PostAPI.approve(
                data.id
            ).then(function(response) {
                commit('setApprovePostLoadStatus', 2);
                commit('setApprovePostResponse', response.data);
            }).catch(function() {
                commit('setApprovePostLoadStatus', 3);
                commit('setApprovePostResponse', response.data);
            });
        },
        deletePost({commit}, data) {
            commit('setDeletePostLoadStatus', 1);

            PostAPI.destroy(
                data.id
            ).then(function(response) {
                commit('setDeletePostLoadStatus', 2);
                commit('setDeletePostResponse', response.data);
            }).catch(function() {
                commit('setDeletePostLoadStatus', 3);
                commit('setDeletePostResponse', {});
            });
        }
    }, 
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setPostsLoadStatus(state, status) {
            state.postsLoadStatuts = status;
        },
        setPostPagination(state, data) {
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
        
            state.postPagination = pagination;
        },
        setPost(state, post) {
            state.post = post;
        },
        setPostLoadStatus(state, status) {
            state.postLoadStatus = status;
        },
        setAddPostLoadStatus(state, status) {
            state.addPostLoadStatus = status;
        },
        setAddPostResponse(state, response) {
            state.addPostResponse = response;
        },
        setUpdatePostLoadStatus(state, status) {
            state.updatePostLoadStatus = status;
        },
        setUpdatePostResponse(state, response) {
            state.updatePostResponse = response;
        },
        setApprovePostLoadStatus(state, status) {
            state.approvePostLoadStatus = status;
        },
        setApprovePostResponse(state, response) {
            state.approvePostResponse = response;
        },
        setDeletePostLoadStatus(state, status) {
            state.deletePostLoadStatus = status;
        },
        setDeletePostResponse(state, response) {
            state.deletePostResponse = response;
        }
    },
    getters: {
        getPosts(state) {
            return state.posts;
        },
        getPostsLoadStatus(state) {
            return state.postsLoadStatuts;
        },
        getPostPagination(state) {
            return state.postPagination;
        },
        getPost(state) {
            return state.post;
        },
        getPostLoadStatus(state) {
            return state.postLoadStatus;
        },
        getAddPostLoadStatus(state) {
            return state.addPostLoadStatus;
        },
        getAddPostResponse(state) {
            return state.addPostResponse;
        },
        getUpdatePostLoadStatus(state) {
            return state.updatePostLoadStatus;
        },
        getUpdatePostResponse(state) {
            return state.updatePostResponse;
        },
        getApprovePostLoadStatus(state) {
            return state.approvePostLoadStatus;
        },
        getApprovePostResponse(state) {
            return state.approvePostResponse;
        },
        getDeletePostLoadStatus(state) {
            return state.deletePostLoadStatus;
        },
        getDeletePostResponse(state) {
            return state.deletePostResponse;
        }
    }
};