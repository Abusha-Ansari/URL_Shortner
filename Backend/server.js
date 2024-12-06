const express = require('express');
const { Home } = require('./Controllers/routesController');
const app = express();
require('dotenv').config()

app.route("/").get(Home);


const PORT = process.env.BACKEND_URL;
app.listen(PORT, ()=>{
    console.log(`Server is live at PORT: ${PORT}`)
});