const pool = require('../../db');
const queries = require('./queries');

const getWeather = (req, res) => {
    pool.query(queries.getWeather, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getWeatherByCity = (req, res) => {
    const city = req.params.city;
    pool.query(queries.getWeatherByCity, [city], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getWeatherByDate = (req, res) => {
    const date = req.params.date;
    pool.query(queries.getWeatherByDate, [date], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const addWeather = (req, res) => {
    const { date, city, day_temp, night_temp, humidity, pressure, wind_speed, country } = req.body;

    //check if the weather of that city and day exists
    pool.query(queries.checkDateCity, [date, city], (error, results) => {
        if (results.rows.length) {
            res.send("Weather already registered");
        }

        else {
            //add weather to db
            pool.query(queries.addWeather, [date, city, day_temp, night_temp, humidity, pressure, wind_speed, country], (error, results) => {
                if (error) throw error;
                res.status(201).send("Weather registered successfully!");

            });
        }

    });
};

const removeWeather = (req, res) => {
    const date = req.params.date;

    pool.query(queries.getWeatherByDate, [date], (error, results) => {
        const noDateFound = !results.rows.length;
        if (noDateFound) {
            res.send("Date does not exist in the database.");
        }


        pool.query(queries.removeWeather, [date], (error, results) => {
            if (error) throw error;
            res.status(200).send("Date removed successfully.")
        })
    })



}

/* Write date and city in the link, in the JSON write th day
temperature*/
const updateWeather = (req, res) => {
    const date = req.params.date;
  
    const city = req.params.city
    const { day_temp } = req.body;
    

    pool.query(queries.getWeatherByDate, [date], (error, results) => {
        const noDateFound = !results.rows.length;
        if (noDateFound) {
            res.send("Date does not exist in the database.");
        }

        pool.query(queries.getWeatherByCity, [city], (error, results) => {
            const noCityFound = !results.rows.length;
            if (noCityFound) {
                res.send("City does not exist in the database.");
            }

            pool.query(queries.updateWeather, [day_temp, date, city], (error, results) => {
                if (error) throw error;
                res.status(200).send("Weather updated successfully!");
            })


        })
    })
}

module.exports = {
    getWeather,
    getWeatherByCity,
    getWeatherByDate,
    addWeather,
    removeWeather,
    updateWeather,
}