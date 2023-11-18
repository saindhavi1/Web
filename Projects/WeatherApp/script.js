const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', "Monday", 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : "AM"

    if (minutes < 10){
        timeEl.innerHTML = hoursIn12HrFormat + ':0' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`
    } else{
        timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`
    }
    

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]
}, 1000);

async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/v1/weather/');
        console.log(response);
        
        const data = await response.json();
        console.log(data);
        
        displayWeather(data);
        
    } catch (error) {
        console.error(error);
    }
}

function displayWeather(data){
        let timeZone = document.getElementById("time-zone");
        let humidity = document.getElementById("humidity");
        let pressure = document.getElementById("pressure");
        let windSpeed = document.getElementById("wind-speed");
        let country = document.getElementById("country");
        timeZone.innerHTML = data[0].city;
        humidity.innerHTML = data[0].humidity;
        pressure.innerHTML = data[0].pressure;
        windSpeed.innerHTML = data[0].wind_speed;
        country.innerHTML = data[0].country;

        for (let i = 1; i <= 6; i++){
            let day = document.getElementById("day" + i);
            let night = document.getElementById("night" + i);

            day.innerHTML = "Day - " + data[i].day_temp + '&#176;C';
            night.innerHTML = "Night - " + data[i].night_temp + '&#176;C';
        }
    
}

fetchUsers();