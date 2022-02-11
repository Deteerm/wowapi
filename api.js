const Champions = require("./champions");
const autoCatch = require("./lib/auto-catch");

module.exports = autoCatch({
  getChampion,
  listChampions,
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
