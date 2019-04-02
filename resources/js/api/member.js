/*
* Imports the API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /**
     * GET /api/v1/member
     */
    index: function(url) {
        url = url || CONFIG.API_URL + "/member";
        return axios.get(url);
    }, 

    /**
     * member /api/v1/member
     */
    store: function(
        full_name,
        country,
        designation,
        bio,
        thumbnail
    ) {
        var formData = new FormData();

        formData.append('full_name', full_name);
        formData.append('country', country);
        formData.append('designation', designation);
        formData.append('bio', bio);
        formData.append('thumbnail', thumbnail);

        return axios.post(CONFIG.API_URL + "/member", formData, {
            'Content-Type': 'multipart/form-data'
        });
    },

    /**
     * GET /api/v1/member/{id}
     */
    show: function(id) {
        return axios.get(CONFIG.API_URL + "/member/view/" + id);
    },

    /**
     * PUT /api/v1/member
     */
    update: function(
        id,
        full_name,
        country,
        designation,
        bio,
        thumbnail
    ) {
        var formData = new FormData();

        formData.append('id', id);
        formData.append('full_name', full_name);
        formData.append('country', country);
        formData.append('designation', designation);
        formData.append('bio', bio);
        formData.append('thumbnail', thumbnail);

        return axios.post(CONFIG.API_URL + "/member/" + id, formData, {
            'Content-Type': 'multipart/form-data'
        });
    },

    /**
     * DELETE /api/v1/member
     */
    destroy: function(id) {
        return axios.delete(CONFIG.API_URL + "/member", {
            params: {
                id: id
            }
        });
    }
};