const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
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

    request(url, function (err, response, body) {
        if (!err) {
            let weather = JSON.parse(body);
            if (weather.main === undefined) {
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let temperature = weather.main.temp;
                let weatherCity = weather.name;

                let weatherData = [
                    {weatherCity, temperature}
                ];

                function generateTableHead(table, data) {
                    let thead = table.createTHead();
                    let row = thead.insertRow();
                    for (let key of data) {
                        let th = document.createElement("th");
                        let text = document.createTextNode(key);
                        th.appendChild(text);
                        row.appendChild(th);
                    }
                }

                function generateTable(table, data) {
                    for (let element of data) {
                        let row = table.insertRow();
                        for (let key in element) {
                            let cell = row.insertCell();
                            let text = document.createTextNode(element);
                            cell.appendChild(text);
                        }
                    }
                }

                let table = document.querySelector("table");
                let data = Object.keys(weatherData[0]);
                generateTableHead(table, data);
                generateTable(table, weatherData);
            }
        } else res.render('index', {weather: null, error: 'Error, please try again'});
    });


    let weatherText = `It's ${temperature} degrees Fahrenheit in ${weatherCity}!`;
                res.render('index', {weather: weatherText, error: null});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
});




