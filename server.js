require('dotenv').config()
const express = require("express");

const api = require('./api')
const middleware = require('./middleware')

const port = process.env.PORT || 1337;

const app = express();

app.use(middleware.cors)
app.get('/', function (req, res) {res.json("Welcome!")})
app.get('/champions', api.listChampions)
app.get('/champions/:name', api.getChampion)
app.use(middleware.handleError)
app.use(middleware.notFound)

app.listen(port, () => console.log(`Server listening on port: ${port}`))