const express = require('express');
const app = express();
const port = 3000;

const weatherData = {city:"Toronto", temp: "16", wind: "10"};

// Middleware to parse JSON
app.use(express.json());

// Route to get weather data by city name
app.get('/weather', async (req, res) => {
    console.log("inside the weather");
  try {
    const cityName = req.query.city;
    if (!cityName) {
      return res.status(400).json({ message: 'City name is required.' });
    }

    //const weatherData = await fetchWeatherData(cityName);
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
//use this in postman: localhost:3000/weather?city=Toronto

// Function to fetch weather data from OpenWeatherMap API using fetch
/*async function fetchWeatherData(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const weatherData = await response.json();
  return weatherData;
}
*/
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
