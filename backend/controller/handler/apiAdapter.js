const axios = require('axios');

const {api_key} = require('../../device/config.json')

module.exports = (baseUrl) =>{
    apikey = api_key;
    return axios.create({
        baseURL: baseUrl,
        timeout: 5000,
        headers: {
            "api_key" : apikey,
            "apikey": apikey
        }
    });
}
