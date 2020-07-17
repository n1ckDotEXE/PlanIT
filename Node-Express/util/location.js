const axios = require('axios');
const HttpError = require('../Models/http-errors');

const API_KEY = 'AIzaSyCNVuYL8tif53SxxaF3ByBKp7-cgjJVf6g';

async function getCoordsForAddress(address) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
    );

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
        throw new HttpError('Could not find location for the specified address.', 422);
        throw error;
    }

    const coordinates = data.results[0].geometry.location;

    return coordinates;
}

exports.getCoordsForAddress = getCoordsForAddress;