const express = require("express");
const dotenv = require("dotenv");
const {Pool} = require("pg");

//Load environment variables from .env file
dotenv.config();

const app = express();

//Database connection configuration using environment variables
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

//Define a simple route to fetch data from the database
app.get("/", async(req, res) => {
    try{
        //Sample query - select all records from a 'users' table
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM user");
        client.release(); //Release the client back to the pool

        res.json(result.rows); //Send fetched data as JSON response
    } catch(error){
        console.error("Error executing query:", error);
        res.status(500).send("Error fetching data from database");
    }
});

//Set the port number from environment variable or use 3000 as default
const PORT = process.env.PORT || 3000;

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});