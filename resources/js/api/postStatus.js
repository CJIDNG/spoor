/*
* Imports the API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /**
     * GET /api/v1/status
     */
    index: function() {
        return axios.get(CONFIG.API_URL+"/status");
    } 
};