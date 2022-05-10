const Champions = require("./models/champions");
const Sessions = require("./models/sessions");
const autoCatch = require("./lib/auto-catch");

module.exports = autoCatch({
  getChampion,
  listChampions,
  createChampion,
  editChampion,
  deleteChampion,
  createSession,
  listSessions,
});

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
  const champion = await Champions.create(req.body);
  res.json(champion);
}

async function editChampion(req, res, next) {
  const change = req.body;
  const champion = await Champions.edit(req.params.id, change);

  res.json(champion);
}

async function deleteChampion(req, res, next) {
  await Champions.remove(req.params.id);
  res.json({ success: true });
}

async function createSession(req, res, next) {
  const session = await Sessions.create(req.body);
  res.json(session);
}

async function listSessions(req, res, next) {
  const { offset = 0, limit = 10, productId, status } = req.query;

  const sessions = await Sessions.list({
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status,
  });

  res.json(sessions);
}
