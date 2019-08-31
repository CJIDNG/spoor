/*
    Imports the Roast API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /* *
    GET /api/v1/incidents
    */
    getIncidents: function(url = null, limit = 20) {
        url = url || CONFIG.API_URL + 
            '/incidents/limit/' + limit;

        return axios.get(url);
    },

    /* *
    GET /api/v1/state/{state_id}/incidents
    */
    getStateIncidents: function(stateId, limit, url = null) {
        url = url || CONFIG.API_URL + 
			'/incidents/state/' +
			stateId +
			'/limit/' + limit;
        
        return axios.get( 
            url
        );
    },

    /* *
    GET /api/v1/localGovernment/{local_government_id}/incidents
    */
    getLocalGovernmentIncidents: function(localGovernmentId, limit, url = null) {
        url = url || CONFIG.API_URL + 
            '/incidents/localGovernment/' +
            localGovernmentId +
            '/limit/' + limit;

        return axios.get( 
            url
        );
    },

    /**
     * GET /api/v1/incident/{id}
     */
    getIncident: function(id) {
        return axios.get(
            CONFIG.API_URL +
            '/incident/' +
            id
        );
    },

    /** 
     * POST  /api/v1/incident
    */
    addIncident: function ( 
        title, 
		description, 
		death_count,
        injured_count,
        victim,
        affiliation,
        assailant,
        incident_type_id,
        location_id,
		location_type,
		incident_date
    ) {
        return axios.post( CONFIG.API_URL + '/incident', {
            title,
			description,
			death_count,
            injured_count,
            victim,
            affiliation,
            assailant,
            incident_type_id,
            location_id,
			location_type,
			incident_date
        });
    },

    /**
     * PUT /api/v1/incident
     */
    updateIncident: function ( 
        id,
		title, 
		death_count,
        injured_count,
        victim,
        affiliation,
        assailant,
        description, 
        incident_type_id, 
		location_id,
		location_type,
		incident_date
    ) {
        return axios.put( CONFIG.API_URL + '/incident', {
            id,
			title,
			death_count,
            injured_count,
            victim,
            affiliation,
            assailant,
            description,
            incident_type_id,
			location_id,
			location_type,
			incident_date
        });
    },

    /**
     * DELETE /api/v1/incident
     */
    deleteIncident: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/incident', {
            params: {
                id: id
            } 
        });
    }
};
