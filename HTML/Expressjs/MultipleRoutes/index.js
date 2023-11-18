const express = require('express');
const app = express();

const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes.js');

app.use('./users', userRoutes);
app.use('/products', productRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});