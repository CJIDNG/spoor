/*
* Imports the API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /**
     * GET /api/v1/post
     */
    index: function(url, investigationId = null) {
        url = url || CONFIG.API_URL + "/post";

        if(investigationId == null) {
            return axios.get(url);
        } else {
            return axios.get(CONFIG.API_URL + "/post/" + investigationId);
        }
    }, 

    /**
     * GET /api/v1/latest/{count}
     */
    latestPosts: function(count) {
        return axios.get(CONFIG.API_URL + "/post/latest/" + count);
    },

    /**
     * POST /api/v1/post
     */
    store: function(
        author,
        title,
        content,
        thumbnail,
        tags,
        investigations = []
    ) {
        var formData = new FormData();

        formData.append('author', author);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('thumbnail', thumbnail);
        formData.append('tags', tags);
        formData.append('investigations', investigations);

        return axios.post(CONFIG.API_URL + "/post", formData, {
            'Content-Type': 'multipart/form-data'
        });
    },

    /**
     * GET /api/v1/post/{id}
     */
    show: function(id) {
        return axios.get(CONFIG.API_URL + "/post/view/" + id);
    },

    /**
     * PUT /api/v1/post
     */
    update: function(
        id,
        author,
        title,
        content,
        thumbnail,
        tags,
        investigations
    ) {
        var formData = new FormData();

        formData.append('id', id);
        formData.append('author', author);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('thumbnail', thumbnail);
        formData.append('tags', tags);
        formData.append('investigations', investigations);

        return axios.post(CONFIG.API_URL + "/post/" + id, formData, {
            'Content-Type': 'multipart/form-data'
        });
    },

    /**
     * PUT /api/v1/post/approve
     */
    approve: function(id) {
        return axios.put(CONFIG.API_URL + "/post/approve", {
            id: id
        });
    },

    /**
     * DELETE /api/v1/post
     */
    destroy: function(id) {
        return axios.delete(CONFIG.API_URL + "/post", {
            params: {
                id: id
            }
        });
    }
};