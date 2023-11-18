const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./src/weather/routes');
const app = express();
const port = 3000;

app.use(express.json());

// Enable CORS for all routes
app.use(cors());
//app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use('/api/v1/weather', weatherRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));


