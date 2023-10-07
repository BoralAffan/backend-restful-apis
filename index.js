const express = require('express');
const app = express();
const carRoute = require("./routes/cars.routes.js")
const products = require("./routes/products.routes.js")
const PORT = 4000;

app.use(express.json());
app.use("/api/cars",carRoute)
app.use("/api/products",products)
app.listen(PORT, ()=> console.log(`server started at ${PORT}`))