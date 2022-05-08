const cuid = require("cuid");
const db = require("../db");

const races = require("../enums/races");
const classes = require("../enums/classes");

const Champion = db.model("Champion", {
  _id: { type: String, default: cuid },
  name: { type: String, required: true },
  race: { type: String, required: true, enum: races },
  class: { type: String, required: true, enum: classes },
  sex: { type: String, required: true, enum: ["male", "female"] },
  lv: {
    type: Number,
    default: 1,
    validate: {
      validator: (lv) => lv > 0 && lv <= 60,
      message: (props) => `${props.value} is not a valid level`,
    },
  },
  faction: { type: String, required: true, enum: ["Alliance", "Horde"] },
});

module.exports = {
  list,
  get,
  create,
  edit,
  remove,
  model: Champion,
};

async function list(options = {}) {
  const { offset = 0, limit = 10, faction } = options;

  const query = faction ? { faction: faction } : {};
  const champions = await Champion.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit);

  return champions;
}

async function get(_id) {
  const champion = Champion.findById(_id);
  return champion;
}

async function create(fields) {
  const champion = await new Champion(fields).save();
  return champion;
}

async function edit(_id, change) {
  const champion = await get(_id);
  Object.keys(change).forEach(function (key) {
    champion[key] = change[key];
  });
  await champion.save();
  return champion;
}

async function remove(_id) {
  await Champion.deleteOne({ _id });
}
