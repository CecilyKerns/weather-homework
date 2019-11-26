const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
});

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if (err) {
            console.log('error:', error);
        } else {
            let weather = JSON.parse(body);
            let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            console.log(message);
        }
    });

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')

    });

}); 



