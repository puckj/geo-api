const express = require('express')
const app = express()
const hi = require('./db')
const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',

    // Optional depending on the providers
    // fetch: customFetchImplementation,
    apiKey: 'AIzaSyAG0Qfgbyn_KVaLcxA5NAVRZxJmI8JzF70', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

// Using callback

app.get('/hello', async (req, res) => {
    const ress = await geocoder.geocode({
        address: '29 champs elysée',
        country: 'France',
        zipcode: '75008'
      });
    res.json(ress);
})

app.get('/hello2', async (req, res) => {
    res.json('ssss');
})


app.listen(3066, () => {
    console.log('Start server at port 3066.')
})