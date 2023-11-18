const EventEmitter = require('events');

//Create a new event emitter instance
const myEmitter = new EventEmitter();

//Register an event listener for 'myEvent'
myEmitter.on('stock', (data) => {
    console.log('Stock message received with data:', data);
});

//Emit the 'myEvent event with some data
myEmitter.emit('stock', {message: 'Hello event emitter! Stock price changed'});