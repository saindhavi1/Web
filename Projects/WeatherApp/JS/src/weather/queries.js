const getWeather = "SELECT * FROM weather";
const getWeatherByCity = "SELECT * FROM weather WHERE city = $1";
const getWeatherByDate = "SELECT * FROM weather WHERE date = $1";
const checkDateCity = "SELECT w FROM weather w WHERE w.date = $1 AND w.city = $2"
const addWeather = "INSERT INTO weather (date, city, day_temp, night_temp, humidity, pressure, wind_speed, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
const removeWeather = "DELETE FROM weather WHERE date = $1";
const updateWeather = "UPDATE weather SET day_temp = $1 WHERE date = $2 AND city = $3";

module.exports = {
    getWeather,
    getWeatherByCity,
    getWeatherByDate,
    checkDateCity,
    addWeather,
    removeWeather,
    updateWeather,
}