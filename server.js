const express = require('express')
const app = express()
const path = require('path')
const hi = require('./db')
const NodeGeocoder = require('node-geocoder');
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const options = {
    provider: 'google',

    // Optional depending on the providers
    // fetch: customFetchImplementation,
    apiKey: 'AIzaSyAG0Qfgbyn_KVaLcxA5NAVRZxJmI8JzF70', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

// Using callback

app.get('/go', async (req, res) => {
    const ress = await geocoder.geocode({
        address: req.body.address,
        country: req.body.country,
        zipcode: req.body.zipcode
    });
    res.json(ress);
})

app.get('/go2', async (req, res) => {
    res.json('ssss');
})

app.get('/map', async (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});


app.listen(3022, () => {
    console.log('Start server at port 3022.')
})