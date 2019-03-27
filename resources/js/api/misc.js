/*
* Imports the API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    sendContactMail: function(
        first_name,
        last_name,
        email,
        subject,
        message
    ) {
        return axios.post(CONFIG.API_URL + '/mail/contact', {
            first_name,
            last_name,
            email,
            subject,
            message
        });
    },
    sendTellYourStoryMail: function(
        full_name,
        phone,
        email,
        content
    ) {
        return axios.post(CONFIG.API_URL + '/mail/tell-your-story', {
            full_name,
            phone,
            email,
            content
        })
    }
}