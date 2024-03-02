const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {Pool} = require('pg');
const db = require("./databasepg")

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "5s2zdphj",
    database: "user"
 })

const app = express();

//Use body parser middleware to parse form data
app.use(bodyParser.urlencoded({extended: false}));

//Server static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

//Handle form submission
app.post('/submit', (req, res) => {
    const {name, email} = req.body; //Access form fields using req.body
    try {
        // Create table
        //db.createTable(req, res);

        // Insert record
        db.insertRecord(req, res);

        // Do something with the form data (e.g., store in a database)
        // For demo purposes, just log the received data
        console.log(`Received data: Name - ${name}. Email - ${email}`);

        // Respond to the client
        res.send('Form submitted successfully!');
    } catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).send('An error occurred while processing the form submission.');
    }
});




//Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});