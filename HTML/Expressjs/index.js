const express = require('express');
const app = express();
const port = 4000;

//Basic route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

//Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//npm init
//npm install --save-exact
//npm install pg
//npm install express dotenv pg