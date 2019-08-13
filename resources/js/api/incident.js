/*
    Imports the Roast API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /* *
    GET /api/v1/state/{state_id}/incidents
    */
    getStateIncidents: function(electionId, stateId, url = null) {
        url = url || CONFIG.API_URL + 
			'/state/' +
			stateId +
			'/incidents';
        
        return axios.get( 
            url
        );
    },

    /* *
    GET /api/v1/localGovernment/{local_government_id}/incidents
    */
    getLocalGovernmentIncidents: function(electionId, localGovernmentId) {
        return axios.get( 
            CONFIG.API_URL + 
            '/localGovernment/' +
            localGovernmentId +
            '/incidents'
        );
    },

    /**
     * GET /api/v1/location/{location_type}
     */
    filterIncidentsBy: function(locationType, url = null, limit = null) {
        limit = limit || 10000;

        url = url || CONFIG.API_URL + 
            '/location/' + locationType + 
			'/incidents/limit/' + limit;
			
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
