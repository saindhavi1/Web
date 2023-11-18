//Old way
const fs = require('fs');

// Asynchronous file read
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err){
        console.error(err);
        return;
    }
    console.log(data);
});