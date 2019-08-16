/*
    Imports the Resource API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /* *
    GET /api/v1/resources
    */
    getResources: function(url = null) {
        url = url || CONFIG.API_URL + 
            '/resources';

        return axios.get(url);
    },

    /** 
     * POST  /api/v1/resource
    */
    addResource: function ( 
        title, 
		file
    ) {
		var formData = new FormData();
		formData.append('title', title);
		formData.append('file', file);
		
		return axios.post(CONFIG.API_URL + "/resource", formData, {
            'Content-Type': 'multipart/form-data'
        });
    },

    /**
     * DELETE /api/v1/resource
     */
    deleteResource: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/resource', {
            params: {
                id: id
            } 
        });
    }
};
