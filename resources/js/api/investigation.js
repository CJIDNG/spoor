/*
* Imports the API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /**
     * GET /api/v1/investigation
     */
    index: function(url) {
        url = url || CONFIG.API_URL + "/investigation";
        return axios.get(url);
    }, 

    /**
     * investigation /api/v1/investigation
     */
    store: function(
        title,
        thumbnail,
        tags
    ) {
        var formData = new FormData();

        formData.append('title', title);
        formData.append('thumbnail', thumbnail);
        formData.append('tags', tags);

        return axios.post(CONFIG.API_URL + "/investigation", formData, {
            'Content-Type': 'multipart/form-data'
        });
    },

    /**
     * GET /api/v1/investigation/{id}
     */
    show: function(id) {
        return axios.get(CONFIG.API_URL + "/investigation/view/" + id);
    },

    /**
     * PUT /api/v1/investigation
     */
    update: function(
        id,
        title,
        thumbnail,
        tags
    ) {
        var formData = new FormData();

        formData.append('id', id);
        formData.append('title', title);
        formData.append('thumbnail', thumbnail);
        formData.append('tags', tags);

        return axios.post(CONFIG.API_URL + "/investigation/" + id, formData, {
            'Content-Type': 'multipart/form-data'
        });
    },

    /**
     * DELETE /api/v1/investigation
     */
    destroy: function(id) {
        return axios.delete(CONFIG.API_URL + "/investigation", {
            params: {
                id: id
            }
        });
    }
};