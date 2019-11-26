const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const argv = require('yargs').argv;
const app = express();

let apiKey = 'bedaf9a789a504a64aff26996089ef2b';
let city = arg.c || `rocklin`;
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

request(url, function (err, response, body) {
    if(err){
        console.log('error:', error);
    } else {
        let weather = JSON.parse(body);
        let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        console.log(message);
    }
});

let use = app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/', function (req, res) {
    res.render('index');
    console.log(req.body.city)
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')

}); 



