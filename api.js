const Champions = require("./models/champions");
const Sessions = require("./models/sessions");
const Users = require("./models/users");
const autoCatch = require("./lib/auto-catch");

module.exports = autoCatch({
  getChampion,
  listChampions,
  createChampion,
  editChampion,
  deleteChampion,
  createSession,
  listSessions,
  createUser,
});

async function createUser(req, res, next) {
  const user = await Users.create(req.body);
  const { username, email } = user;
  res.json({ username, email });
}

async function listChampions(req, res, next) {
  const { offset = 0, limit = 10, faction } = req.query;
  res.json(
    await Champions.list({
      offset: Number(offset),
      limit: Number(limit),
      faction: faction,
    })
  );
}

async function getChampion(req, res, next) {
  const { id } = req.params;

  const champion = await Champions.get(id);
  if (!champion) next();

  res.json(champion);
}

async function createChampion(req, res, next) {
  if (!req.isAdmin) return forbidden(next);

  const champion = await Champions.create(req.body);
  res.json(champion);
}

function forbidden(next) {
  const err = new Error("Forbidden");
  err.statusCode = 403;
  return next(err);
}

async function editChampion(req, res, next) {
  if (!req.isAdmin) return forbidden(next);

  const change = req.body;
  const champion = await Champions.edit(req.params.id, change);

  res.json(champion);
}

async function deleteChampion(req, res, next) {
  if (!req.isAdmin) return forbidden(next);

  await Champions.remove(req.params.id);
  res.json({ success: true });
}

async function createSession(req, res, next) {
  const fields = req.body;
  if (!req.isAdmin) fields.username = req.user.username;

  const session = await Sessions.create(req.body);
  res.json(session);
}

async function listSessions(req, res, next) {
  const { offset = 0, limit = 10, sessionId, status } = req.query;

  const opts = {
    offset: Number(offset),
    limit: Number(limit),
    sessionId,
    status,
  };

  if (!req.isAdmin) opts.username = req.user.username;

  const sessions = await Sessions.list(opts);

  res.json(sessions);
}
