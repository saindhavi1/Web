const express = require('express');
const app = express();

function validate(req, res, next){
    console.log("I am inside the validate function");
    next();
}

function condition(req, res, next){
    console.log("I am inside the condition function");
    next();
}

app.use(validate);
app.get('/', condition,(req, res)=> {
    res.send('Hello World!')
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});