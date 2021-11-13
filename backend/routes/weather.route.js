const express = require('express');
const router = express.Router();

const axios = require('axios');

require('dotenv').config();

const notSupported = (req, res) => {
    res.statusCode = 405;
    res.end(`${req.method} not supported on ${req.originalUrl}`);
};

async function getWeather(req, res) {
    const { latitude, longitude } = req.body.data.location;
    const apikey = process.env.WEATHER_API_KEY;

    // console.log(req.body.data);

    axios
        .get(
            `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${latitude},${longitude}&aqi=no`
        )

        .then((resp) => {
            const w = resp.data;
            const weatherdata = {
                region: `${w.location.name}, ${w.location.region}`,
                temp: w.current.temp_c,
                condition: w.current.condition.text,
                icon: w.current.condition.icon,
                windSpeed: w.current.wind_kph,
            };
            // console.log(weatherdata);
            res.status(200).json({ status: 200, weatherdata: weatherdata });
        })
        .catch((err) =>
            res.status(400).json({
                status: 400,
                err: 'ERROR : Error querying weather API',
            })
        );
}

router
    .route('/')
    .get(notSupported)
    .post(getWeather)
    .put(notSupported)
    .delete(notSupported);

module.exports = router;
