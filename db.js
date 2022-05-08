const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/wowapi", {
  useNewUrlParser: true,
});

module.exports = mongoose;
