const cuid = require("cuid");

const db = require("../db");

const Session = db.model("Session", {
  _id: { type: String, default: cuid },
  champions: [{ type: String, ref: "Champion", index: true, required: true }],
  status: {
    type: String,
    index: true,
    default: "PLANNED",
    enum: ["PLANNED", "ONGOING", "FINISHED"],
  },
});

module.exports = {
  get,
  list,
  create,
  edit,
  remove,
  model: Session,
};

async function list(opts = {}) {
  const { offset = 0, limit = 10, sessionId, status } = opts;

  const query = {};
  if (sessionId) query.champions = sessionId;
  if (status) query.status = status;

  const sessions = await Session.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)
    .populate("champions")
    .exec();

  return sessions;
}

async function get(_id) {
  const session = await Session.findById(_id).populate("champions").exec();
  return session;
}

async function create(fields) {
  const session = await new Session(fields).save();
  await session.populate("champions");
  return session;
}

async function edit(_id, change) {
  const session = await get(_id);
  Session.keys(change).forEach(function (key) {
    session[key] = change[key];
  });
  await session.save();
  return session;
}

async function remove(_id) {
  await Session.deleteOne({ _id });
}
