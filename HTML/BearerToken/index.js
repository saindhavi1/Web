const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey = "My1234"; //Replace with your secret key
app.use(express.json());

//Middleware to verify the Bearer Token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null){
        return res.sendStatus(401); //Unauthorized
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err){
            return res.sendStatus(403); //Forbidden
        }
        req,user = user;
        next();
    });
};

//Sample authentication logic
const authenticateUser = (username, password) => {
    //Replace with your actual authenication logic from a database
    return username === "admin" && password === "password123";
};

//Sample login route to generate Bearer Token
app.post("/login", (req, res) => {
    const {username, password} = req.body;
    if(authenticateUser(username, password)){
        const user = {username: username};
        const accessToken = jwt.sign(user, secretKey);
        res.json({accessToken:accessToken});
    } else{
        res.status(401).json({error:"Invalid credentials"});
    }
});

//Sample protected route
app.get("/protected", verifyToken, (req, res) => {
    res.send("This is a protected route.");
});

//Start the server
app.listen(3000, () => {
    console.log("server is running on port 3000");
});

//in the body (raw then json), write the username and password
//then post
//you will get a token, copy the link without double quotes
//and then in the header section, write "Authorization" in the key 
//and "Bearer" and paste the link 