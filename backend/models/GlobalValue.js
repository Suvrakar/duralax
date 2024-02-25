const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  g_value: { type: Number },
  name: { type: String },
  modifiedOn: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
});

const GlobalValues = mongoose.model("GlobalValues", categorySchema);

module.exports = GlobalValues;
