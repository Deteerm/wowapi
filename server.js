require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const api = require("./api");
const auth = require("./auth");
const middleware = require("./middleware");

const port = process.env.PORT || 1337;

const app = express();

app.use(middleware.cors);
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Welcome!");
});
app.post("/login", auth.authenticate, auth.login);
app.post("/register", api.createUser);

app.get("/champions", api.listChampions);
app.get("/champions/:id", api.getChampion);
app.post("/champions", auth.ensureUser, api.createChampion);
app.put("/champions/:id", auth.ensureUser, api.editChampion);
app.delete("/champions/:id", auth.ensureUser, api.deleteChampion);

app.get("/sessions", auth.ensureUser, api.listSessions);
app.post("/sessions", auth.ensureUser, api.createSession);

app.use(middleware.handleValidationError);
app.use(middleware.handleError);
app.use(middleware.notFound);

const server = app.listen(port, () =>
  console.log(`Server listening on port: ${port}`)
);

if (require.main !== module) {
  module.exports = server;
}
