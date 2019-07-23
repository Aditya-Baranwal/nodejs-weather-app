const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocodeUtils = require('./utils/geocode.js');
const forecastUtils = require('./utils/forecast.js');
const app = express();

//default paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setting a default path.

// erpress.static is used to render only static web pages.
// to render dynamic page we should make use of handlebars(hbs).

//set-up for hbs --> views and view engine
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// set-up for express --> path
app.use(express.static(publicDirectoryPath));


//routes
app.get(['', '/index'], (request, response) => {
    response.render('index', {
        title: 'Weather App',
        name: 'Aditya Baranwal'
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About me',
        name: 'Aditya Baranwal'
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Take Help',
        name: 'Aditya Baranwal'
    });
});

//weather-api --> data-point
app.get('/weather', (request, response) => {
    if (!request.query.location) {
        return response.send({
            error: 'Location Not Specified'
        });
    }
    geocodeUtils.requestLatLong(request.query.location, (error, { lat, long, location } = {}) => {
        if (error) return response.send({ error: error });
        forecastUtils.requestWeather(lat, long, location, (error, result) => {
            if (error) return response.send({ error: error });
            result.address = request.query.location.toLowerCase();
            return response.send(result);
        });
    });
});

app.get('/products', (request, response) => {
    if (!request.query.search) {
        return response.send({
            error: 'Search Not Specified'
        });
    }
    response.send({
        products: []
    });
});

app.get('/help/*', (request, response) => {
    response.render('error', {
        title: 'Error Page',
        errorMessage: 'Help Article Not Found',
        name: 'Aditya Baranwal'

    });
});

app.get('*', (request, response) => {
    response.render('error', {
        title: 'Error Page',
        name: 'Aditya Baranwal',
        errorMessage: 'Error 404 : Page Not Found'
    });
});

//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening port 3000 --'));
