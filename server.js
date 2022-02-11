require('dotenv').config()
const express = require("express");

const port = process.env.PORT || 1337;

const app = express();

app.get('/', get)

app.listen(port, () => console.log(`Server listening on port: ${port}`))

function get(req, res) {
    res.json("Hello world!")
}