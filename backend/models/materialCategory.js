const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: { type: String },
  modifiedOn: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
});

const MaterialCategory = mongoose.model("materialCategory", categorySchema);

module.exports = MaterialCategory;
