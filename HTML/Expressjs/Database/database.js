const express = require('express');
const bodyParser = require('body-parser');
const db = require('./databasepg');
const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.get('/listusers', db.getUsers);
console.log("sucess");
app.get('/listusers/:firstname', db.getUserByName);

app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`);
})
