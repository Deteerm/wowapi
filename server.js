require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const api = require("./api");
const middleware = require("./middleware");

const port = process.env.PORT || 1337;

const app = express();

app.use(middleware.cors);
app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.json("Welcome!");
});
app.get("/champions", api.listChampions);
app.get("/champions/:id", api.getChampion);
app.post("/champions", api.createChampion);
app.put("/champions/:id", api.editChampion);
app.delete("/champions/:id", api.deleteChampion);

app.get("/orders", api.listSessions);
app.post("/orders", api.createSession);

app.use(middleware.handleError);
app.use(middleware.notFound);

app.listen(port, () => console.log(`Server listening on port: ${port}`));
