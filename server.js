require('dotenv').config()
const express = require("express");

const api = require('./api')

const port = process.env.PORT || 1337;

const app = express();

app.get('/', api.listChampions)

app.listen(port, () => console.log(`Server listening on port: ${port}`))