const express = require('express');
const bodyParser = require('body-parser');
const { Home, addURL, getURL } = require('./Controllers/routesController');
const ConnectDB = require('./urlDB');
const app = express();
const cors = require('cors');
require('dotenv').config();


app.use(bodyParser.json());

const corsOptions = {
    origin: process.env.FRONTEND_ORIGIN, 
    methods: "GET, PUT, PATCH, DELETE, POST, HEAD",
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"], 
  };
app.use(cors(corsOptions))

app.route("/").get(Home);
app.route("/add").post(addURL)
app.route("/get/:URL").get(getURL)


const PORT = process.env.BACKEND_URL;

ConnectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is live at PORT: ${PORT}`)
    });
});
