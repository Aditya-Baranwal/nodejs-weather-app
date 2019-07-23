const request = require('request');

const requestLatLong = (placeName, callback) => {
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + placeName + '.json?access_token=pk.eyJ1IjoiYWRpdHlhMDkiLCJhIjoiY2p5OGNkZnNoMDJxYzNjbW9sanp3N2thMCJ9.WEV8HV6EHsBTIGNUVM8gZQ&limit=1';
    request({ url: url2, json: true }, (error, { body }) => {
        if (error) callback("Unable To Connect Mapbox Location Service.",undefined);
        else if (body.features.length === 0) callback("No Such Location.",undefined);
        else {
            const placeName = body.features[0].place_name;
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            callback(undefined, { lat: latitude, long: longitude, location: placeName });
        }
    });
};



module.exports = {
    requestLatLong: requestLatLong,
}