const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./src/weather/routes');
const app = express();
const jwt = require("jsonwebtoken");
const secretKey = "My1234";
const port = 3000;
app.use(express.json());

// Enable CORS for all routes
app.use(cors());
//app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.send("Hello World!");
})

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null){
        return res,sendStatus(401); //Unauthorized
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err){
            return res.sendStaus(403) //Forbidden
        }
        req.user = user;
        next();
    });

};

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

app.get("/protected", verifyToken, (req, res) => {
    res.send("This is a protected route.");
});

app.use('/api/v1/weather', weatherRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));


