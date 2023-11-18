const express = require('express');
const path = require('path');

const app = express();
//You can change this to any port you prefer
const port = 3000;

//Serve static files from the public diectory
app.use(express.static(path.join(__dirname, 'public')));

//Handle 404 - Keep this as the last route
app.use(function (req, res){
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});