const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {Pool} = require('pg');
const db = require("./databasepg.js");
const jwt = require("jsonwebtoken");
const secretKey = "My1234";

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "5s2zdphj",
    database: "user"
})

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.json());

console.log("Hello");
app.post("/register", (req, res) => {
    const {username, password, password2} = req.body;
    try{
        db.insertRecord(req, res);

        console.log(`Received Data: Username - ${username} Password - ${password}`);

        res.send('Form submitted successfully')
    } catch (error) {
        console.error ("error processing the form");
        res.status(500).send("An error occurred");
    }
});

const authenticateUser = (username, password) => {
    return username === "admin" && password === "password123";
};

app.post("/login", (req, res) => {
    const {username, password} = req.body;
    if(authenticateUser(username, password)){
        const user = {username: username};
        const accessToken = jwt.sign(user, secretKey);
        res.json({accessToken:accessToken});
    } else{
        res.status(401).json({error: "Invalid credentials"});
    }
});

app.get("/protected", db.verifyToken, (req, res) => {
    res.send("This is a protected route.");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//day 1 -> create post methods
//day 2 -> database connection
//day 3 -> combine everything together