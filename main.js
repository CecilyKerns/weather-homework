const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const app = express();

const apiKey = 'bedaf9a789a504a64aff26996089ef2b';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
});

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    request(url,function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body);
            myCache.set("weatherTemperatureKey", weather.main.temp, 1800);
            myCache.set("weatherCityKey", weather.name, 1800);

            if(weather.main === undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees Fahrenheit in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});

            }
        }
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});