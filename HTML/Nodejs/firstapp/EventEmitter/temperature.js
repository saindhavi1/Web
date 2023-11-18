const EventEmitter = require('events');

class Thermostat extends EventEmitter{
    constructor() {
        super();
        this.temperature = 20; //Initial temp set at 20 degrees Celsius
    }

    increaseTemperature() {
        this.temperature++;
        this.emit('temperatureChanged', this.temperature);
    }

    decreaseTemperature() {
        this.temperature--;
        this.emit('temperatureChanged', this.temperature);
    }
}

//Create a new thermostat instance
const myThermostat = new Thermostat();

//Register an event listener for 'temperatureChanged'
myThermostat.on('temperatureChanged', (newTemperature) => {
    console.log('Object 1 Temperature changed to', newTemperature, 'degrees Celsius');
});

//Increase the temperature
myThermostat.increaseTemperature();

//Decrease the temperature
myThermostat.decreaseTemperature();