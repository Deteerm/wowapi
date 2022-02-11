const Champions = require("./champions");
const autoCatch = require("./lib/auto-catch");

module.exports = autoCatch({
  getChampion,
  listChampions,
  createChampion,
  editChampion,
  deleteChampion,
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
  const { name } = req.params;

  const champion = await Champions.get(name);
  if (!champion) next();

  res.json(champion);
}

async function createChampion(req, res, next) {
  console.log("request body:", req.body);
  res.json(req.body);
}

async function editChampion(req, res, next) {
  res.json(req.body);
}

async function deleteChampion(req, res, next) {
  res.json({ success: true });
}
